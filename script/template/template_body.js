module.exports = {
  HTML: function (title) {
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
  ${title}
</body>

</html>
`;
  }
}