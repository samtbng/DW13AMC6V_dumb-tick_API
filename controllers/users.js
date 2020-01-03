const models = require('../models')
const jwt = require('jsonwebtoken')
var Sequelize = require('sequelize')
const users = models.users
const events = models.events
const likes = models.likes



exports.index = (req, res) => {
    users.findAll({ attributes: { exclude: ['password'] } })
        .then(user => res.send(user)).catch(err => res.send(err))
}

exports.registration = (req, res) => {
    const id = generateUUID()
    const username = req.body.username
    const fullname = req.body.fullname
    const email = req.body.email
    const phone = req.body.phone
    const birthday = req.body.birthday
    const password = req.body.password
    const avatar = req.body.avatar
    users.create({
        id,
        username,
        fullname,
        email,
        phone,
        birthday,
        password,
        avatar
    }).then(user => {
        const id = user.id
        const token = jwt.sign({ userJwt: id }, 'dumbways')
        res.send({ msg: "success", id, token })
    }).catch(Sequelize.ValidationError, err=> {
        const msg= err.errors
        res.status(422).send(msg);
    }).catch(err => res.send(err))
}

exports.showOne = (req, res) => {
    users.findOne({
        attributes: ['id', 'username', 'email', 'fullname', 'avatar'],
        where: { id: req.params.id }
    })
        .then(user => res.send(user)).catch(err => res.send(err))
}

exports.showDetail = (req, res) => {
    users.findOne({
        attributes: {exclude:['password','createdAt','updatedAt']},
        where: { id: req.params.id },
        include: [
            {
                model: likes,
                as: 'likes',
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                include: [
                    {
                        model: events,
                        as: 'eventsLiked',
                        attributes: { exlclude: ['createdAt', 'updatedAt'] }
                    }
                ]
            }
        ]
    })
        .then(user => res.send(user)).catch(err => res.send(err))
}


exports.update = (req, res) => {
    users.update(req.body, { where: { id: req.params.id } })
        .then(data => res.send(data))
        .catch(err => { res.send(err) })
}


function generateUUID() { // Public Domain/MIT
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
}