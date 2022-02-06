const express = require('express');
const router = express.Router();
const jwt = require('../models/jwt')

router.get('/', async (req,res) => {
    try {
        var result = await jwt.find({  });
        res.send(result);
    }
    catch (error) {
        res.status(400).send({error});
    }
});
router.get('/:id', async (req,res) => {
    try {
        var result = await jwt.find({_id:req.params.id}).exec();
        res.send(result);
    }
    catch (error) {
        res.status(400).send({error});
    }
});

router.post('/', async (req,res) => {
    try {
        const e = new jwt({
            jwtId: req.body.jwtId,
            jwtSecret: req.body.jwtSecret,
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
        var e = await jwt.findOne({_id:req.params.id}).exec();
        e.set(req.body);
        var result = await e.save();
        res.send(result);
    } catch (error) { 
        res.status(400).send({error});
    }
  });
module.exports = router;