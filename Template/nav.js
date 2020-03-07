exports.main = function(request, response){
var title ='Main PAGE';
var header=`
<html>
<head>
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>
<meta charset='utf-8'>
<title>${title}</title>
</head>
<body>
${title}
</body>
</html>
`;

response.writeHead(200);
response.end(header);
}
