// here i am using express for server
// importing express

// for input validation i am using joi
const Joi = require("joi");

// installing morgan npm package see on google for more 
const morgan = require("morgan");
const express = require("express");
const app = express();

// for parsing json
app.use(express.json());

// express.urlencoded() is used to parse the body of the request into a JavaScript object.

// using morgan 
app.use(morgan("tiny"));





// for setting environment as development 
// write in commandline 
// export NODE_ENV=development
// or
// export NODE_ENV=production for production

// to know your environment
// console.log(process.env.NODE_ENV);
//or app.get("env")



// setting template engine in node
// app.set("view engine", "pug");
// app.set("views", "./views");




// app.use(express.urlencoded({extended:true}));

// for using static files
app.use(express.static("public"));

 
const heroes = [
  { id: 1, name: "JohnCena" },
  { id: 2, name: "PeterParker" },
  { id: 3, name: "IronMan" },
  { id: 4, name: "Hulk" },
  { id: 5, name: "Thor" },
];

const port = process.env.PORT || 3000;


// just using custom middleware

app.use((req,res,next)=>{
  console.log("first middleware is running");
  next();
})


// if we neglect any next() then it will not run the next middleware and it will not run the next route
app.use((req,res,next)=>{
  console.log("second middleware is running");
  next();
})


app.use((req,res,next)=>{
  console.log("third middleware is running");
  next();
})



app.get("/", (req, res) => {
  res.send("Hello express has responded");
});

// passing parameter to express server
app.get("/sum/:a/:b", (req, res) => {
  let a = parseInt(req.params.a);
  let b = parseInt(req.params.b);
  let sum = a + b;
  res.send(`<h1>${sum}</h1>`);
});

// getting super heroes by id
app.get("/heroes/:id", (req, res) => {
  const hero = heroes.find((hero) => hero.id === parseInt(req.params.id));
  if (!hero) {
    res.status(404).send("Requested hero! not found");
  } else {
    res.status(200).send(hero);
  }
});



app.get("/heroes",(req,res)=>{
  res.send(heroes);
})

// post request

app.post("/heroes", (req, res) => {
  // using joi package for input validation
  const hero = Joi.object({
    name: Joi.string().min(3).max(20).required(),
  });
  const { error, value } = hero.validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
  } else {
    const hero = {
      id: heroes.length + 1,
      name: req.body.name,
    };
    heroes.push(hero);
    res.send(hero);
  }
});

app.delete("/heroes/:id",(req,res)=>{
    const heroes_to_be_deleted = heroes.find(c=>c.id===parseInt(req.params.id));

    if(!heroes_to_be_deleted){
        res.status(404).send("Requested heroes not found");

    }
    else{
       const index = heroes.indexOf(heroes_to_be_deleted);
       heroes.splice(index,1);
       res.send(course);
    }
})

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});





