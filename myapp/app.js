// console.log(window) not valid here since it is using node as runtime environmnet not a brower

// 1-> starting with modules in node
// inbuilt function in node are of global object
// but var, function(self defined) are not


// importing a module in node
var m1 = require('./module1');
// checking what we got from module
// console.log(m1); // => sum now callling that in next line
// console.log(m1.sum(2,3)) // => giving  5