# CLI Alarm Clock Application

## Requirements

- Node.js runtime

## How to Run the CLI Alarm Clock Application

To run the application, use the following command:

```bash
node main.js


Supported Commands

1) set-alarm time date
   Sets a new alarm.
   Parameters:
   time (mandatory): The time for the alarm in HH:mm (24-hour) format.
   date (optional): The date for the alarm in DD/MM/YYYY format. Defaults to today if not provided.

2) list-all-alarms
   Lists all alarms, including both upcoming and expired alarms.

3) list-active-alarms
   Displays only the upcoming alarms.

4) clear-expired-alarms
   Clears all expired alarms from the state and removes them from the SavedAlarms.json file.

5) get-current-datetime
   Prints the current date and time.

6) delete-alarm ALARM_ID
   Deletes the specified alarm using the provided ALARM_ID.
   Example usage:
   delete-alarm ALARM_34038403434343_434

7) snooze-alarm ALARM_ID
   Snoozes the specified alarm using the provided ALARM_ID.
   Example usage:
   snooze-alarm ALARM_34038403434343_434
   Note: The maximum snooze limit is 3 times, with a snooze interval of 5 minutes.

```
