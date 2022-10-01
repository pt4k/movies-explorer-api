const router = require('express').Router();
const { valedateUserData } = require('../middlewares/validatons');

const { getUserMe, patchUser } = require('../controllers/users');

router.get('/users/me', getUserMe);
router.patch('/users/me', valedateUserData, patchUser);

module.exports = router;
