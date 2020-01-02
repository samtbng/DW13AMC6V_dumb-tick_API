const isLoggedIn = true
const jwt = require('express-jwt')

exports.authenticated = jwt({ secret: 'dumbways' })