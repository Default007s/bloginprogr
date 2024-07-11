const express = require('express');
const router = express.Router()
const multer = require('multer')
const uploadMiddleware = multer({dest:'uploads/'})
const Essay = require('../models/Essay') 
const fs = require('fs')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const { log } = require('console');

const secret = 'ksdfj9823ur198ejfiqpjfuqewgewbnrbqwh123'

router.post('/create', uploadMiddleware.single('file'), async (req, res) => {
    const {originalname, path} = req.file
    const parts = originalname.split('.') 
    const ext = parts[parts.length - 1]
    const newPath = path + '.' + ext
    fs.renameSync(path, newPath)

    const {token} = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
        if(err) throw err
        if(info.super){
            const {title, summary, content, tags} = req.body
            const essayDoc = await Essay.create({
                title,
                summary,
                content,
                cover: newPath,
                tags,
                author: info.id
            })
            res.json(essayDoc)
        } else{
                res.json("You are not Authorized")
            }
        })
})

router.get('/getEssays', async (req, res) => {
    // res.json(Essay.find().filter(essay => essay.title.toLowerCase().includes(q)))
    res.json(await Essay.find().sort({createdAt: -1}).limit(20))
})

router.get('/essays/:id', async (req, res) => {
    const {id} = req.params
    const essayDoc = await Essay.findById(id)
    res.json(essayDoc)
})

router.put('/essay/edit', uploadMiddleware.single('file'), async (req, res) => {
    let newPath = null;
    if(req.file){
        const {originalname, path} = req.file
        const parts = originalname.split('.')
        const ext = parts[parts.length - 1]
        newPath = path+'.'+ext
        fs.renameSync(path, newPath)
    }

    const {token} = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
        if(err) throw err
        const {id, title, summary, content, tags} = req.body
        const essayDoc = await Essay.findById(id)
        const isAuthor = JSON.stringify(essayDoc.author) === JSON.stringify(info.id)
        if(!isAuthor) {
            res.status(400).json('You are not the author')
            throw 'You are not the author'
        }
        await essayDoc.updateOne({
            title,
            summary,
            content,
            tags,
            cover: newPath ? newPath : essayDoc.cover
        })
        res.json(essayDoc)
    })
})

router.delete('/essays/delete/:id', async (req, res) => {
    const {id} = req.params
    const {token} = req.cookies;
    
    jwt.verify(token, secret, {}, async (err, info) => {
        if(err) throw err
        const essayDoc = await Essay.findById(id)
        const isAuthor = JSON.stringify(essayDoc.author) === JSON.stringify(info.id)
        if(!isAuthor){
            res.status(400).json('You are not the author')
            throw 'You are not the author'
        }else{
            await essayDoc.deleteOne()
            .then(() => res.json('success'))
            .catch(err => res.json(err))
        }
    })
})

module.exports = router