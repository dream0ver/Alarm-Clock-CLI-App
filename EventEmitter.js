const EventEmitter = require("events").EventEmitter

class MyEventEmitter extends EventEmitter {}

const eventEmitter = new MyEventEmitter()

module.exports = {
  eventEmitter,
}
