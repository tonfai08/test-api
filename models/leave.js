const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const leaveSchema = new Schema({
        empId: { type: String, required: false },
        leave_type: { type: String, required: false},
        date_leave: { type: [], required: false},
        duration: { type: String, required: false},
        approve: { type: String, required: false},
        approver: { type: String, required: false},
        note: { type: String, required: false},
        create_date : { type: Date, default : Date.now },
        deleted: { type: String, required: false},
})

module.exports = mongoose.model('leave',leaveSchema)