const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shopSchema = new Schema({
        shop_name: { type: String, required: false },
        create_date : { type: Date, default : Date.now },
        deleted: { type: String, required: false},
})

module.exports = mongoose.model('shop',shopSchema)