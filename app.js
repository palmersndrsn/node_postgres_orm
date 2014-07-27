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
app.get("/people/edit/:id", function(req,res){
  var currentId = req.params.id
   res.render("people/edit");
});


// new person
app.post("/people", function(req, res){
 Person.create({firstname: req.body.firstName, lastname: req.body.lastName}, function(err, person){      
   res.redirect("/people");
  });
});

//destroy single person
app.delete("/people/:id", function(req, res){
  var currentId = req.params.id
  console.log(currentId)
    
    Person.findBy('id',currentId, function(err, person) {
       person.destroy(function(err) {
          res.redirect("/people");
    });
  });
});


app.put("/people/:id", function(req,res){
 var currentId = req.params.id
  
  Person.findBy('id',currentId, function(err, person) {
   var personUpdate = req.body.person;
    console.log(personUpdate)

     person.update({firstname: req.body.firstName, lastname: req.body.lastName}, function(err, person){      
      res.redirect("/people");
     });
  });
});

app.listen(3000, function(){
  console.log("THE SERVER IS LISTENING ON localhost:3000");
});
