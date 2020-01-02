const models = require('../models')
const category = models.categories
const events = models.events

exports.index = (req, res) => {
    category.findAll({ attributes: ['id', 'name','image'] })
        .then(data => {
            res.send(data)
        }).catch(err => res.send(err))
}

exports.perCategory = (req, res) => {
    category.findOne({
        attributes: ['id', 'name'],
        where: { id: req.params.id },
        include: [{
            model: events, as: 'events',
            attributes: ['id', 'title', 'price', 'address']
        }]
    }).then(data => res.send(data)).catch(err => res.send(err))
}


exports.create = (req, res) => {
    category.create(req.body).then(data => { res.send(data) }).catch(err => { res.send(err) })
}


// const key = Object.keys(data).filter(item => {
//     if(item !== 'createdAt' || item !== 'updatedAt'){
//         return item
//     }
// })

// const result = key.map(prop => {
//     return data[prop]
// })