const readline = require("readline")
const parse = require("./parser")
const AlarmClock = require("./AlarmClock")
const clock_instance = new AlarmClock()
const { eventEmitter } = require("./EventEmitter")

const initialPrompt =
  "Welcome to Alarm Clock CLI v1.0." +
  "\nType 'help' for more information and 'exit' to close the application." +
  "\n> "
let shouldListenToAlarmEvent = true
const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: initialPrompt,
})

reader.prompt()

reader.input.on("data", chunk => {
  if (chunk.toString() != "\r") {
    shouldListenToAlarmEvent = false
  } else {
    shouldListenToAlarmEvent = true
  }
})

reader.on("line", input => {
  if (input.trim().toUpperCase() == "EXIT") return reader.close()
  parse(clock_instance, input)
  reader.setPrompt("> ")
  reader.prompt()
})

reader.on("close", () => {
  clock_instance.destroy()
  console.log("Exiting Alarm Clock CLI App.")
})

eventEmitter.on("running_alarms", running => {
  if (!shouldListenToAlarmEvent) return
  const str = running.join(", ")
  process.stdout.write(
    `\rThe following alarms are currently running (${str}). ` +
      `Type "snooze" to snooze or "off" to turn off all the running alarms.` +
      "\n> "
  )
})
