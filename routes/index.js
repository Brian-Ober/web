const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contacts');

const nameController = require('../controllers/nameController')

// homefile
router.get('/', nameController.getName);

router.get('/contacts', contactController.getAll);

router.get('/contacts/:id', contactController.getSingle);

router.post('/contacts', contactController.newPost);

router.put('/contacts/:id', contactController.updatePost);

router.delete('/contacts/:id', contactController.clearPost);

module.exports = router;