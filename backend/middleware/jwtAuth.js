const jwt = require('jsonwebtoken');
require('dotenv').config();

function isAuthorized(req, res, next) {
    // Extract token from the Authorization header (if using localStorage) or from cookies
    const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    try {
        // verify the JSWT token attach the user information to the request object
        const payload = jwt.verify(token, process.env.JWT_SECRET); // return the payload that we used at the time of creation
        req.user = payload;
        next();
    }
    catch (error) {
        console.log(error);
        res.redirect('/login'); // user is not authenticated redirect to login page
    }
}

module.exports = { isAuthorized };