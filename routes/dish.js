const express = require('express');
const router = express.Router();
const dish = require('../models/dish')
const jwt = require('../models/jwt')
const jwtToken = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const moment = require('moment');
const jwtSecret = async() =>{
    var jwtSecret = await jwt.findOne({jwtId:'000001'}).exec()
        if(jwtSecret === null){
            return {'status' : "error",'detail' : 'ไม่พบ jwtSecret'};
        }
        return jwtSecret;
}
router.get('/', async (req,res) => {
    try {
        var result = await dish.find({  });
        res.send(result);
    }
    catch (error) {
        res.status(400).send({error});
    }
});
router.get('/:id', async (req,res) => {
    try {
        var result = await dish.find({dish_id:req.params.id}).exec();
        res.send(result);
    }
    catch (error) {
        res.status(400).send({error});
    }
});

router.post('/', async (req,res) => {

        const e = new dish({
            dish_id:req.body.dish_id,
            type_id:req.body.type_id,
        });
        var result = await e.save();
        res.send(result);
});
router.put("/:id",  async (req, res) => {
    try {
        var e = await dish.findOne({dish_id:req.params.id}).exec();
        e.set(req.body);
      
        var result = await e.save();
        res.send(result);
    } catch (error) { 
        res.status(400).send({error});
    }
  });
module.exports = router;