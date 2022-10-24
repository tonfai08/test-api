const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shopDishSchema = new Schema({
        shop_id: { type: String, required: false },
        id_type : { type: String, required: false },
        price : { type: String, required: false },
        create_date : { type: Date, default : Date.now },
        deleted: { type: String, required: false},
})

module.exports = mongoose.model('shopDish',shopDishSchema)