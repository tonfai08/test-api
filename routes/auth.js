const express = require('express');
const router = express.Router();
const emp = require('../models/emp')
const jwt = require('../models/jwt')
const jwtToken = require('jsonwebtoken');
router.post('/', async (req,res) => {
    try {
        const e = new emp({
            email: req.body.email,
            password: req.body.password,
        });
        var result = await emp.findOne({email: e.email}).exec();
                if(result === null){
                  res.send({'status' : "error",'detail' : 'ไม่พบ email'});
                }
                else if(result.password === e.password)
                {
                    var jwtSecret = await jwt.findOne({jwtId:'000001'}).exec()
                    if(jwtSecret === null){
                      res.send({'status' : "error",'detail' : 'password ไม่ถูกต้อง'});
                    }
                    const token = jwtToken.sign(
                        { 
                          id: result._id,   
                          email: result.email, 
                          first_name: result.first_name, 
                          last_name: result.last_name, 
                          role:result.role ,
                          position:result.position },
                        jwtSecret.jwtSecret,
                        {
                          expiresIn: "2h",
                        }
                      );
                    res.send({'status' : "success",'detail' : token});
                 
                }
                else{
                    res.send({'status' : "error",'detail' : 'password ไม่ถูกต้อง'});
                }
    }
    catch (error) {
        res.status(400).send({error});
    }
});

module.exports = router;