const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contacts');

const nameController = require('../controllers/nameController')

// homefile
router.get('/', nameController.getName);

router.use('/contacts', contactController.getAll);


module.exports = router;