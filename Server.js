var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var qs = require('querystring');
var conn = require('./lib/createconnection.js');


var ejs = require('ejs');
var navigation = require('./Template/nav.js');
var productsell = require('./Template/productsell.js');
var testingbbb = require('./Template/bbb.js');

var app = http.createServer(function(request, response){
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url,true).pathname;
  console.log(url.parse(_url,true));

  if(pathname === '/'){
    fs.readFile('./Template/main.html','utf8',function(error,data){
      console.log(data);
      response.writeHead(200);
      response.end(data);
    });
    return;
  }
  if(pathname === '/CCC'){
    productsell.product(request,response);
    return;
  }
  if(pathname === '/BBB1'){
    testingbbb.testsql(request,response);
    return;
  }
  if(pathname === '/BBB2'){
    testingbbb.testsql2(request,response);
    return;
  }
  if(pathname === '/productcode'){
    productsell.detaile(request,response);
    return;
  }
  // EJS TESTING
  if(pathname === '/testing'){
    function doRequest(request, response){
          var hello = fs.readFileSync('./Template/Testing.ejs', 'utf8');
          var hello2 = ejs.render(hello,{
          title: "제목입니다.",
          content: ejs.render(content1,
          { data: [ "이것은 최초의 데이터입니다.", "다음 데이터이다.", "제일 마지막의 데이터이다." ] })
          });

    console.log(hello2);
    response.writeHead(200);
    response.end(hello2);
    return;
    };

  }
  if(pathname === '/DDDD'){
    conn.query('SELECT * FROM sell', function (error, results, fields) {
      if (error) {
          console.log(error);
      }
      console.log(results);
    });
    return;
  }

response.writeHead(404,{"Content-Type":"text/plain"});
response.end('404 ERROR : PAGE NOT FOUND !');
});
app.listen(3000);
