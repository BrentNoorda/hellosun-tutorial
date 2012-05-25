
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'HelloSun' })
};

exports.chatty = function(req, res){
  res.render('chatty', { title: 'HelloSun' })
};
