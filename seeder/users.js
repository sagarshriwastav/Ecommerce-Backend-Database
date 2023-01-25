const bcrypt = require("bcryptjs")

const users = [
    {
        name: 'admin',
        lastName: 'admin',
        email: 'admin@admin.com',
        password: bcrypt.hashSync('admin@admin.com', 10),
        isAdmin: true,
    },
    {
        name: 'John',
        lastName: 'Doe',
        email: 'John@doe.com',
        password: bcrypt.hashSync('John@doe.com', 10),
        isAdmin: true,

    }
]

module.exports = users