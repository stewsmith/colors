
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Colors' });
};

/*
 * GET collector page.
 */

exports.collector = function(req, res){
  res.render('collector', { title: 'collector' });
};

/*
 * GET user page.
 */

exports.user = function(req, res){
  res.render('user', { title: 'user' });
};
