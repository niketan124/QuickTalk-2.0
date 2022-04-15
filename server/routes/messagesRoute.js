const { addMsg, getAllMsg } = require('../controllers/messagesController.js')
const router = require('express').Router();

router.post("/addmsg", addMsg);
router.post("/getmsg", getAllMsg);


module.exports = router