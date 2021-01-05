const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const passport = require("passport");

const router = express.Router();

router.get( "/login", (req, res) => {
  let error = [];
res.render("users/login");
});

router.get("/register", (req, res) => {
let errors = [];
res.render("users/register", {
errors,
name: req.body.name,
email: req.body.email,
password: req.body.password,
password2: req.body.password2
});
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect:"/ideas",
    failureRedirect:"/users/login",
    failureFlash: true
  })(req, res, next);
});

router.post("/register", (req, res) => {
let errors = [];
if(req.body.password != req.body.password2){
  errors.push({text: "passwords do not match"});
}
if(req.body.password.length < 4){
  errors.push({text: "password must exceed 3 characters"});
}
if(errors.length > 0){
  res.render("users/register", {
    errors,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    password2: req.body.password2
  });
} else {
  User.findOne({email: req.body.email})
  .then(user => {
    if (user) {
      req.flash("error_msg", "Email already registered");
      res.redirect ("/users/register");
    } else {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
              if(err) throw err;
              user.password = hash;
              user.save()
                .then(user => {
                  req.flash("success_msg", "Registration successful. You can now login.");
                  res.redirect("/users/login");
                })
                .catch(err => {throw err;
                              return;
                            });
            });
        }); }
  }) .catch(err => {throw err;
                return;
              });

}
});

router.get( "/logout", (req, res) => {
  req.logout();
req.flash("success_msg", "You are now logged out");
res.redirect("/users/login");
});


module.exports = router;
