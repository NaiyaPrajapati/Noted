var express = require('express')
var router = express.Router()
var noteController = require("../controllers/noteController");
const authMiddleware = require('../middlewares/authMiddleware')

router.post('/addnote',authMiddleware.authMiddleware,noteController.addNote)
router.put('/editnote/:id', authMiddleware.authMiddleware, noteController.editNote)
router.delete('/deletenote/:id', authMiddleware.authMiddleware, noteController.deleteNote)
router.get('/getallnotes', authMiddleware.authMiddleware, noteController.getallNotes)
router.get('/getnotesbytag/:tag', authMiddleware.authMiddleware, noteController.getNotesByTag)
router.get('/getnote/:id', authMiddleware.authMiddleware, noteController.getNote)
module.exports = router