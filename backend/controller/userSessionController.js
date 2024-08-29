const fs = require('fs').promises;
const path = require('path');
const { json } = require('body-parser');
const { v4: uuidv4 } = require('uuid'); // Import uuid
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userFilePath = path.join(__dirname, '../data/users.json');
require('dotenv').config();
const secret = process.env.JWT_SECRET;
// const isAuthorized = require('../middleware/jwtAuth.js');

function generateToken(userData) {
    // generate a new JWT  token using user data
    return jwt.sign(userData, secret, { expiresIn: '1h' });
}

async function readUsers() {
    const data = await fs.readFile(userFilePath, 'utf8');
    return JSON.parse(data);
}


async function writeUsers(users) {
    await fs.writeFile(userFilePath, JSON.stringify(users), 'utf8');
}


// signUp
exports.signUpUser = async (req, res) => {
    const { username, password, email } = req.body;

    try {
        let users = await readUsers();

        if (users.find(user => (user.username === username || user.email === email))) {
            return res.status(400).send('User already exists');
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = {
            id: uuidv4(),
            username,
            password: hashedPassword,
            email,
            tasks: []
        }

        users.push(newUser);
        await writeUsers(users); // Make sure to await this operation
        res.redirect('/login');

    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};


// login
exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        let users = await readUsers();

        let user = users.find(user => user.username === username);
        if (!user || !bcrypt.compareSync(password, user.password))
            return res.status(401).send('Invalid Credentials');

        const token = generateToken({ id: user.id });
        res.cookie('token', token, { httpOnly: true });
        res.cookie('isLoggedIn', 'true', { httpOnly: false }); // Set isLoggedIn as a cookie
        res.redirect('/');
    } catch (err) {
        console.error(err);
        return res.status(500).send('Server error');
    }
};


exports.logOut = (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
};
