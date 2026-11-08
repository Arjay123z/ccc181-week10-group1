const bcrypt = require('bcryptjs');

const user = [
    {
        id: 1,
        name: 'Demo Student',
        email: 'student@campusconnect.test',
        passwordHash: bcrypt.hashSync('Campus26', 10),
    },
];

function findByEmail(email) {
    return user.find((user) => user.email == email.toLowerCase());
}

module.exports = {user, findByEmail}

function findById(id) {
    return user.find((u) => String(u.id) === String(id));
}

module.exports = { user, findByEmail, findById };