

const express = require("express");
const { ExistingUser } = require("../Middlewares/authMiddleware");
const { addphoneBook, getphoneBook, deletephoneBook } = require("../Controlller/phonebook.controller");
const rounter = express.Router();


 const postphonebook = rounter.post("/add-phonebook" , ExistingUser, addphoneBook );
 const getphonebook = rounter.get("/get-phonebooks" ,ExistingUser , getphoneBook);
 const deletephonebook = rounter.delete("/delete-phonebooks/:id" ,ExistingUser , deletephoneBook);

module.exports = {postphonebook ,getphonebook ,deletephonebook};