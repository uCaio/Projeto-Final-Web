const passport = require('passport');

const renderLoginPage = (req, res) => {
  res.render('login');
};

const loginUser = (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/', // Redireciona para a página inicial
    failureRedirect: '/login',
    failureFlash: true,
  })(req, res, next);
};

const logoutUser = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect('/');
  });
};

const renderDashboard = (req, res) => {
  res.render('dashboard', { user: req.user });
};

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
};

module.exports = { renderLoginPage, loginUser, logoutUser, renderDashboard, isAuthenticated };
