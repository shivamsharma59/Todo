const express = require('express');
const router = express.Router();
const userSessionController = require('../controller/userSessionController');
const fs = require('fs').promises;
const path = require('path');
const userFilePath = path.join(__dirname, '../data/users.json');
const { isAuthorized } = require('../middleware/jwtAuth.js');


async function findUser(userId) {
    const data = await fs.readFile(userFilePath, 'utf8');
    let users = JSON.parse(data);
    return users.find(user => user.id == userId);
}

router.get('/', isAuthorized, async (req, res) => {
    if (req.cookies.isLoggedIn) {
        const user = await findUser(req.user.id);
        res.render('toDo', { user: user });
    }
    else
        res.redirect('/signUp');
});

router.get('/signUp', (req, res) => {
    res.render('signUp');
});

router.post('/signUp', userSessionController.signUpUser);

router.get('/login', (req, res) => {
    if (req.cookies.isLoggedIn) {
        res.redirect('/');
    }
    else
        res.render('login');
});

router.post('/login', userSessionController.loginUser);

router.get('/logout', userSessionController.logOut);

module.exports = router;