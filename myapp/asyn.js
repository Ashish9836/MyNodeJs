// console.log("hello.....");
// f(1,(e)=>{console.log(e);});
// console.log("byeeeee");

// // try to understand that setTimeout is asynchronous function
// //  it will not block the execution of the rest of the code
// // so first "f called" will be printed and then "setTimeOut called"

// function f(a,callback) {
//     setTimeout(()=>{
//         console.log("setTimeOut called");
//         callback("setTimeOut just executed");
//     },0001);
//     console.log("f called");
// }

// promise in js

// const a = new Promise((resolve,reject)=>{
//     if(1){
//         resolve("promise resolved");
//     }
//     else{
//         reject(new Error("promise rejected"));
//     }
// })

// a.then(res=>{
//     console.log(res);
// }).catch(err=>{
//     console.log(err.message);
// })

// const func = new Promise((resolve, reject)=>{
//     setTimeout(()=>{
//     console.log("func is called");
//     resolve("Promise resolved");
//     },2000)
// })
// func.then((res)=>{
// console.log(res);
// }).catch((err)=>{
//     console.log(err.message);
// })

// const promise1 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     console.log("promise1 is done");
//     resolve(1);
//   }, 3000);
// });

// const promise2 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     console.log("promise2 is done");
//     resolve(2);
//   });
// });

// Promise.all([promise1, promise2])
//   .then((res) => {
//     console.log("Hey your all promises done....");
//   })
//   .catch((err) => {
//     console.log("Found either of two promises failed");
//   });


//   also check for promise.race if anyone is passed then overall passed but with this with promise.all

