const AlarmClock = require("./AlarmClock")
const readline = require("readline")

const clock_instance = new AlarmClock()

function handleInput(input) {
  const input_split_arr = input.trim().split(" ")
  const command = input_split_arr.slice(0, 1)[0]
  const args = input_split_arr.slice(1)

  switch (command) {
    case "list-all-alarms": {
      clock_instance.getAllAlarms()
      break
    }
    case "list-active-alarms": {
      clock_instance.getActiveAlarms()
      break
    }
    case "clear-expired-alarms": {
      clock_instance.removeStaleAlarms()
      break
    }
    case "get-current-datetime": {
      clock_instance.getCurrentDateTime()
      break
    }
    case "delete-alarm": {
      clock_instance.deleteAlarm(...args)
      break
    }
    case "snooze-alarm": {
      clock_instance.snoozeAlarm(...args)
      break
    }
    case "set-alarm": {
      clock_instance.setAlarm(...args)
      break
    }
    default: {
      console.log("Please enter a valid command.")
    }
  }
}

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "Alarm Clock CLI Console (Enter Command) > ",
})

reader.prompt()
reader.on("line", input => {
  if (input.trim().toUpperCase() == "EXIT") return reader.close()
  handleInput(input)
  reader.prompt()
})
reader.on("close", () => {
  console.log("Exiting Alarm Clock CLI Console Bye.")
})
