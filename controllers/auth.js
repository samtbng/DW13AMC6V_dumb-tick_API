const jwt = require('jsonwebtoken')
const models = require("../models")
const User = models.users
exports.login = (req, res) => {
    const email = req.body.email
    const password = req.body.password
    User.findOne({ where: { email, password } }).then(user => {
        if (user) {
            const id = user.id
            const token = jwt.sign({ userJwt: id }, 'dumbways')
            res.send({ id, token, login: true })
        } else {
            res.send({ login: false, error: true, message: "Wrong email or password!" })
        }
    }).catch(err => res.send(err))
}