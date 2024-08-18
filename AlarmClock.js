const fs = require("fs")
const { eventEmitter } = require("./EventEmitter")

class AlarmClock {
  // Private Class members below

  #snooze_limit = 3 // Max snooze limit is 3 times
  #snooze_interval = 300 // Default snooze interval is 5 Minutes i.e 300 seconds
  #alarms = []
  #interval_id = ""

  #getCurrentDatetimeArr() {
    // This private helper method returns an array with the formatted values [date,time]
    const localeOptions = {
      hour12: false,
      timeStyle: "short",
      dateStyle: "short",
    }
    const d = new Date()
    const [date, time] = d.toLocaleString("en-GB", localeOptions).split(", ")
    return [date, time, d]
  }

  #poll() {
    // This methods polls every 1 second to check if any alarms are running
    const [date, time] = this.#getCurrentDatetimeArr()
    const running = this.#alarms.filter(
      alarm => date == alarm.date && time == alarm.time && !!!alarm?.expired
    )
    if (running.length)
      eventEmitter.emit(
        "running_alarms",
        running.map(alarm => alarm.id)
      )
  }

  #doesAlarmExist(id) {
    // This private method checks if an alarm with the given id exists
    const value = this.#alarms.find(alarm => alarm.id == id)
    return {
      exists: !!value,
      alarm: !!value ? value : undefined,
    }
  }

  #saveAlarmsToFile() {
    // Saves the state of active alarms to a file for persistant storage
    try {
      fs.writeFileSync("./SavedAlarms.json", JSON.stringify(this.#alarms))
    } catch (err) {
      console.error(err)
    }
  }

  // Public Class methods below

  constructor() {
    // Line below ensures to always return the same instance, I have implemented Singleton pattern so there is only one instance of clock at a time for simplicity
    if (AlarmClock.hasInstance) return AlarmClock.hasInstance
    AlarmClock.hasInstance = this
    try {
      this.#alarms = JSON.parse(fs.readFileSync("./SavedAlarms.json"))
    } catch (err) {
      console.error(err)
    }
    this.#interval_id = setInterval(() => this.#poll(), 1000)
  }

  destroy() {
    clearInterval(this.#interval_id)
  }

  getAllAlarms() {
    // This method prints all the  alarms which includes both upcomming and past alarms
    console.log(this.#alarms)
  }

  getCurrentDateTime() {
    // This method prints current date and time based on user's local timezone in the following format --> Current Date: DD/MM/YYYY Current Time: HH:mm
    const [date, time] = this.#getCurrentDatetimeArr()
    const str =
      `Current Date: ${date} (DD/MM/YYYY)` +
      `\nCurrent Time: ${time.padEnd(10, " ")} (HH:mm)`
    console.log(str)
  }

  setAlarm(time, date = "") {
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(\d{4})$/

    if (!time) {
      console.log(
        "Time cannot be empty, Please provide the time in (HH:mm 24-Hour) format as first param in command."
      )
      return
    }

    if (!timeRegex.test(time)) {
      console.log("Please enter a valid time.")
      return
    }

    if (date && !dateRegex.test(date)) {
      console.log("Please enter a valid date.")
      return
    }

    const [currDate, _, current_d] = this.#getCurrentDatetimeArr()

    const defaultDate = date ? date : currDate
    const dateArr = defaultDate.split("/")
    const timeArr = time.split(":")

    const arg_d = new Date(
      dateArr[2],
      dateArr[1] - 1,
      dateArr[0],
      timeArr[0],
      timeArr[1]
    )

    if (arg_d.getTime() > current_d.getTime()) {
      // This method sets an alarm at the specified date and time and prints  the unique alarm id
      const id = `ALARM_${Date.now()}_${Math.floor(Math.random() * 1000)}` // Generating random id to assing to every unique active alarm
      this.#alarms.push({
        id,
        snoozes_left: this.#snooze_limit,
        time: time,
        date: defaultDate,
      })
      this.#saveAlarmsToFile()
      console.log(
        `Alarm successfully set for ${time} on ${defaultDate}, with ID ${id}.`
      )
    } else {
      console.log("Error occurred: Cannot set alarm for an past datetime.")
    }
  }

  getActiveAlarms(shouldPrint = true) {
    // This method returns only the upcomming active alarms
    const [currDate, currTime, current_d] = this.#getCurrentDatetimeArr()
    const active_alarms = this.#alarms.filter(alarm => {
      const dateArr = alarm.date.split("/")
      const timeArr = alarm.time.split(":")
      const alarm_d = new Date(
        dateArr[2],
        dateArr[1] - 1,
        dateArr[0],
        timeArr[0],
        timeArr[1]
      )
      return alarm_d.getTime() > current_d.getTime() && !!!alarm?.expired
    })
    if (shouldPrint) {
      console.log(active_alarms)
    }
    return active_alarms
  }

  removeStaleAlarms() {
    // This method removes stale alarms from the state
    const active_alarms = this.getActiveAlarms(false)
    this.#alarms = active_alarms
    this.#saveAlarmsToFile()
    console.log(this.#alarms)
  }

  deleteAlarm(id) {
    if (!this.#doesAlarmExist(id).exists) {
      console.log(`Delete failed alarm (${id}) does not exist.`)
    } else {
      this.#alarms = this.#alarms.filter(alarm => alarm.id != id)
      this.#saveAlarmsToFile()
      console.log(`Alarm (${id}) deleted successfully.`)
    }
  }
  turnOffRunningAlarms() {
    const [date, time] = this.#getCurrentDatetimeArr()
    this.#alarms = this.#alarms.map(alarm => {
      const isRunning = date == alarm.date && time == alarm.time
      if (!isRunning) return alarm
      console.log(`Successfully turned off the alarm ${alarm.id}.`)
      return {
        ...alarm,
        expired: true,
      }
    })
    this.#saveAlarmsToFile()
  }
  snoozeRunningAlarms() {
    // This method snoozes all the currently running alarms
    const [date, time] = this.#getCurrentDatetimeArr()
    this.#alarms = this.#alarms.map(alarm => {
      const isRunning = date == alarm.date && time == alarm.time
      if (!isRunning) return alarm
      if (alarm.snoozes_left <= 0) {
        console.log(`Snooze limit exhausted, Cannot snooze alarm ${id}.`)
        return alarm
      }
      const dateArr = alarm.date.split("/")
      const timeArr = alarm.time.split(":")
      const d = new Date(
        dateArr[2],
        dateArr[1] - 1,
        dateArr[0],
        timeArr[0],
        timeArr[1]
      )
      d.setSeconds(d.getSeconds() + this.#snooze_interval)
      const [newAlarmAlertDate, newAlarmAlertTime] = d
        .toLocaleString("en-GB", {
          hour12: false,
          timeStyle: "short",
          dateStyle: "short",
        })
        .split(", ")
      console.log(`Successfully snoozed the alarm ${alarm.id} by 5 minutes.`)
      return {
        ...alarm,
        snoozes_left: alarm.snoozes_left - 1,
        date: newAlarmAlertDate,
        time: newAlarmAlertTime,
      }
    })
    this.#saveAlarmsToFile()
  }
}

module.exports = AlarmClock
