
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Colors' });
};

/*
 * GET present page.
 */

exports.collector = function(req, res){
  res.render('present', { title: 'present' });
};

/*
 * GET user page.
 */

exports.user = function(req, res){
  res.render('user', { title: 'user' });
};
