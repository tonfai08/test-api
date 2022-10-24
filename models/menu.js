const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const menuSchema = new Schema({
        name: { type: String, required: false },
        shop_id: { type: String, required: false },
        price: { type: String, required: false },
        cat: { type: String, required: false },
        create_date : { type: Date, default : Date.now },
        deleted: { type: String, required: false},
})

module.exports = mongoose.model('menu',menuSchema)