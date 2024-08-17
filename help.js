const help = `
Welcome to the Alarm Clock CLI Help Section.
The following commands are supported:

  1) list-all-alarms
    - No flags required.
    - Displays all upcoming and expired alarms.

  2) list-active-alarms
    - No flags required.
    - Displays only upcoming alarms.

  3) set-alarm -time -date
    - Takes two flags:
    - -time (mandatory): Set the alarm time in the format HH:mm (24-Hour).
    - -date (optional): Set the alarm date in the format DD/MM/YYYY. Defaults to today if omitted.
    - Successfully sets an alarm with the specified parameters.
    - Example: set-alarm -12:45 -28/08/2024

  4) get-current-datetime
   - No flags required.
   - Returns the current date and time in the format DD/MM/YYYY HH:mm.

  5) clear-expired-alarms
   - No flags required.
   - Clears all expired alarms from memory.

  6) delete-alarm -id
   - Takes one flag:
   - -id (mandatory): The unique identifier of the alarm.
   - Successfully deletes the specified alarm.
   - Example Usage: delete-alarm -ALARM_1723908137892_394

  7) snooze-alarm -id
   - Takes one flag:
   - -id (mandatory): The unique identifier of the alarm.
   - Successfully snoozes the specified alarm by 5 minutes. This can be executed up to 3 times per alarm.
   - Example Usage: snooze-alarm -ALARM_1723908137892_394
`
module.exports = { help }
