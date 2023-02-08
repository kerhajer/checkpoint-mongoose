const express = require('express')
const mongoose = require("mongoose")

const app = express();

const dotenv = require('dotenv')

dotenv.config()


//connect to DB
mongoose.set('strictQuery', true)
mongoose.connect(process.env.MONGO_URI,err=> err? console.log(err) : console.log('DB is connected ...'))


//Create a person having this prototype:
let personSchema = new mongoose.Schema({
    name: {type: String, required: true},
    age: Number ,
    favoriteFoods : [ String] 
  })
  const Person = mongoose.model('Person', personSchema);
   //Create and Save a Record of a Model:
  let person = new Person({
      name:'Hejer',
      age: 32,
      favoriteFoods :['Spagetti','Tajjin']
  })
  person.save((err, data) => {
    err ? console.log(error) : console.log('person is saved', data) 
}) 


//Create Many Records with model.create()
let persons= Person.create([{"name":"Youssef", age: 28, "favoriteFoods":['jolbana', 'kamounia', 'ojja']},
{"name":"Safa", age: 38, "favoriteFoods":['koskous', 'pizza','ojja']},
{"name":"Amal", age: 5, "favoriteFoods":['Felfoul', 'pizza']},
{"name":"Aroua", age: 18, "favoriteFoods":['broudou', 'rouz']},
{"name":"Manel", age: 25, "favoriteFoods":['mosli', 'rouz']}
])
.then((persons)=>{
    console.log("persons are saved",persons)
    })
    .catch(err=>console.log(err))   
//Use model.find() to Search Your Database



  Person.find({ name: 'Youssef'}, function (err, Person) {
    if (err){
        console.log(err);
    }
    else{
        console.log("person who named youssef : ", Person);
    }
});  
 
//Use model.findOne() to Return a Single Matching Document from Your Database
 Person.findOne({favoriteFoods: 'Felfoul'}, function (err, Person) {
    if (err){
        console.log(err);
    }
    else{
        console.log("person who loves Felfoul: ", Person);
    }
});   


 //Use model.findById() to Search Your Database By _id

 let id = "63e3828b371b09be05473ecc"
Person.findById({_id : id} , (err , Person)=>{
    if (err){
        console.log(err);
    }
    else{
        console.log("Result : ", Person);
    }
});  
 
  //Perform Classic Updates by Running Find, Edit, then Save
 let i = "63e3828b371b09be05473ecc"
const foodToAdd = "hamburger";

Person.findById({_id : i}, (err, Person) => {
    Person.favoriteFoods.push(foodToAdd);
    Person.save();
    if (err){
        console.log(err);
    }
    else{
        console.log("Updatebyfind,edit then save: ", Person);
    }
    
});    
  
  
  
    
    //Perform New Updates on a Document Using model.findOneAndUpdate()
    
        Person.findOneAndUpdate(
           {name: 'Manel'},
           {$set: {"age":10}},
           {new : true},
           function(err,Person){
             if(err){
               console.log("Error Ocurred")
             }
             console.log( "updated person is:",Person)
           }    
      );
      
      //Delete One Document Using model.findByIdAndRemove
     idd= "63e3828b371b09be05473ecc"
       Person.findByIdAndRemove({_id : idd}, 
          function(err,Person){
               if(err){
             console.log("Error Ocurred")
               }
               console.log( "removed person is:",Person)
             }    
       );  
    //    //MongoDB and Mongoose - Delete Many Documents with model.remove()
       Person.deleteMany({ name: 'Aroua' }, (err, Person) =>
        err ? console.log(err):console.log("removed person") 
        ); 
         
    //   //Chain Search Query Helpers to Narrow Search Results
       Person.find({favoriteFoods:'ojja'})
       .sort({name : 1})
       .limit(2)
       .select("-age")
       .exec((err, Person) => {
          if(err)
          console.log(error)
         else
         console.log("done",Person)

        })
    
 


 


const PORT = process.env.PORT || 7000;
app.listen(PORT, err=> err? console.log(err) : console.log(`Server is running on ${PORT}...`))