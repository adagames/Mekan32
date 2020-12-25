const hakkinda = function(req, res, next) {
  res.render('hakkinda', 
    { 
      title: 'Hakkında',
      'footer' : 'Ömer Ada 2020'
    }
  );
}

module.exports = {
  hakkinda
}