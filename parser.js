const { help } = require("./help")

function parser(ins, input) {
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
      ins.getAllAlarms()
      break
    }
    case "list-active-alarms": {
      ins.getActiveAlarms()
      break
    }
    case "clear-expired-alarms": {
      ins.removeStaleAlarms()
      break
    }
    case "get-current-datetime": {
      ins.getCurrentDateTime()
      break
    }
    case "delete-alarm": {
      ins.deleteAlarm(...cleanArgs)
      break
    }
    case "snooze": {
      ins.snoozeRunningAlarms()
      break
    }
    case "off": {
      ins.turnOffRunningAlarms()
      break
    }
    case "set-alarm": {
      ins.setAlarm(...cleanArgs)
      break
    }
    case "help": {
      console.log(help)
      break
    }
    default: {
      console.log(
        "Please enter a valid command." + "\nType 'help' for more information."
      )
    }
  }
}
module.exports = parser
