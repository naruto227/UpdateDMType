/**
 * Created by hzq on 16-8-2.
 */
var path = require('path');

var config = {
    // debug 为 true 时，用于本地调试
    debug: true,

    upload: {
        path: path.join(__dirname, 'public/images/'),
        url: '/public/upload/',
        uploadurl: 'http://120.27.94.166:2999/'
    },

    sitesetting: ['huajiao', 'laifeng', 'longzhu', 'ingkee'],//'sixrooms',
    // host:"from 121.42.176.30",
    host: "from 192.168.199.233s",

    db:{
     host: 'rm-2zee5eu70c10m7ubu.mysql.rds.aliyuncs.com',
     user: 'dataguiding',
     password: 'redhat2016',
     database: 'rank',
     port: 3306
     }
    
    /*db:{
     host: 'localhost',
     user: 'root',
     password: 'xidian@513',
     database: 'douyu',
     port: 3306
     }*/

};


module.exports = config;