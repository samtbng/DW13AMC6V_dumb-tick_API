//instatiate express module
const express = require('express')

//instatiate body-parser
const bodyParser = require('body-parser')

//instatiate express group
require('express-group-routes')

const { authenticated } = require('./middleware')
const categories = require('./controllers/categories')
const auth = require('./controllers/auth')
const users = require('./controllers/users')
const events = require('./controllers/events')
const orders = require('./controllers/orders')
const likes = require('./controllers/likes')


//use express in app variable
const app = express()

//define the server port
const port = process.env.PORT || 5000

//allow this app to receive incoming json request
app.use(bodyParser.json())

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");

    next();
});

app.group("/api/v1", (router) => {

    router.post('/login', auth.login) //create new token by entering email and password
    router.post('/registration', users.registration) //create new token by entering email and password
    router.get('/users', users.index) //show all users
    router.get('/users/:id/detail', users.showDetail) //show users detail
    router.get('/user/:id', users.showOne) //show user login
    router.put('/user/:id', users.update) //update user profile


    router.get('/categories', categories.index) //show all categories
    router.post('/category', categories.create) //create new category
    router.get('/category/:id', categories.perCategory) //show all events per category


    router.get('/events', events.index) //show all events
    router.post('/event', events.create) //create new event
    router.get('/events/:title/search', events.indexSearch) //create new event
    router.get('/event/:id', events.show) //show detail event
    router.put('/event/:id', events.update) //edit event
    router.get('/category/:id/events', events.perCategory) //show all events
    router.get('/events/:start_time', events.indexToday) //show all events
    // router.get('/events/:start_time', events.indexTomorrow) //show all events


    router.get('/orders', orders.index) //show all orders
    router.post('/order', authenticated, orders.create) //create new order
    router.put('/order/:id/approved', authenticated, orders.approving) //approve order
    router.get('/user/:id/orders/pending', orders.pending) //show pending orders
    router.get('/user/:id/orders/approved', orders.approved) //show pending orders
    router.put('/order/:id', authenticated, orders.confirmed) //confirmed order
    

    router.get('/likes_all', likes.index) //show all likes
    router.post('/liked', likes.liked) // show liked from event and user
    router.post('/likes', likes.create) //likes events
    router.delete('/likes/:id', likes.destroy) // delete field
    router.get('/users/:id/likes', likes.show) //show events that user liked

})

app.get('/', (req, res) => {
    //res means respone, and it send string to the API
    res.send('Dumb-tick API Samuel Tobing')
})

app.listen(port, () => console.log(`listening on port ${port}!`))