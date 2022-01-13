const Module1_class = require('./module1');
const module1_obj = new Module1_class();

// setting event listener for object module1_obj -> see more in module1 class
module1_obj.on("testing event",(props)=>{console.log("--->",props)});
module1_obj.log_message("hello messenger");

// here you were thinking how i called events without using events class for that see in module1.js