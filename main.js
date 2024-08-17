const readline = require("readline")
const parse = require("./parser")

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt:
    "Welcome to Alarm Clock CLI v1.0.\nType 'help' for more information and 'exit' to close the application.\n> ",
})

reader.prompt()

reader.on("line", input => {
  if (input.trim().toUpperCase() == "EXIT") return reader.close()
  parse(input)
  reader.setPrompt("> ")
  reader.prompt()
})

reader.on("close", () => {
  console.log("Exiting Alarm Clock CLI App.")
})
