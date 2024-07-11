const mongoose = require('mongoose');
const {Schema, model} = mongoose

const EssaySchema = new Schema({
    title: String,
    summary: String,
    content: String,
    cover: String,
    tags: String,
    author: {type:Schema.Types.ObjectId, ref:'User'},
}, {
    timestamps: true,
})

const EssaytModel = model('Essay', EssaySchema)
module.exports = EssaytModel