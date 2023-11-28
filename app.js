const express = require('express')
const app = express()

const port = process.env.PORT || 5001

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.set('view engine', 'ejs')

const database = require('./database')
const { Login, Brick } = require('./model')

app.get('/', async (req, res) => {
    try {
        return res.status(200).render('index')
    } catch (error) {
        return res.status(500).json({ Error: error.message })
    }
})

app.get('/clients', async (req, res) => {
    try {

        const clients = await Brick.findAll({ order: [['id', 'ASC']]})

        return res.status(200).render('clients', { clients: clients })
        
    } catch (error) {
        return res.status(500).json({ Error: error.message })
    }
})

app.post('/clients', async (req, res) => {
    try {
        
        const { name, volume, b_time, e_time, phone } = req.body

        await Brick.create({
            name: name,
            volume: volume,
            b_time: b_time,
            e_time: e_time,
            phone: phone
        })

        return res.status(201).redirect('/clients')

    } catch (error) {
        return res.status(500).json({ Error: error.message })
    }
})

app.post('/login', async (req, res) => {
    try {

        const { email, password } = req.body

        const user = await Login.findAll({
            where: {
                email: email,
                password: password
            }
        })

        if (user[0].id) {
            return res.status(200).redirect('/clients')
        }

        return res.status(401).redirect('/')

    } catch (error) {
        return res.status(500).json({ Error: error.message })
    }
})

app.get('/delete/:id', async (req, res) => {
    try {
        
        const { id } = req.params

        await Brick.destroy({ where: { id: id }})


        return res.status(200).redirect('/clients')

    } catch (error) {
        return res.status(500).json({ Error: error.message })        
    }
})

app.listen(port, async (err) => {
    if (err) throw err
    await database.authenticate()
    await database.sync({ alter: true })
    console.log(`Server is running: http://localhost:${port}`);
})