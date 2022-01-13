const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/playground")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

// const HeroSchema = new mongoose.Schema({
//   name: String,
//   body: String,
//   date: { type: Date, default: Date.now },
// });

// as we can see there is no required condition so see below for correction
// const HeroSchema = new mongoose.Schema({
//   name: {type:String, required:true},
//   body: String,
//   date: { type: Date, default: Date.now },
// });

// updated schemas with function

const HeroSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    // enum tells only the values that are allowed in the field
    minlength: 3,
    maxlength: 20,
  },

  gender: {
    type: String,
    required: true,
    enum: ["male", "female", "other"],
  },
  age: {
    type: Number,
    validate: {
      // for asyncness we can use callback function
      validator: function (value) {
        return value >= 18;
      },
      message: "Hey hero cannot be less than 18",
    },
  },
  female_qota_Num: {
    type: Number,
    required: function () {
      if (this.gender === "female") {
        return true;
      }
      return false;
    },
  },
  body: String,
  date: { type: Date, default: Date.now },
});

const Hero = mongoose.model("Hero", HeroSchema);

// female_qota_Num,  removed for testing purpose
async function CreateHero(name, gender,age, female_qota_Num, body) {
  const hero = new Hero({
    name,
    gender,
    age,
    female_qota_Num,
    body,
  });
  const result = await hero.save();
  console.log(result);
}
// CreateHero("LockMan","male",21,"I am LockMan...");

// async function CreateHero(name, body) {
//   const hero = new Hero({
//     name,
//     body,
//   });
//   const result = await hero.save();
//   console.log(result);
// }

// CreateHero("Carl Kally", "Fire's strength");
// CreateHero("Carl Parker", "Full strength");
// CreateHero("Carl Smith", "Life Hacker");
// CreateHero("Carl Gomez", "Pro Thinker");
// CreateHero("Carl jackson", "Pro Thinker");

// CreateHero("Charlie", "Fire","Just Human");
// CreateHero("Queen Parker", "Just Human");
// CreateHero("Ramu Smith", "Just Human");
// CreateHero("Sonu Gomez", "Just Human");
// CreateHero("Monu jackson", "Just Human");

// now getting data using GetHero function

async function GetHero() {
  const Heroes = await Hero.find({ name: "IronMan" })
    .sort({ name: 1 })
    .select({ body: 1 })
    .limit(1);
  console.log(Heroes);
}

// GetHero();

// comparision operators in mongoose  => 1-> lt = less than 2-> lte = less than equal to 3-> gt = greater than 4-> gte = greater than equal to 5-> ne = not equal to 6-> in = in array 7-> nin = not in array

// logical operators in mongoose is => 1-> or 2-> and 3-> nor 4-> nor

async function newGetHero() {
  //   const heroes = await Hero.find().or([{ name: "Superman" }, { name: "IronMan" }]);

  const heroes = await Hero.find()
    .or([{ name: "Superman" }, { name: "IronMan" }])
    .count();
  console.log(heroes);
}

// newGetHero();

// mongoose schemas may have String, Number, Boolean, Date, Buffer, ObjectID, Array

async function Pagination() {
  // this is for pagination ...like user request for page num 3 but we have applied a condition to show only 4 items per page....
  // skip() will ignore previous pages itmes and limit() will show only 4 items per page
  const page_size = 4;
  const page_number = 3;
  const heroes = await Hero.find()
    .skip((page_number - 1) * page_size)
    .select({ name: 1, body: 1 })
    .limit(page_size);

  console.log(heroes);
}

// Pagination();

// updation in mongoose

async function Updation(id) {
  var course = await Hero.findById(id);
  console.log(" found hero ", course);

  if (!course) {
    console.log("No course found with the given id");
    return;
  }
  course.name = "Updated_Name_Hero_1";
  const request_to_update = await course.save();
  console.log("Hey updated", request_to_update);
}

// Updation("61de8898988bbce2155474c7");

// for deleltion
// -> deleteOne
// -> deleteMany
// -> findByIdAndRemove

// just testing to create hero without name
// async function CreateHero(body) {
//   const hero = new Hero({
//     body,
//   });
//   try{
//   const result = await hero.save();
//   console.log(result);
//   }
//   catch(err){
//     console.error("Hey without name we cannot make hero");
//   }
// }
// CreateHero("unamed hero");

// mongodb also provides object.validate()  => it is void promise does not return anything
// try{
//   object.validate();
// }
// catch{
//   console.log("Problem found");
// }

// also expolores schemas operators like
// get: will return the value of the field (for reading)
// set: will set the value of the field (for setting)
// required:
// minlength:
// maxlength:
// enum:
// validate:
// default:
// unique:
// index:
// sparse:
// trim:
// lowercase:
// uppercase:

