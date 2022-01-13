//  welcome to customer api
// create customer
// get customer
// isGold, name, phone

// using authmiddleware
const auth = require("./authMiddleware");



const config = require("config")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const _ = require("lodash");
// do more research on lodash it is very important
// console.log(config.get("jwtPrivateKey"));
const express = require("express");
const app = express();
// console.log(config.get("jwtPrivateKey").length);
// mongoose for mongodb
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/customers")
  .then(() => {
    console.log("Connected to MongoDB successfully");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

const CustomerSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 5,
    maxlength: 20,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    minlength: 10,
    maxlength: 200,
    trim: true,
    required: true,
  },
  isGold: {
    type: Boolean,
    required: true,
  },
  password: {
    type: String,
    minlength: 5,
    maxlength: 200,
    trim: true,
    required: true,
  },
});

const Customer = mongoose.model("Customer", CustomerSchema);

// parsing json
app.use(express.json());

const login_validator = (email, password) => {
  let em = email.trim();
  let pass = password.trim();
  if (em.length < 10 || em.length > 200) {
    return { error: "invalid email found" };
  }
  if (pass.length < 5 || pass.length > 200) {
    return { error: "invalid password found" };
  }
  let done = false;
  for (let i = 0; i < email.length; i++) {
    if (email[i] === "@") {
      done = true;
    }
  }

  if (!done) {
    return { error: "invalid email found" };
  }

  return { error: "" };
};

const signup_validator = (email, password, name) => {
  let em = email.trim();
  let pass = password.trim();
  name = name.trim();
  let { error } = login_validator(em, pass);
  if (error) {
    return { error: "Invalid email/password found" };
  }
  if (name.length > 20 || name.length < 5) {
    return { error: "too short name found!" };
  }
  return { error: "" };
};

// home
app.get("/", (req, res) => {
  return res.send("Welcome to customerAPI.com");
});

app.post("/login", async (req, res) => {
  let { email, password } = req.body;
  let { error } = login_validator(email, password);

  if (error) {
    return res.status(400).send(error);
  }

  try {
    const user = await Customer.findOne({ email });
    if (!user) {
      return res.status(404).send("Email not registered!");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).send("Invalid password");
    } else {
      const token = jwt.sign({ _id: user._id }, config.get("jwtPrivateKey"));
      return res.status(200).send({ token });
    }
  } catch (err) {
    return res.status(400).send(err);
  }
});

// signup
app.post("/signup", async (req, res) => {
  let { email, password, name, isGold } = req.body;

  let { error } = signup_validator(email, password, name);

  try {
    const user = await Customer.findOne({ email });
    if (user) {
      return res.status(404).send("email already registered!");
    }
  } catch (err) {
    return res.status(400).send(err);
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const obj = new Customer({ name, email, password: hash, isGold });
  try {
    const waiting = await obj.save();
    console.log("user created!");
    // sending token through header
    const token = jwt.sign({ _id: waiting._id }, config.get("jwtPrivateKey"));
    console.log("token created!",token);
    return res.status(200).header("x-auth-token",token).send(waiting);
  } catch (err) {
    console.log("user not created!");
    return res.status(400).send(err);
  }
});


app.get("/greet",auth,(req,res)=>{
  return res.send("welcome to customer greet api");
})

app.listen(8000, () => {
  console.log("server is running on port 8000");
});

console.log("-----happy coding!---");
