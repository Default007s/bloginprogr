const express = require('express');
const router = express.Router()
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

const salt = bcrypt.genSaltSync(10)
const secret = 'ksdfj9823ur198ejfiqpjfuqewgewbnrbqwh123'

router.post('/register', async (req, res)=>{
    const {name, email, password} = req.body;
    const superUser = email === 'shershah2' ? true : false
    const userCheck = await User.findOne({email})
    if(!email || !name || !password) {
        return res.status(422).json("Fill all fields");
    } else if(userCheck){
        res.status(409).json(userCheck)
    } else{
        try{
            const userDoc = await User.create({
                name,
                email,
                password: bcrypt.hashSync(password, salt),
                superUser: superUser
            });
                res.json(userDoc)
        }catch(err){
            res.status(400).json(err)
        }
    }
})

router.post('/login', async (req, res)=>{
    const {email, password} = req.body;
    if(!email || !password) {
        return res.status(422).json("Fill all fields");
    }else{
        const userDoc = await User.findOne({email});
        if(userDoc && bcrypt.compareSync(password, userDoc.password)){
            jwt.sign({name: userDoc.name, email: userDoc.email, super: userDoc.super, id: userDoc._id}, secret, {}, (err, token) => {
            if(err) throw err 
            res.cookie('token', token).json({
                id:userDoc._id,
                name: userDoc.name,
                email: userDoc.email,
                super: userDoc.super
            })
            })
        } else{
            res.status(400).json('Wrong Credentials')
        }
    }
})

router.post('/logout', (req, res) => {
    res.cookie('token', '').json('ok');
})

module.exports = router