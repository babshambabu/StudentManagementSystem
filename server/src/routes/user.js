const express = require('express');
const { addUser, getUsers ,Login,DeleteUser} = require('../controllers/userController');
const verifyRole = require('../middleware/verifyRole');
const router = express.Router();

router.post('/login',Login)  

router.post('/addUser',verifyRole(['admin']), addUser);
router.get('/',verifyRole(['admin']), getUsers);
router.delete('/:id',verifyRole(['admin']),DeleteUser) 


module.exports = router;
