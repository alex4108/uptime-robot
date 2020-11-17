const request = require("request")
const util = require('util')
const fs = require('fs')
const API_KEY = process.env.API_KEY
const INTERVAL = process.env.INTERVAL

Date.prototype.toUnixTime = function() { return this.getTime()/1000|0 };
Date.time = function() { return new Date().toUnixTime(); }

// These options correspond to the getMonitors request.
const options = { 
    method: 'POST',
    url: 'https://api.uptimerobot.com/v2/getMonitors',
    headers: { 
        'cache-control': 'no-cache',
        'content-type': 'application/x-www-form-urlencoded' },
    form: { 
        api_key: API_KEY, 
        format: 'json', 
        logs: '1' 
    }
};

// These options correspond to the editMonitor request that will be sent for each monitor in the list returned from getMonitors.
var updateOptions = { 
    method: 'POST',
    url: 'https://api.uptimerobot.com/v2/editMonitor',
    headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'cache-control': 'no-cache' 
    },
    form: { 
       api_key: API_KEY,
       format: 'json',
       interval: INTERVAL 
    } 
};

request(options, function (error, response, body) {
    if (error) throw new Error(error);
    
    const jsonResp = JSON.parse(body)
    const fileName = "uptime_robot_monitors_" + Date.time() + ".json"
    var monitors = jsonResp.monitors
    console.log("A backup of your monitors has been made to: " + fileName)
    //console.log(JSON.stringify(monitors));

    fs.writeFile(fileName, JSON.stringify(monitors), 
        function (err) {
            if (err) return console.log(err);
        }
    )
    
    monitors.forEach(monitor => {
        updateOptions.form.id = monitor.id

        request(updateOptions, function (updateError, updateResponse, updateBody) {
            if (updateError) throw new Error(updateError);
            console.log(updateBody);
        });
    })
});
