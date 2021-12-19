const express = require('express');
const router = express.Router();
const leave = require('../models/leave')

router.get('/', async (req,res) => {
    try {
        var result = await leave.find({  });
        res.send(result);
    }
    catch (error) {
        res.status(400).send({error});
    }
});
router.get('/:id', async (req,res) => {
    try {
        var result = await leave.find({_id:req.params.id}).exec();
        res.send(result);
    }
    catch (error) {
        res.status(400).send({error});
    }
});

router.post('/', async (req,res) => {
    try {
        const e = new leave({
            empId:req.body.empId,
            date_leave:req.body.date_leave,
            approver:req.body.approver
        });
        var result = await e.save();
        res.send(result);
    }
    catch (error) {
        res.status(400).send({error});
    }
});
router.put("/:id",  async (req, res) => {
    try {
        var e = await leave.findOne({_id:req.params.id}).exec();
        e.set(req.body);
        var result = await e.save();
        res.send(result);
    } catch (error) { 
        res.status(400).send({error});
    }
  });
module.exports = router;