const express = require('express');
const router = express.Router();
const leave = require('../models/leave')
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
const checkLogin = async(req,res,next) =>{
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
    //console.log("user", req.user)
    next();
}


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
        var result = await leave.find({empId:req.params.id}).exec();
        res.send(result);
    }
    catch (error) {
        res.status(400).send({error});
    }
});

router.post('/',checkLogin, async (req,res) => {
    try {
        const e = new leave({
            empId:req.body.empId,
            leave_type:req.body.leave_type,
            date_leave:req.body.date_leave,
            note:req.body.note,
        });
        var result = await e.save();

        const leaveType = (type) =>{
          const intType = parseInt(type);
          if(intType === 1){
            return "ลากิจ";
          } 
          else if(intType === 2){
            return "ลาป่วย";
          }
          else if(intType === 3){
            return "ลาไปเรื่อย";
          }
          else {
            return "ลาตุ้ย";
          }
        }
        const daySum = (day) =>{
          var arrayLength = day.length;
          // for (var i = 0; i < arrayLength; i++) {
          //     console.log(day[i]);
          //     return day[i];
          // }
          const day1 = moment(day[0]);
          const day2 = moment(day[arrayLength-1]);
          console.log('moment',moment(day1).diff(day2, 'days'));
            return moment(day2).diff(day1, 'days')+1 ;
    
       }
        //console.log(req.user.email);
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'gipsicc.001@gmail.com',
              pass: 'uifjldcvnltufajr'
            }
          });
          
          var mailOptions = {
            from: req.user.email,
            to: 'wittawat.s@gipsic.com',
            subject: req.user.first_name+' '+req.user.last_name+' ลางานในวันที่ '+moment(e.date_leave[0]).format('YYYY/MM/DD'),
            html: req.user.first_name+' '+req.user.last_name+'<br>'+leaveType(e.leave_type)+' : '+moment(e.date_leave[0]).format('YYYY/MM/DD')+' - '+moment(e.date_leave[1]).format('YYYY/MM/DD')+'<br>'+'จำนวนวันที่ลา :'+daySum(e.date_leave)+'<br>'+'หมายเหตุ :'+e.note+'<br>'
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });

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