var express = require('express'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  Person = require('./models/main.js').Person,
  app = express();



app.set("view engine", "ejs");
// Middleware
app.use(bodyParser.urlencoded());
app.use(methodOverride("_method"));


//shows index of all people
app.get("/people", function(req, res){
  Person.all(function(err,allPeople){
    res.render("people/index", {people: allPeople})
    });
});

//creating new person
app.get("/people/new", function(req, res){
  res.render("people/new")
});


//show one person
app.get("/people/:id", function(req,res){
  var currentId = req.params.id;
    Person.findBy("id", currentId, function(err, person){
      res.render("people/show", {people: person})
  });
});

//editing single person need
app.get("/people/:id/edit", function(req,res){
  res.render("people/edit", {person: {} });
});



app.post("/people", function(req, res){

});

//destroy single person
app.delete("/people/:id", function(req, res){
  var id = req.params.id;
    Person.destroy(function(err, id){
      res.redirect("/people");
    });
});


app.put("/people/:id", function(req,res){
  res.redirect("/people");
});

app.listen(3000, function(){
  console.log("THE SERVER IS LISTENING ON localhost:3000");
});
