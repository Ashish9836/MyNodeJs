// const sum=(a,b)=>a+b;
// console.log(module);
// module.exports.sum = sum;

// see above generally we are exporting as object which named as exports which will contain properties as sum
// suppose we want to export only one function 
// then write simply 
// module.exports = sum 

const Event_class = require('events')

class Module1 extends Event_class{
    log_message(message){
    let m = `${message} is sent from module1`;
    console.log(m);
    this.emit("testing event",{name:"ashish","data_important":"just called for fun"})
    }
    
} 
module.exports = Module1;