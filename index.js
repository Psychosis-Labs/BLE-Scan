const noble = require('@abandonware/noble');
var mysql = require('mysql2');
var moment = require('moment');
const thislocation = "LocationName";
const connection = mysql.createConnection({
    host: 'google.com',
    user: 'jeffBezos',
    database: 'not-a-DB',
    password: 'fakePassword'
});


var counted = 0;

noble.startScanning(); // any service UUID, allow duplicates upon connect

noble.on('discover', periphreal => {
    connection.query("INSERT INTO `BLEHistory` (`id`, `moment`, `name`, `address`, `location`) VALUES (NULL, '" + moment.now() + "', '" + periphreal.advertisement.localName +  "', '" + periphreal.id + "', '" + thislocation +"');", (error,results,fields) => {
        if(error) throw error;
    });
    if(periphreal.advertisement.localName != undefined){
        console.log("Found:  " + periphreal.advertisement.localName);
    } else {
        console.log("Found Unnamed BLE: " + periphreal.id)
    }
    
});
