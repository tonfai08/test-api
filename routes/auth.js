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
        var result = await emp.find({email: e.email}).exec();

                if(result[0].password === e.password)
                {
                    var jwtSecret = await jwt.find({jwtId:'000001'}).exec()
                    // res.send(result);
                    const token = jwtToken.sign(
                        { email: result[0].email, position:result[0].position },
                        jwtSecret[0].jwtSecret,
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