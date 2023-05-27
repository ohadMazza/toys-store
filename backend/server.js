const express = require('express')
const app = express()
const toyService = require('./services/toy.service')
const cookieParser = require('cookie-parser')
const path = require('path')
const cors = require('cors')


// App Configuration
const corsOptions = {
    origin: [
        'http://127.0.0.1:8080',
        'http://localhost:8080',
        'http://127.0.0.1:3000',
        'http://localhost:3000'
    ],
    credentials: true
}
app.use(cors(corsOptions))
app.use(express.static('public'))
app.use(cookieParser()) // for res.cookies
app.use(express.json()) // for req.body



// **************** toys API ****************:
// List
app.get('/api/toy', (req, res) => {
    const { name, maxPrice, inStock, labels } = req.query
    const filterBy = { name, maxPrice: +maxPrice, inStock, labels }
    toyService.query(filterBy)
        .then(toys => {
            res.send(toys)
        })
        .catch(err => {
            console.log('Cannot load toys')
            res.status(400).send('Cannot load toys')
        })
})

// Add
app.post('/api/toy', (req, res) => {
    const { name, inStock, price, labels } = req.body
    const toy = {
        name,
        price: +price,
        labels
    }
    toyService.save(toy)
        .then((savedToy) => {
            res.send(savedToy)
        })
        .catch(err => {
            console.log('Cannot add toy')
            res.status(400).send('Cannot add toy')
        })

})

// Edit
app.put('/api/toy', (req, res) => {

    const { name, price, _id, inStock, labels } = req.body
    const toy = {
        _id,
        name,
        price: +price,
        labels
    }
    toyService.save(toy)
        .then((savedToy) => {
            res.send(savedToy)
        })
        .catch(err => {
            console.log('Cannot update toy')
            res.status(400).send('Cannot update toy')
        })

})

// Read - getById
app.get('/api/toy/:toyId', (req, res) => {
    const { toyId } = req.params
    toyService.get(toyId)
        .then(toy => res.send(toy))
        .catch(err => res.status(403).send(err))
})

// Remove
app.delete('/api/toy/:toyId', (req, res) => {

    const { toyId } = req.params
    toyService.remove(toyId)
        .then(msg => {
            res.send({ msg, toyId })
        })
        .catch(err => {
            console.log('err:', err)
            res.status(400).send('Cannot remove toy, ' + err)
        })
})




// Listen will always be the last line in our server!
app.listen(3030, () => console.log('Server listening on port 3030!'))