const models = require('../models')
const orders = models.orders
const users = models.users
const events = models.events
const categories = models.categories

exports.index = (req, res) => {
    orders.findAll({
        include: [
            {
                model: users,
                as: "buyer",
                attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
            },
            {
                model: events,
                as: "event",
                attributes: ['title', 'startTime', 'endTime', 'address']
            }
        ]
    }).then(data => {
        res.send(data)
    }).catch(err => res.send(err))
}

exports.pending = (req, res) => {
    users.findOne({
        where: { id: req.params.id },
        attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
        include: [
            {
                model: orders,
                as: "orders",
                where: { status: "pending" },
                include: [
                    {
                        model: events,
                        as: "event",
                        attributes: { exclude: ['createdAt', 'updatedAt'] },
                        include: [
                            {
                                model: categories,
                                as: "category",
                                attributes: ['name','image']
                            }
                        ]
                    }
                ]
            }
        ]
    }).then(data => {
        if (data) {
            res.send({data, value:true})
        } else {
            res.send({ value: false })
        }
    }).catch(err => res.send(err))
}

exports.approved = (req, res) => {
    users.findOne({
        where: { id: req.params.id },
        attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
        include: [
            {
                model: orders,
                as: "orders",
                where: { status: "approved" },
                include: [
                    {
                        model: events,
                        as: "event",
                        attributes: { exclude: ['createdAt', 'updatedAt'] },
                        include: [
                            {
                                model: categories,
                                as: "category",
                                attributes: ['name','image']
                            }
                        ]
                    }
                ]
            }
        ]
    }).then(data => {
        if (data) {
            res.send({data, value:true})
        } else {
            res.send({ value: false })
        }
    }).catch(err => res.send(err))
}

exports.create = (req, res) => {
    orders.create(req.body)
        .then(data => res.send(data))
        .catch(err => { res.send(err) })
}

exports.confirmed = (req, res) => {
    orders.update(
        {
            status: 'confirmed',
            attachment: req.body.attachment
        },
        { where: { id: req.params.id } },
    ).then(data => res.send(data)).catch(err => { res.send(err) })
}

exports.approving = (req, res) => {
    orders.update(
        {
            status: 'approved'
        },
        { where: { id: req.params.id } },
    ).then(data => res.send(data)).catch(err => { res.send(err) })
}

exports.delete = (req, res) => {
    const userId = req.body.user_id
    const articleId = req.params.id
    comment.destroy({
        where: {
            user_id: userId,
            article_id: articleId
        }
    }).then(() => {
        console.log("Menghapus Data berhasil")
        res.send("Menghapus Data Berhasil")
    }).catch(err => {
        res.send(err)
    })
}
