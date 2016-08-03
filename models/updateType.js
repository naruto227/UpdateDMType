/**
 * Created by hzq on 16-8-3.
 */
var schedule = require('node-schedule'),
    rule = new schedule.RecurrenceRule();
var times = [];
var EventEmitter = require('events').EventEmitter;
var myEvents = new EventEmitter();
var updateTypecrawler = require('../crawler/updateTypecrawler');

myEvents.on('gameover', function () {
    // getdata.uploadServe('ingkee');
});
var isRunning = false;
exports.updateType = function () {
    if (isRunning) {
        return false;
    } else {
        isRunning = true;
        sub();
        return true;
    }
};

myEvents.on('start', function () {
    rule.second = times;
    for (var i = 0; i < 60; i = i + 5) {
        times.push(i);
    }
    schedule.scheduleJob(rule, function () {
        if (updateTypecrawler.updateType()) {
            this.cancel();
            console.log('update type end');

            // myEvents.emit('updateScore');
        }
    });
});

/*myEvents.on('updateScore', function () {
    rule.second = times;
    for (var i = 0; i < 60; i = i + 5) {
        times.push(i);
    }
    schedule.scheduleJob(rule, function () {
        if (updateTypecrawler.updateScore()) {
            this.cancel();
            console.log('update orignal_ingkee_2016_08_01 score end');

            // myEvents.emit('updateScore');
        }
    });
});*/

var mypretime = 0;
function sub() {
    var Today = new Date();
    var NowHour = Today.getHours();
    var NowMinute = Today.getMinutes();
    var NowSecond = Today.getSeconds();
    var mysec = (NowHour * 3600) + (NowMinute * 60) + NowSecond;
    if ((mysec - mypretime) > 10) {
        //10只是一个时间值，就是10秒内禁止重复提交，值随便设
        mypretime = mysec;
    } else {
        return;
    }
    myEvents.emit('start');
}