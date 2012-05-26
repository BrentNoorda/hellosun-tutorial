/*jslint white:false plusplus:false nomen:false */
/*globals exports */

/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'HelloSun' });
};

exports.chatty = function(req, res){
  res.render('chatty', { title: 'HelloSun' });
};
