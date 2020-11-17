# Uptime Robot Scripts

Written with :heart: using Node v14

## uptime-robot-interval.js

Usage: `API_KEY=123456 INTERVAL=60 node uptime-robot-interval.js`

This script will update all monitors with the given interval (in seconds).  A premium account is required for an interval value of less than 300 seconds.

A backup of the monitors before modification is made, and stored locally.

## uptime-robot-restore.js

Usage: `API_KEY=123456 RESTORE_FILE=uptime_robot_monitors_1605653766.json node uptime-robot-restore.js`

This script can be used with a backup file of the monitor objects in the event you need to restore.

Currently, it only restores the monitor's:
* Name
* URL
* Monitoring Interval

Although, most values are stored in the initial backup.

# Authentication w/ Uptime Robot API Key

You can refer to the [Uptime Robot Documentation](https://uptimerobot.com/api/#authentication) for instructions on retrieving your Main API Key.

# Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
