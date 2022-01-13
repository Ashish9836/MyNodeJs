const express = require("express");
const app = express();
const router =  require("./express_practice_2");

console.log(router);
// using imported routes from express_practice_2.js
app.use("/express",router);
app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})

console.log("Express is running on port 3000");