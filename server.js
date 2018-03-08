const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: process.env.port || 3000 });
var query=require("./mysql.js");

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    var json = JSON.parse(message);
    var lat = json.t;
    console.log("lat:" + lat);
    var sqlStr = "";  
    //插入多条sql语句  
    //为了防止sql注入攻击，使用connection对象的escape方法对用户输入的数据进行escape编码处理  
    //有些情况下，可能由用户决定使用某个sql标识符（数据库名、数据表名、字段名等），这时候，使用escapeId方法编码处理该标识符  
    sqlStr += 'insert into machineryxy(positionX,positionY,machineryOperationId,speed,positionSequence) values(' 
        + json.x + ',' + json.y + ','+json.a+','+json.s+','+json.t+');';  

    console.log(sqlStr);
    query(sqlStr,function(err,result){  
      if(err){  
          console.log('插入数据失败:' + sqlStr + ',err:' + err);  
      }else{  
          //console.log('插入数据成功');  
      }  
    })  
  });

  //ws.send('something response');
});