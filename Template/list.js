module.exports = {
     listsell:function(results){
       numRows = results.length;
       var list = '<div class="container"><table class="table table-bordered bg-dark text-white"><tr><td colspan="5">행갯수는 : '+numRows+' 입니다</td></tr>';
       var list = list + '<tr><td>연도</td><td>품명</td><td>품목코드</td><td>수량</td><td>공급가액</td></tr>';
       for(i=0; i<results.length; i++){
         var thisisnumber = Number(results[i].공급가액).toLocaleString()
         list = list+'<tr><td>'+results[i].연도+'</td><td>'+results[i].품명+'</td><td><a href="/productcode?productcode='+results[i].품목코드+'">'+results[i].품목코드+'</a></td><td align="right">'+results[i].수량+'</td><td align="right">'+thisisnumber+'</td></tr>';
         }
       var list = list+'</table></div>';
       return list;
     }

}
