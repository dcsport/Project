var conn = require('../lib/createconnection.js');
var url = require('url');
var path = require('path');
var qs = require('querystring');

// LIST function
  function listsell(results){
       numRowslist = results.length;
       var list = '<div class="container"><table class="table table-bordered bg-dark text-white"><tr><td colspan="5">행갯수는 : '+numRowslist+' 입니다</td></tr>';
       var list = list + '<tr><td>연도</td><td>품명</td><td>품목코드</td><td>수량</td><td>공급가액</td></tr>';
       for(i=0; i<results.length; i++){
         var thisisnumber = Number(results[i].공급가액).toLocaleString()
         list = list+'<tr><td>'+results[i].연도+'</td><td>'+results[i].품명+'</td><td><a href="/productcode?productcode='+results[i].품목코드+'">'+results[i].품목코드+'</a></td><td align="right">'+results[i].수량+'</td><td align="right">'+thisisnumber+'</td></tr>';
         }
       var list = list+'</table></div>';
       return list;
  }

  function detailebody(topic){
    numRowTopic = topic.length;
    var body = '<div class="container"><table class="table table-bordered bg-white text-dark"><tr><th colspan="3">'+topic[0].품명+'갯수'+numRowTopic+'개</th></tr>';
    for(i=0; i<topic.length; i++){
      body = body + '<tr><td>'+topic[i].연도+'</td><td>'+topic[i].수량+'</td><td>'+topic[i].공급가액+'</td></tr>';
    }
    var body = body+'</table></div>';
    return body;
  }

  // HTML function
  function mainhtml(title,list,body){
    return  `<html>
            <head>
            <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
            <script src="https://code.jquery.com/jquery-3.4.1.js" integrity="sha256-WpOohJOqMqqyKL9FccASB9O0KwACQJpFTUBLTYOVvVU=" crossorigin="anonymous"></script>
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
            <meta charset='utf-8'>
            <title>${title}</title>
            </head>
            <body class="bg-secondary">
            <a href="/" class="btn btn-block btn-primary">${title}</a>
            <br><br>
            ${list}
            ${body}
            </body>
            </html>`;
  }

exports.product = function(request, response){
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url,true).pathname;
  var sql = `
            SELECT * FROM sell
            where 연도 = '2019' order by id desc limit 10
            `;
  conn.query(sql, function (error, results, fields) {
    if (error){console.log(error);}
    console.log(results);
    var list = listsell(results);
    var title ='product sellpageE';
    var html = mainhtml(title,list,'<h1 style="text-align:center;">CHOOSE Product number</h1>');
    response.writeHead(200);
    response.end(html);
    });
};

exports.detaile = function(request, response){
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url,true).pathname;
  var filteredID = path.parse(queryData.productcode).base;
  var sql1 = `
            SELECT * FROM sell
            where 연도 = '2019' order by id desc limit 10
            `;
  var sql2 =`select * from sell where 품목코드=? group by 연도 order by 연도 `;
  conn.query( sql1 ,function(error,topics){
  conn.query( sql2 ,[filteredID],function(error,topic){
  var title = 'Name is : '+topic[0].품명;
  var list = listsell(topics);
  var body = detailebody(topic);
  var html = mainhtml(title,list,body);
  response.writeHead(200);
  response.end(html);
  })
  });
}
