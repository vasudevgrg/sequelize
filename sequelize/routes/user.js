
const express= require("express");
const {login, Signup}= require("../controllers/user");
const router= express.Router();

router.post("/signup",Signup);
router.post("/login",login);

module.exports= router;