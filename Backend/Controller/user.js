const User = require('../Models/User');
const passport = require('passport');

module.exports.registerNewUser = async(req,res,next) => {
    let {username , email , password} = req.body;
    let newUser = new User({username, email});
    let registerUser = await User.register(newUser, password);
    req.login(registerUser, (err) => {
      if(err){
        return next(err);
      }
      return res.json({message : `Welcome ${req.user.username} to rentify`, user:req.user});
    });
};

module.exports.login = (req,res) => {
  res.json({message : `Welcome back ${req.user.username} to rentify`, user : req.user});
}

module.exports.logout = (req, res, next) => {
  req.logout(function (err) {
    if (err) { return next(err) }

    // destroy session
    req.session.destroy((err) => {
      if (err) { return next(err) }
      res.clearCookie('connect.sid');
      return res.json({ success: true, message: "Logged out" });
    });
  });
};

module.exports.isUserAuthenticate = (req, res) => {
  if (req.isAuthenticated()) {
    return res.json({ isAuthenticated: true, user: req.user });
  }
  res.json({ isAuthenticated: false });
}
