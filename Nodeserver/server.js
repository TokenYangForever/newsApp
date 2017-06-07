var mysql = require('mysql'); //调用MySQL模块
var express = require('express');
var bodyParser = require("body-parser"); 
var app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.all('*', function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "X-Requested-With");
   res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
   res.header("X-Powered-By",' 3.2.1');
   res.header("Content-Type", "application/json;charset=utf-8");
   next();
});
var connection = mysql.createConnection({   
  host: 'localhost',
  user: 'root',
  password: 'newpass',
  database: 'newsbase', 
  port: '3306'
});
connection.connect(function(err){ 
  if(err){     
    console.log('[query] - :'+err); 
    return; 
  } 
  console.log('[connection connect] succeed!'); 
}); 

app.get('/getrecommendNews.html', function (req, res) {
  // req.query 请求参数
  var result = [];
  //var qstring = 'SELECT * from admins where username="'+req.query.name+'"';
  var qstring = 'SELECT * from recommendnews'
  connection.query(qstring,[2], function(err, rs) { 
    if (err) { 
      console.log('[query] - :'+err); 
      return; 
    } 
    //result = rs;
    for(var i=0;i<rs.length;i++){
      result.push(rs[i]);
    }
    res.send(result);
  });  
});

app.get('/getcalNews.html', function (req, res) {
  // req.query 请求参数
  var result = [];
  var backdata = {}
  var qstring = 'SELECT * from topnewsimgs'
  var qstring2 = 'SELECT * from topnewtext'
  connection.query(qstring,[2], function(err, rs) { 
    if (err) { 
      console.log('[query] - :'+err); 
      return; 
    } 
    for(var i=0;i<rs.length;i++){
      result.push(rs[i]);
    }
    backdata.data = result;
    backdata.imglength = rs.length;
    connection.query(qstring2,[2], function(err, rs) {
      if (err) { 
        res.send(backdata);
        console.log('[query] - :'+err); 
        return; 
      }
      backdata.scrollNews = rs;
      res.send(backdata);
    });
  });  
});

app.post('/saveNews.html', function (req, res) {
  var backdata = [];
  rdata = req.body;
  for(var i = 0;i<rdata.datalength;i++){
    var seItem = 'sendData['+i+']';
    var userAddSql = "INSERT INTO "+ rdata.tablename +"(author,allPics,URL,title,summary,comments,type) VALUES(?,?,?,?,?,?,?)";
    var userAddSql_Params = [
      rdata[seItem+'[author]'],
      rdata[seItem+'[allPics]'],
      rdata[seItem+'[URL]'],
      rdata[seItem+'[title]'],
      rdata[seItem+'[summary]'],
      rdata[seItem+'[comments]'],
      rdata[seItem+'[type]'],
    ]
    connection.query(userAddSql,userAddSql_Params, function (err, result) {
      if(err){
       console.log('[INSERT ERROR] - ',err.message);
       return;
      }       
    });
  }
  res.send(200);
});
var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
})
