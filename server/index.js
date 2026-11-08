require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { findByEmail } = require('./users');

// Email Pattern
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const app = express();
const PORT = process.env. PORT || 3000;

app.use(cors({ origin: process.env. CLIENT_ORIGIN}));
app.use(express.json());

app.get('/api/v1/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.post('/api/v1/sessions', (req, res)=>{
    const { email, password} = req.body || {};

    const emailOk = typeof email === 'string' && EMAIL_PATTERN.test(email.trim());
    const passwordOk = typeof password === 'string' && password.length > 0;

    if(!emailOk || !passwordOk){
        return res.status(400).json({error: 'Email and password are required.'});
    }

    const user = findByEmail(email.trim());

    if(!user || !bcrypt.compareSync(password, user.passwordHash)) {
        return res.status(401).json({error: 'Invalid email or password.'});
    }

    const token = jwt.sign (
        {sub: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    return res.status(200).json({
        token,
        user: {id: user.id, name: user.name, email: user.email },
    })
})


app.listen(PORT,() =>{
    console.log('API running on http://localhost:' + PORT);
});
