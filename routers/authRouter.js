const express = require("express");
const signup = require("../controllers/authControllers/signup");
const login = require("../controllers/authControllers/login");
const logout = require("../controllers/authControllers/logout");

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);
router.get("/logout", logout);
module.exports = router;
