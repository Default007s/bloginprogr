const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

const auth = require('./routes/auth')
const essays = require('./routes/essays')
const secret = 'ksdfj9823ur198ejfiqpjfuqewgewbnrbqwh123'

mongoose.connect('mongodb+srv://newUser:newUser1234@shershahone.voruf6y.mongodb.net/?retryWrites=true&w=majority&appName=ShershahOne')

app.use(cors({credentials: true, origin: 'http://localhost:3000'}))
app.use(express.json())
app.use(cookieParser())
app.use('/uploads', express.static(`${__dirname}/uploads`))
app.use('/', auth)
app.use('/', essays)



app.get('/profile', (req, res) => {
    const {token} = req.cookies;
    if(token){
        jwt.verify(token, secret, {}, (err, info)=>{
            if(err) throw err
            res.json(info)
        })
    } else{
        res.status(422).json('Not Logged in')
    }
})

app.get('/checkUser', (req, res) => {
    const {token} = req.cookies;
    if(token){
        jwt.verify(token, secret, {}, async (err, info) => {
            if(info.super){
                res.status(200).json("Good to Go")
            } else{
                res.status(422).json('Breach')
            }
        })
    } else{
        res.status(400)
    }
})

app.listen(4000)