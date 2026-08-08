const express = require("express");
const {handleGetAllUsers,handleGetUserById, handleUpadateUserById, handleDeleteUserById, handleCreateNewUser, handleAllPut} = require('../controllers/user')
const router = express.Router();

//REST API
router.route('/').get(handleGetAllUsers).post(handleCreateNewUser)

router.route('/:id')
.get(handleGetUserById)
.put(handleAllPut)
.patch(handleUpadateUserById)
.delete(handleDeleteUserById)

module.exports= router;