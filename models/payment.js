const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
        order_id: { type: String, required: false },
        price: { type: Int, required: false},
        status: { type: String, required: false},
        create_date : { type: Date, default : Date.now },
        deleted: { type: String, required: false},
})

module.exports = mongoose.model('payment',paymentSchema)