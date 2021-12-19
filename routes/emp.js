const express = require('express');
const router = express.Router();
const emp = require('../models/emp')

router.get('/', async (req,res) => {
    try {
        var result = await emp.find({  });
        res.send(result);
    }
    catch (error) {
        res.status(400).send({error});
    }
});
router.get('/:id', async (req,res) => {
    try {
        var result = await emp.find({_id:req.params.id}).exec();
        res.send(result);
    }
    catch (error) {
        res.status(400).send({error});
    }
});

router.post('/', async (req,res) => {
    try {
        const e = new emp({
            email: req.body.email,
            password: req.body.password,
            first_name:req.body.first_name,
            last_name:req.body.last_name,
            role:req.body.role,
            position: req.body.position
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
        var e = await emp.findOne({_id:req.params.id}).exec();
        e.set(req.body);
        var result = await e.save();
        res.send(result);
    } catch (error) { 
        res.status(400).send({error});
    }
  });
module.exports = router;