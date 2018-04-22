var mysql = require('mysql');  
var table = 'machineryxy';    //表名  
console.log(process.env.mysqlhost);
console.log(process.env.password);

var pool = mysql.createPool({
    host: process.env.mysqlhost,
    user: 'root',
    password: process.env.password,
    database: 'onemap',
    port: 3306,
    multipleStatements : true   //默认是禁止多语句操作，把该属性设置为true，即可执行多条语句  
   });
var query=function(sql,callback){
    pool.getConnection(function(err,conn){
        if(err){
            callback(err,null,null);
        }else{
            conn.query(sql,function(qerr,vals,fields){
                //释放连接
                conn.release();
                //事件驱动回调
                callback(qerr,vals,fields);
            });
        }
    });
};
module.exports=query;   

function insertData(){  
    var sqlStr = "";  
    //插入多条sql语句  
    //为了防止sql注入攻击，使用connection对象的escape方法对用户输入的数据进行escape编码处理  
    //有些情况下，可能由用户决定使用某个sql标识符（数据库名、数据表名、字段名等），这时候，使用escapeId方法编码处理该标识符  
    for(var i=0;i<3;i++){  
        sqlStr += 'insert into ' + table + '(positionX,positionY,machineryOperationId) values(' + i + ',' + i + ','+i+');';  
    }  
    connection.query(sqlStr,function(err,result){  
        if(err){  
            console.log('插入数据失败');  
        }else{  
            console.log('插入数据成功');  
        }  
    })  
}  