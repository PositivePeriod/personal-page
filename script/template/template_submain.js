module.exports = {
  HTML: function (submain, filelist) {
    return `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge, chrome-1" />
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0">
  <title>Jeuk Hwang</title>
</head>

<body>
  Welcome to visit ${submain}<br>
  Where do you want to go more deeper?<br>
  ${filelist}
</body>

</html>
`;
  },
  list: function (submain, filelist) {
    var list = '<ul>';
    filelist.forEach(file => {
      list += `<li><a href="./${submain}/${file}">${file}</a></li>`;
    });
    list += '</ul>';
    return list
  }
}