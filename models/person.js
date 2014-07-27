var db = require('./db');

function Person(params) {
  this.firstname = params.firstname;
  this.lastname = params.lastname;
  this.id = params.id;
};


Person.all = function(callback){
  db.query("SELECT * FROM people",[], function(err, res){
    var allPeople = [];
      if (err) {
        console.log('DOH' + err);
            } else {
      res.rows.forEach(function(x){   
        allPeople.push(new Person(x))
        });
      }
    callback(err, allPeople);
  });
};

Person.findBy = function(key, val, callback) {
 if (val === null) {
  console.log('DOH! null ID')
} else {
   db.query('SELECT * FROM people WHERE ' + key + '=$1',[val], function(err, res){
    var foundRow, foundPerson;
     foundRow = res.rows[0]; 
       person = new Person(foundRow);
        callback(err, person);
   
  });
 }
};



Person.create = function(params, callback) {
  db.query("INSERT INTO people (firstname, lastname) VALUES ($1, $2) RETURNING * " , [params.firstname, params.lastname], function(err, res){
    var createdRow, newPerson;
    createdRow = res.rows[0]
    newPerson = new Person(createdRow);
    console.log(createdRow)
    console.log(newPerson)
    //add create
    callback(err, newPerson);
  });
};

Person.prototype.update = function(params, callback) {
  var colNames = [];
  var colVals = [];
  var count = 2;

  for(var key in this) {
    if(this.hasOwnProperty(key) && params[key] !== undefined){
      var colName = key + "=$" + count;
      colNames.push(colName);
      colVals.push(params[key]);
      count++;
    }
  }

  var statement = "UPDATE people SET " + colNames.join(", ") + " WHERE id=$1 RETURNING *";
  var values = [this.id].concat(colVals);
  console.log("Running:");
  console.log(statement, "with values", values);
  var _this = this;
  db.query(statement, values, function(err, res) {
    var updatedRow;
    if(err) {
      console.error("DOH! Something went wrong!", err);
    } else {
      updatedRow = res.rows[0];
      _this.firstname = updatedRow.firstname;
      _this.lastname = updatedRow.lastname;
    }
    callback(err, _this)
  });
}
//need to use findBy to create it as an object to be able to destroy it
Person.prototype.destroy = function(callback){
  db.query('DELETE FROM people WHERE id=$1', [this.id], function(err, res) {
    callback(err);

  });
}

module.exports = Person;
