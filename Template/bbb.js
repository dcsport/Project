var conn = require('../lib/createconnection.js');
var url = require('url');
var path = require('path');
var qs = require('querystring');

function testinghtml(body,productname){
return  `
        <!doctype HTML>
        <html>
        <head>
        <meta charset="utf-8">
        <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
        <script src="https://code.jquery.com/jquery-3.4.1.js" integrity="sha256-WpOohJOqMqqyKL9FccASB9O0KwACQJpFTUBLTYOVvVU=" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
        <style>
           form{
             margin:2px 2px 2px 2px;
             display:inline-block;
           }
        </style>
        <script>
            function fixDataOnWheel(){
                if(event.wheelDelta < 0){
                    DataScroll.doScroll('scrollbarDown');
                }else{
                    DataScroll.doScroll('scrollbarUp');
                }
                dataOnScroll()
            }
            function dataOnScroll() {
                left_contents.scrollTop = right_contents.scrollTop;
                right_header.scrollLeft = right_contents.scrollLeft;
            }
        </script>
        </head>
        <body class="bg-secondary">
        <a class="btn btn-block btn-primary" href="/" style="font-size:3rem;">Go Home</a>
        ${productname}
        ${body}
        </body>
        <script>
        $(function(){
            $('#forRowspan').each(function() {
                var table = this;
                $.each([1] /* 합칠 칸 번호 */, function(c, v) {
                    var tds = $('>tbody>tr>td:nth-child(' + v + ')', table).toArray(), i = 0, j = 0;
                    for(j = 1; j < tds.length; j ++) {
                        if(tds[i].innerHTML != tds[j].innerHTML) {
                            $(tds[i]).attr('rowspan', j - i);
                            i = j;
                            continue;
                        }
                        $(tds[j]).hide();
                    }
                    j --;
                    if(tds[i].innerHTML == tds[j].innerHTML) {
                        $(tds[i]).attr('rowspan', j - i + 1);
                    }
                });
            });
        });
        </script>
        </html>
        `;
}

