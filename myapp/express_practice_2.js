const express = require("express");
const router = express.Router();
router.get("/",(req,res)=>{
    res.send("Hey have you called express home");
})
router.get("/contact",(req,res)=>{
    res.send("Hey have you called express contact");
})


router.get("/account",(req,res)=>{
    res.send("Hey have you called express account");
})


module.exports = router;