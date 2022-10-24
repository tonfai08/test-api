const express = require('express');
const router = express.Router();
const dishType = require('../models/dishType')
const jwt = require('../models/jwt')
const jwtToken = require('jsonwebtoken');

const jwtSecret = async() =>{
    var jwtSecret = await jwt.findOne({jwtId:'000001'}).exec()
        if(jwtSecret === null){
            return {'status' : "error",'detail' : 'ไม่พบ jwtSecret'};
        }
        return jwtSecret;
}
const checkLogin = async(req,res,next) =>{
    // if(req.headers.xdes === "ton") {
    //     req.token = {
    //         fname:"ton",
    //         role: "admin"
    //     };
    //     return next();
    // } else {
    //     return res.status(401).end();
    // }
    
    // var decoded = jwtToken.verify(req.headers.token, jwtSecret());
    const jwtSec = await jwtSecret();
    try {
        var decoded = jwtToken.verify(req.headers.token, jwtSec.jwtSecret);
        req.user = {
            email:decoded.email ,
            first_name:decoded.first_name ,
            last_name:decoded.last_name,
            role:decoded.role ,
            position:decoded.position ,

        }
      } catch(err) {
        return res.status(401).end();
      }
    console.log("user", req.user)
    next();
}

// const checkAdmin = (req,res,next) =>{
//     console.log("checkAdmin", req.user.role)
//     next();
// }

// router.get('/',checkLogin, checkAdmin, async (req,res) => {
//     try {
//         var result = await dishType.find({  });
//         res.send(result);
//     }
//     catch (error) {
//         res.status(400).send({error});
//     }
// });
router.get('/',async (req,res) => {
    try {
        var result = await dishType.find({  });
        res.send(result);
    }
    catch (error) {
        res.status(400).send({error});
    }
});
router.get('/:id', async (req,res) => {
    try {
        var result = await dishType.findOne({_id:req.params.id}).exec();
        res.send(result);
    }
    catch (error) {
        res.status(400).send({error});
    }
});

router.post('/', async (req,res) => {
    try {
        const e = new dishType({

            type_dish: req.body.type_dish,
            size:req.body.size,
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
        var e = await dishType.findOne({_id:req.params.id}).exec();
        e.set(req.body);
        var result = await e.save();
        res.send(result);
    } catch (error) { 
        res.status(400).send({error});
    }
  });
module.exports = router;