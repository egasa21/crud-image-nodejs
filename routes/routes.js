const router = require('express').Router();
const userController = require('../controllers/user.controller');
const upload = require('../middleware/upload.middleware')

router.get('/', userController.viewUser);
router.get('/add', (req, res)=>{
    res.render('add_user', {title: 'Add User'})
})
router.get('/edit/:id', userController.getEditUser);
router.post('/add', upload, userController.addUser );
router.post('/update/:id', upload, userController.editUser)
router.get('/delete/:id', userController.deleteUser);

module.exports = router;