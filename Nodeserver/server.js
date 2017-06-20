var mysql = require('mysql'); //调用MySQL模块
var express = require('express');
var bodyParser = require("body-parser"); 
var cheerio = require('cheerio');
var request = require('request');
var http = require('http')
var app = express()
const renderer = require('vue-server-renderer').createRenderer({
  template: require('fs').readFileSync('./views/temp.html', 'utf-8')
})
const Vue = require('vue')
app.use(bodyParser.urlencoded({ extended: false }));
app.all('*', function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "X-Requested-With");
   res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
   res.header("X-Powered-By",' 3.2.1');
   // res.header("Content-Type", "application/json;charset=utf-8");
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

app.get('/searchNews.html', function (req, res) {
  var reqdata = req.query;
  var backdata = {};
  var result =[];
  if(!reqdata || !reqdata.searchval) {
    backdata.data = '缺少参数searchval'
    res.send(backdata)
  }
  var qstring = 'SELECT * FROM allnews WHERE title like "%'+ reqdata.searchval +'%"';
  connection.query(qstring, function(err, rs) { 
    if (err) { 
      console.log('[query] - :'+err); 
      return; 
    } 
    for(var i=0;i<rs.length;i++){
      result.push(rs[i]);
    }
    backdata.data = result || []
    res.send(backdata);
  }); 
});

app.get('/getNewsByType.html', function (req, res) {
  var reqdata = req.query;
  var result = [];
  if(!reqdata || !reqdata.type) {
    res.send('缺少参数type')
  }
  reqdata.index = reqdata.index || 0;
  reqdata.len = reqdata.len || 10;
  var tablename = reqdata.type + 'news'
  //var qstring = 'SELECT * from admins where username="'+req.query.name+'"';
  var qstring = 'SELECT * from '+ tablename + ' limit '+ reqdata.index +','+reqdata.len
  connection.query(qstring,[2], function(err, rs) { 
    if (err) { 
      console.log('[query] - :'+err); 
      return; 
    } 
    var backdata = {}
    for(var i=0;i<rs.length;i++){
      result.push(rs[i]);
    }
    backdata.data = result || []
    res.send(backdata);
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

app.get('/getDetail.html', function (req, res) {
  // req.query 请求参数
  var result = [];
  var backdata = {};
  if (!req.query.url) {
    res.send('需要参数url')
  }
  request(req.query.url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(body,{decodeEntities: false});
      var ptext = transHtml($('p'));
      var imgs = transImg($('img'));
      // var htmlcontent = ptext+imgs;
      const context = {
        title: $('title').text()
      }
      // backdata.htmlContent = ptext+imgs;
      // backdata.title = $('h1').text();
      // backdata.code = 200;
      // res.send(backdata)
      const app = new Vue({
        data: {
          pArr: ptext,
          imgArr: imgs
        },
        template: `<div><div class="newsContent"><p v-for='item in pArr'>{{item}}</p></div><div class="imgsContent"><img v-for='item in imgArr' :src='item'></div></div>`
      })
    
      renderer.renderToString(app, context, (err, html) => {
        if (err) {
          res.status(500).end('Internal Server Error')
          return
        }
        res.end(html)
      })

    } else {
      // do error
    }
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

function transHtml (obj) {
  var result = []
  // var result = '<div class="newsContent">'
  for (var i = 0; i < obj.length; i++) {
    if (obj.eq(i).text()) {
      result.push(obj.eq(i).text())
      // result+='<p>' + obj.eq(i).text() + '</p>'
    } else {
      continue;
    }
  }
  return result;
  // return result+='</div>'
}

function transImg (obj) {
  // var result = '<div class="imgsContent">'
  var result = []
  for (var i = 0; i < obj.length; i++) {
    if (obj.eq(i).attr('src')) {
      result.push(obj.eq(i).attr('src'))
      // result+='<img src='+ obj.eq(i).attr('src') + '></img>'
    } else {
      continue;
    }
    
  }
  // return result+='</div>'
  return result
}
var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
})
