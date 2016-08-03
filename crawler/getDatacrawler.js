/**
 * Created by hzq on 16-8-2.
 */
var config = require('../config');
var mysql = require('mysql');
var conn = mysql.createConnection(config.db);
var request = require('request');
// var cheerio = require('cheerio');
var EventEmitter = require('events').EventEmitter;
var myEvents = new EventEmitter();
var start = 1,
    isFinish = false;
exports.updateFans = function () {
    var limit_range = (start - 1) * 10 + ',' + 10;
    var sql = 'SELECT * FROM orignal_ingkee_2016_08_01 WHERE fans = 0 limit ' + limit_range + ';';
    conn.query(sql, function (err, rows) {
        if (err) {
            conn.end();
            return console.log(err + "orignal_ingkee_2016_08_01 sql1");
        }
        if (rows.length > 0) {
            start++;
            for (var i = 0; i < rows.length; i++) {
                myEvents.emit('getFans', rows[i].owner_uid);
            }
        } else {
            isFinish = true;
        }
    });
    if (isFinish) {
        isFinish = false;
        start = 1;
        return true;
    } else {
        return false;
    }
};

myEvents.on('getFans', function (uid) {
    var optionsfordetail = {
        method: 'GET',
        encoding: null,
        url: 'http://service5.inke.tv/api/user/relation/numrelations?id=' + uid
    };
    request(optionsfordetail, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            if (data.length == 0) {
                // isMainFinish = true;
                return;
            }
            acquireData1(data, uid);
        } else {
            return console.log(uid + error);
        }

    });
});

function acquireData1(data, uid) {
    var sql = 'UPDATE orignal_ingkee_2016_08_01 SET fans = ? WHERE owner_uid = ?';
    var parms = [data.num_followers, uid];
    conn.query(sql, parms, function (err) {
        if (err) {
            conn.end();
            return console.log(err + "ingkee sql3");
        }
    });
}

var pn = 1;
exports.updateScore = function () {
    var limit_range = (pn - 1) * 10 + ',' + 10;
    var sql = 'SELECT * FROM orignal_ingkee_2016_08_01 limit ' + limit_range + ';';
    conn.query(sql, function (err, rows) {
        if (err) {
            conn.end();
            return console.log(err + "orignal_ingkee_2016_08_01 sql2");
        }
        if (rows.length > 0) {
            pn++;
            for (var i = 0; i < rows.length; i++) {
                acquireData2(rows[i].online, rows[i].fans, rows[i].owner_uid);
            }
        } else {
            isFinish = true;
        }
    });
    if (isFinish) {
        isFinish = false;
        pn = 1;
        return true;
    } else {
        return false;
    }
};

function acquireData2(online, fans, uid) {
    var sql = 'UPDATE orignal_ingkee_2016_08_01 SET score = ? WHERE owner_uid = ?';
    var parms = [Math.round(online * 0.05 + fans * 0.95), uid];
    conn.query(sql, parms, function (err) {
        if (err) {
            conn.end();
            return console.log(err + "orignal_ingkee_2016_08_01 sql2");
        }
    });
}