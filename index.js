const mongoose= require('mongoose')
const person = require('./models/personSchema')



mongoose.connect("mongodb://localhost:27017/checkpoint",()=>
console.log("database is connected"));

/***********************Create_and_Save_a_Record_of_a_Model***********************************/
const p1= new person({name:"oussama",age:27,favoriteFoods:["burritos"]})
        p1.save((err,data)=>{
            if(err) throw err
            else console.log(data)
})
/*********************************************************************************************/



/***********************Create_Many_Records_with_model.create()*******************************/
const arrayOfPeople = [
{
    name:"Person X",
    age:34,
    favoriteFoods:["favFoodFour","favFoodFive"]
},
{
    name:"Person Y",
    age:43,
    favoriteFoods:["favFoodSix","favFoodSeven"]
},
{
    name:"Person Z",
    age:19,
    favoriteFoods:["favFoodEight","favFoodNine"]
}]

person.create(arrayOfPeople, (err,data) => {
    if(err) throw err
    else console.log(data)
})
/*********************************************************************************************/
 

/*********************Use_model.find()_to_Search_Your_Database********************************/
person.find().then(remainingPerson => {console.log("aaa" + remainingPerson)});
/*********************************************************************************************/


/********************************Use_model.findOne()******************************************/
person.findOne({ favoriteFoods: ["favFoodFour","favFoodFive"] }, function (err, person) {
    if(err) throw err
    else console.log("findOne" + person)
});
/*********************************************************************************************/

/******************************Use_model.findById()*******************************************/
person.findById('62c0e3a3609fd7c002cad05a', function (err, docs) {console.log("bbb" + docs)});
/*********************************************************************************************/

/**********************************model.findOneAndUpdate()***********************************/
person.findOneAndUpdate({"name":"oussama"},{$set:{age:"25"}})
.then(updatedPerson => {console.log("Updated Person: ",updatedPerson)});
/*********************************************************************************************/


/***********************************model.findByIdAndRemove()*********************************/
let id = "62c0e3a3609fd7c002cad05a"; //just exemple 
person.findByIdAndRemove(id, function (err, docs) {console.log("Removed Person :",docs)});
/*********************************************************************************************/

person.find({favoriteFoods:["burritos"]})                   // find all users who likes burritos
         .limit(2)                // limit to 10 items
         .sort({name: 1} )     // sort ascending by Name
         .select("-age") // select firstName only
         .exec((err, data) => { if(err) throw err
            else console.log(data) }) 
                          // execute the query