exports.testsql = function(request, response){
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url,true).pathname;
  var thisyear = new Date();
  var yearmake = new Array();
  for (var i = 0; i < 6; i++) {
    yearmake.push(thisyear.getFullYear()-i );
  }

    if( queryData.companycode == undefined ){
        queryData.companycode = '';
        var productname = '<h1 style="text-align:center;">선택되지 않았습니다</h1>';
    }else{
       var filtercode = path.parse(queryData.companycode).base;

       var product_code = path.parse(queryData.companycode).base;
       var productcode_array=new Array();
    }
  var column = '`월-일`';
  var sql1 =`
        select * from ( select replace(replace(품명,' ',''),',','') as pname,품목코드,거래처명,코드,
        sum(case when ((date_format((convert(concat(연도,'-',${column}),date)),'%Y-%m'))) = '${yearmake[2]}-01' then 공급가액 else 0 end) month01,
        sum(case when ((date_format((convert(concat(연도,'-',${column}),date)),'%Y-%m'))) = '${yearmake[2]}-02' then 공급가액 else 0 end) month02,
        sum(case when ((date_format((convert(concat(연도,'-',${column}),date)),'%Y-%m'))) = '${yearmake[2]}-03' then 공급가액 else 0 end) month03,
        sum(case when ((date_format((convert(concat(연도,'-',${column}),date)),'%Y-%m'))) = '${yearmake[2]}-04' then 공급가액 else 0 end) month04,
        sum(case when ((date_format((convert(concat(연도,'-',${column}),date)),'%Y-%m'))) = '${yearmake[2]}-05' then 공급가액 else 0 end) month05,
        sum(case when ((date_format((convert(concat(연도,'-',${column}),date)),'%Y-%m'))) = '${yearmake[2]}-06' then 공급가액 else 0 end) month06,
        sum(case when ((date_format((convert(concat(연도,'-',${column}),date)),'%Y-%m'))) = '${yearmake[2]}-07' then 공급가액 else 0 end) month07,
        sum(case when ((date_format((convert(concat(연도,'-',${column}),date)),'%Y-%m'))) = '${yearmake[2]}-08' then 공급가액 else 0 end) month08,
        sum(case when ((date_format((convert(concat(연도,'-',${column}),date)),'%Y-%m'))) = '${yearmake[2]}-09' then 공급가액 else 0 end) month09,
        sum(case when ((date_format((convert(concat(연도,'-',${column}),date)),'%Y-%m'))) = '${yearmake[2]}-10' then 공급가액 else 0 end) month10,
        sum(case when ((date_format((convert(concat(연도,'-',${column}),date)),'%Y-%m'))) = '${yearmake[2]}-11' then 공급가액 else 0 end) month11,
        sum(case when ((date_format((convert(concat(연도,'-',${column}),date)),'%Y-%m'))) = '${yearmake[2]}-12' then 공급가액 else 0 end) month12,
        sum(case when ((date_format((convert(concat(연도,'-',${column}),date)),'%Y'))) = '${yearmake[2]}' then 공급가액 else 0 end) monthsub01,
        sum(case when ((date_format((convert(concat(연도,'-',${column}),date)),'%Y-%m'))) = '${yearmake[1]}-01' then 공급가액 else 0 end) month13,
        sum(case when ((date_format((convert(concat(연도,'-',${column}),date)),'%Y-%m'))) = '${yearmake[1]}-02' then 공급가액 else 0 end) month14,
        sum(case when ((date_format((convert(concat(연도,'-',${column}),date)),'%Y-%m'))) = '${yearmake[1]}-03' then 공급가액 else 0 end) month15,
        sum(case when ((date_format((convert(concat(연도,'-',${column}),date)),'%Y-%m'))) = '${yearmake[1]}-04' then 공급가액 else 0 end) month16,
        sum(case when ((date_format((convert(concat(연도,'-',${column}),date)),'%Y-%m'))) = '${yearmake[1]}-05' then 공급가액 else 0 end) month17,
        sum(case when ((date_format((convert(concat(연도,'-',${column}),date)),'%Y-%m'))) = '${yearmake[1]}-06' then 공급가액 else 0 end) month18,
        sum(case when ((date_format((convert(concat(연도,'-',${column}),date)),'%Y-%m'))) = '${yearmake[1]}-07' then 공급가액 else 0 end) month19,
        sum(case when ((date_format((convert(concat(연도,'-',${column}),date)),'%Y-%m'))) = '${yearmake[1]}-08' then 공급가액 else 0 end) month20,
        sum(case when ((date_format((convert(concat(연도,'-',${column}),date)),'%Y-%m'))) = '${yearmake[1]}-09' then 공급가액 else 0 end) month21,
        sum(case when ((date_format((convert(concat(연도,'-',${column}),date)),'%Y-%m'))) = '${yearmake[1]}-10' then 공급가액 else 0 end) month22,
        sum(case when ((date_format((convert(concat(연도,'-',${column}),date)),'%Y-%m'))) = '${yearmake[1]}-11' then 공급가액 else 0 end) month23,
        sum(case when ((date_format((convert(concat(연도,'-',${column}),date)),'%Y-%m'))) = '${yearmake[1]}-12' then 공급가액 else 0 end) month24,
        sum(case when ((date_format((convert(concat(연도,'-',${column}),date)),'%Y'))) = '${yearmake[1]}' then 공급가액 else 0 end) monthsub02,
        sum(case when ((date_format((convert(concat(연도,'-',${column}),date)),'%Y-%m'))) = '${yearmake[0]}-01' then 공급가액 else 0 end) month25,
        sum(case when ((date_format((convert(concat(연도,'-',${column}),date)),'%Y-%m'))) = '${yearmake[0]}-02' then 공급가액 else 0 end) month26,
        sum(case when ((date_format((convert(concat(연도,'-',${column}),date)),'%Y-%m'))) = '${yearmake[0]}-03' then 공급가액 else 0 end) month27,
        sum(case when ((date_format((convert(concat(연도,'-',${column}),date)),'%Y-%m'))) = '${yearmake[0]}-04' then 공급가액 else 0 end) month28,
        sum(case when ((date_format((convert(concat(연도,'-',${column}),date)),'%Y-%m'))) = '${yearmake[0]}-05' then 공급가액 else 0 end) month29,
        sum(case when ((date_format((convert(concat(연도,'-',${column}),date)),'%Y-%m'))) = '${yearmake[0]}-06' then 공급가액 else 0 end) month30,
        sum(case when ((date_format((convert(concat(연도,'-',${column}),date)),'%Y-%m'))) = '${yearmake[0]}-07' then 공급가액 else 0 end) month31,
        sum(case when ((date_format((convert(concat(연도,'-',${column}),date)),'%Y-%m'))) = '${yearmake[0]}-08' then 공급가액 else 0 end) month32,
        sum(case when ((date_format((convert(concat(연도,'-',${column}),date)),'%Y-%m'))) = '${yearmake[0]}-09' then 공급가액 else 0 end) month33,
        sum(case when ((date_format((convert(concat(연도,'-',${column}),date)),'%Y-%m'))) = '${yearmake[0]}-10' then 공급가액 else 0 end) month34,
        sum(case when ((date_format((convert(concat(연도,'-',${column}),date)),'%Y-%m'))) = '${yearmake[0]}-11' then 공급가액 else 0 end) month35,
        sum(case when ((date_format((convert(concat(연도,'-',${column}),date)),'%Y-%m'))) = '${yearmake[0]}-12' then 공급가액 else 0 end) month36,
        sum(case when ((date_format((convert(concat(연도,'-',${column}),date)),'%Y'))) = '${yearmake[0]}' then 공급가액 else 0 end) monthsub03,
        sum(case when 연도 between '${yearmake[2]}' and '${yearmake[0]}' then 공급가액 else 0 end) total
        from (select * from sell where 코드 is not null and 거래처명 not in ('','실험비','자재소모','잡손실','샘플비','재고자산감모손실','선수금','출고착오수정','폐기') order by id desc) as A
        where 품목코드 in ( ? ) group by 품목코드,코드 with rollup
        having total not in ('0') ) as B
        order by 품목코드 is null, 품목코드, 코드 is null , monthsub02 desc
        `;
