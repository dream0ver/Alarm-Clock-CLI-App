# CLI Alarm Clock Application

## Requirements

- Node.js runtime

## How to Run the CLI Alarm Clock Application

To run the application, use the following command:

```bash
node main.js
```

# Supported Commands

## 1) set-alarm -time -date
   Sets a new alarm.\
   Parameters:\
   time (mandatory): The time for the alarm in HH:mm (24-hour) format.\
   date (optional): The date for the alarm in DD/MM/YYYY format. Defaults to today if not provided.\
   Example:
   ```bash
   set-alarm 18:45 28/08/2024
   ```

## 2) list-all-alarms
   Lists all alarms, including both upcoming and expired alarms.\
   Example:
   ```bash
   list-all-alarms
   ```

## 3) list-active-alarms
   Displays only the upcoming alarms.\
   Example:
   ```bash
   list-active-alarms
   ```

## 4) clear-expired-alarms
   Clears all expired alarms from the state and removes them from the SavedAlarms.json file.\
   Example:
   ```bash
   clear-expired-alarms
   ```

## 5) get-current-datetime
   Prints the current date and time.\
   Example:
   ```bash
   get-current-datetime
   ```

## 6) delete-alarm -id
   Deletes the specified alarm using the provided ALARM_ID.\
   Example:
   ```bash
   delete-alarm ALARM_34038403434343_434
   ```

## 7) snooze
   Snoozes any active alarms, This command does not take any parameters.\
   Example:
   Note: The maximum snooze limit is 3 times, with a snooze interval of 5 minutes.
   ```bash
   snooze
   ```

## 8) off
   Turns off any active alarms, This command does not take any parameters.\
   Example:
   ```bash
   off
   ```


