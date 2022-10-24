const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodSchema = new Schema({
        dish_id: { type: String, required: false },
        shop_id: { type: String, required: false },
        price: { type: String, required: false },
        list: { type: [], required: false},//id menu
        create_date : { type: Date, default : Date.now },
        deleted: { type: String, required: false},
})

module.exports = mongoose.model('food',foodSchema)