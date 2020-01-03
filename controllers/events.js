const models = require('../models')
const events = models.events
const categories = models.categories
const users = models.users
const { Op } = require('sequelize')
const moment = require('moment')


exports.index = (req, res) => {
    events.findAll({
        include: [
            {
                model: categories,
                as: "category",
                attributes: ['id', 'name']
            },
            {
                model: users,
                as: "CreatedBy",
                attributes: ['id', 'username', 'fullname', 'phone']
            }
        ]
    }).then(data => {
        const randomData = shuffleArray(data)
        res.send(randomData)
    }).catch(err => res.send(err))
}

exports.show = (req, res) => {
    events.findOne({
        where: { id: req.params.id },
        include: [
            {
                model: categories,
                as: "category",
                attributes: ['id', 'name']
            },
            {
                model: users,
                as: "CreatedBy",
                attributes: ['id', 'email', 'fullname', 'phone','avatar']
            }
        ]
    }).then(data => {
        const randomData = shuffleArray(data)
        res.send(randomData)
    }).catch(err => res.send(err))
}

exports.indexToday = (req, res) => {
    var dateStart = new Date(req.params.start_time)
    var dateEnd = new Date(req.params.start_time)
    dateEnd.setDate(dateEnd.getDate() + 1)
    events.findAll({
        where:
        {
            startTime: { [Op.between]: [dateStart, dateEnd] }
        },
        include: [
            {
                model: categories,
                as: "category",
                attributes: ['id', 'name']
            },
            {
                model: users,
                as: "CreatedBy",
                attributes: ['id', 'username', 'fullname', 'phone']
            }
        ],
    }).then(data => {
        res.send(data)
    }).catch(err => res.send(err))
}

exports.indexSearch = (req, res) => {
    events.findAll({
        where:
        {
            title: { [Op.like]: `%${req.params.title}%`}
        },
        include: [
            {
                model: categories,
                as: "category",
                attributes: ['id', 'name']
            },
            {
                model: users,
                as: "CreatedBy",
                attributes: ['id', 'username', 'fullname', 'phone']
            }
        ],
        limit: 5,
    }).then(data => {
        res.send(data)
    }).catch(err => res.send(err))
}

// exports.indexTomorrow = (req, res) => {
//     var dateStart = new Date(req.params.start_time)
//     dateStart.setDate(dateStart.getDate() + 1)
//     var dateEnd = new Date(req.params.start_time)
//     dateEnd.setDate(dateEnd.getDate() + 2)
//     events.findAll({
//         where:
//         {
//             categoryId: req.params.id,
//             startTime: { [Op.between]: [dateStart, dateEnd] }
//         },
//         include: [
//             {
//                 model: categories,
//                 as: "category",
//                 attributes: ['id', 'name']
//             },
//             {
//                 model: users,
//                 as: "CreatedBy",
//                 attributes: ['id', 'username', 'fullname', 'phone']
//             }
//         ],
//     }).then(data => {
//         res.send(data)
//     }).catch(err => res.send(err))
// }

exports.create = (req, res) => {
    events.create(req.body).then(data => res.send(data)).catch(err => { res.send(err) })
}

exports.perCategory = (req, res) => {
    categories.findOne({
        attributes: ['id', 'name'],
        where:
        {
            id: req.params.id,
        },
        include: [
            {
                model: events,
                as: "events",
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                include: [
                    {
                        model: users,
                        as: "CreatedBy",
                        attributes: ['id', 'email', 'fullname', 'phone', 'avatar']
                    }
                ]
            },
        ],
    }).then(data => {
        const randomData = shuffleArray(data)
        res.send(randomData)
    }).catch(err => res.send(err))
}

// exports.delete = (req, res) => {
//     Article.destroy({ where: { id: req.params.id } }).then(() => {
//         console.log("Menghapus Data berhasil")
//         res.send("Menghapus Data Berhasil")
//     }).catch(err => {
//         res.send(err)
//     })
// }


function shuffleArray(array) {
    let i = array.length - 1;
    for (; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}
