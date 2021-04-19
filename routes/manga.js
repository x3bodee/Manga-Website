// All my authentication routes will go here
const express = require('express');
const router = express.Router();
router.get("/signup", (req, res) => {
    
    res.render("auth/signup");
  });
  
  // HTTP POST - Mamga Route - To save the data
  router.post("/signup", (req, res) => {
  
  });