var sql2 = `select * from
            (select 코드,replace(replace(replace(거래처명,'(주)',''),'주식회사',''),' ','')as cname
            from buy
            where 거래처명 not in ('','제품생산','잡수입','선입고','재고보정','실험비','자재소모','잡손실','샘플비','재고자산감모손실','선수금','출고착오수정','폐기')
            and 연도 between ${yearmake[2]} and ${yearmake[0]}  order by id desc limit 1000000000) as A  group by A.cname order by A.cname`;

var sql3 = `SELECT 품목코드 from buy where 코드 = ${filtercode} group by 품목코드 order by 품명`;
  conn.query(sql2, function (error2, resultcompany, fields) {
  conn.query(sql3, function (error3, resultproduct, fields) {

    var correctnumber = new Array();
    for(var n=0; n<resultcompany.length; n++){
      correctnumber.push(resultcompany[n].코드);
    }
//  if(queryData.companycode == undefined || queryData.companycode == '' ){
      console.log(correctnumber.includes(queryData.companycode));
    if( correctnumber.includes(queryData.companycode) ){
        for (var j = 0; j < resultproduct.length; j++){
        productcode_array.push(resultproduct[j].품목코드);
        }
    }else{
	     response.setHeader('Location', '/BBB1');
    }
  conn.query(sql1,[productcode_array] , function (error1, result, fields) {
    if (error1){console.log(error1);}
    if (error2){console.log(error2);}
    if (error3){console.log(error3);}

    var productname = filtercode;
    var body = '';
    for (var i = 0; i < resultcompany.length; i++) {
      body = body + `<form action="/BBB1" method="get">
                     <input type="hidden" name="companycode" value="${resultcompany[i].코드}">
                     <input type="submit" value="${resultcompany[i].cname}" class="btn btn-warning">
                     </form>`;
    }

    if(correctnumber.includes(queryData.companycode) ){
        var productname = `<table id="forRowspan" class="table table-sm table-borderd bg-dark text-white"></tr><th>품명</th><th>거래처명</th>`;
        var year='';
        for(var l=yearmake[2]; l<=yearmake[0]; l++){
            for(var k=1; k<13; k++){
              year = year+'<th>'+l+'-'+k+'</th>';
            }
            year = year+'<th>'+l+' 합계</th>'
        }
        productname = productname+year+'</tr>';
        var mainpage = '';

        for(var m=0; m<result.length; m++){
          mainpage = mainpage +
      //    if( result[m].품목코드 == null && result[m].코드 == null ){
                               `<tr>
                                <td>${result[m].pname}</td>
                                <td>${result[m].거래처명}</td>
                                <td>${result[m].month01}</td>
                                <td>${result[m].month02}</td>
                                <td>${result[m].month03}</td>
                                <td>${result[m].month04}</td>
                                <td>${result[m].month05}</td>
                                <td>${result[m].month06}</td>
                                <td>${result[m].month07}</td>
                                <td>${result[m].month08}</td>
                                <td>${result[m].month09}</td>
                                <td>${result[m].month10}</td>
                                <td>${result[m].month11}</td>
                                <td>${result[m].month12}</td>
                                <td>${result[m].monthsub01}</td>
                                <td>${result[m].month13}</td>
                                <td>${result[m].month14}</td>
                                <td>${result[m].month15}</td>
                                <td>${result[m].month16}</td>
                                <td>${result[m].month17}</td>
                                <td>${result[m].month18}</td>
                                <td>${result[m].month19}</td>
                                <td>${result[m].month20}</td>
                                <td>${result[m].month21}</td>
                                <td>${result[m].month22}</td>
                                <td>${result[m].month23}</td>
                                <td>${result[m].month24}</td>
                                <td>${result[m].monthsub02}</td>
                                <td>${result[m].month25}</td>
                                <td>${result[m].month26}</td>
                                <td>${result[m].month27}</td>
                                <td>${result[m].month28}</td>
                                <td>${result[m].month29}</td>
                                <td>${result[m].month30}</td>
                                <td>${result[m].month31}</td>
                                <td>${result[m].month32}</td>
                                <td>${result[m].month33}</td>
                                <td>${result[m].month34}</td>
                                <td>${result[m].month35}</td>
                                <td>${result[m].month36}</td>
                                <td>${result[m].monthsub03}</td>
                                </tr>`;
                      //        }
        }
        productname = productname+mainpage
        productname = productname+`</table>`;
        }

    var html = testinghtml(body,productname);
    response.writeHead(200);
    response.end(html);
    })
    })
    });
};
