const { help } = require("./help")
const AlarmClock = require("./AlarmClock")
const clock_instance = new AlarmClock()

function parser(input) {
  const input_split_arr = input.trim().split(" ")
  const command = input_split_arr.slice(0, 1)[0]
  const args = input_split_arr.slice(1)
  const hasSyntaxError = !args.every(arg => arg[0] == "-")
  const cleanArgs = args.map(arg => arg.slice(1))

  if (hasSyntaxError)
    return console.log(
      "Please check the syntax of the command and its arguments."
    )

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
      clock_instance.deleteAlarm(...cleanArgs)
      break
    }
    case "snooze-alarm": {
      clock_instance.snoozeAlarm(...cleanArgs)
      break
    }
    case "set-alarm": {
      clock_instance.setAlarm(...cleanArgs)
      break
    }
    case "help": {
      console.log(help)
      break
    }
    default: {
      console.log(
        "Please enter a valid command.\nType 'help' for more information."
      )
    }
  }
}
module.exports = parser
