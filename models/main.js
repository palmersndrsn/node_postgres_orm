var Person = require('./person');

var Models = {};

Models.Person = Person;

// Models.Person.all(function(err, people){
//   console.log(people);
// });

// // find by
// Models.Person.findBy("id", 4, function(err, person){
  // console.log("found", person);
  // person.update({firstname: "sam", lastname: "creek"}, function(err, person){
  //   console.log("UPDATED:", person)
  // });
// })
//unfinished for create
// Models.Person.Create({fisrtname: 'The' lastname: 'Dude', function()})

//for Destroy
// Models.Person.findBy('id',1, function(err, person) {
// 	var personToDestroy = person;
// 		personToDestroy.destroy();
// 			console.log('destroy' + personToDestroy )
// })

module.exports = Models;
