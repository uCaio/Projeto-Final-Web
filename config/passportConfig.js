const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { Cliente } = require('../models/db').models;
const bcrypt = require('bcryptjs');

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await Cliente.findOne({ where: { username } });
      if (!user) return done(null, false, { message: 'Usuário não encontrado' });

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) return done(null, false, { message: 'Senha incorreta' });

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await Cliente.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
