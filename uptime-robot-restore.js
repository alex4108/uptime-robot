const request = require("request")
const util = require('util')
const fs = require('fs')
const API_KEY = process.env.API_KEY
const RESTORE_FILE = process.env.RESTORE_FROM


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
    
    fs.readFile(RESTORE_FILE, 'utf8', 
        function (err,data) { 
            const monitors = JSON.parse(data)        
            monitors.forEach(monitor => {
                updateOptions.form.id = monitor.id
                updateOptions.form.friendly_name = monitor.friendly_name
                updateOptions.form.url = monitor.url
                updateOptions.form.interval = monitor.interval
                
                request(updateOptions, function (updateError, updateResponse, updateBody) {
                    if (updateError) throw new Error(updateError);
                    console.log(updateBody);
                });
            })
        }
    )
    
});
