const express = require("express");
const methodOverride = require('method-override')
const flash = require("connect-flash");
const session = require("express-session");
const MemoryStore = require('memorystore')(session);
const mongoose = require("mongoose");
const ideaRoutes = require("./routes/ideaRoutes");
const userRoutes = require("./routes/userRoutes");
const passport = require("passport");
const db = require("./config/database");

const app = express();

mongoose.connect(db.dbURI, { useNewUrlParser: true, useUnifiedTopology: true , useCreateIndex: true})
.then((result) => {
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
 console.log("listening for requests");
});
})
.catch(err => console.log(err));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set( "view engine", "ejs");
app.use(methodOverride('_method'));
app.use(session({
  cookie: { maxAge: 86400000 },
  store: new MemoryStore({
      checkPeriod: 86400000 // prune expired entries every 24h
    }),
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
require("./config/passport")(passport);

app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();
});

app.get('/', (req, res) => {
    res.render("index");
});

app.get('/about', (req, res) => {
    res.render("about");
});

app.use("/ideas", ideaRoutes);
app.use("/users", userRoutes);
