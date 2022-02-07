const express = require('express');
const router = express.Router();
const emp = require('../models/emp')

// router.get('/', async (req,res) => {
//     try {
//         var result = await emp.find({  });
//         res.send(result);
//     }
//     catch (error) {
//         res.status(400).send({error});
//     }
// });
router.post('/login/', async (req,res) => {
    try {
        // Get user input
        const { email, password } = req.body;
    
        // Validate user input
        if (!(email && password)) {
          res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        var result = await emp.find({email:email,password:password}).exec();
        if (result.email) {
            // // Create token
            // const token = jwt.sign(
            //   { user_id: user._id, email },
            //   process.env.TOKEN_KEY,
            //   {
            //     expiresIn: "2h",
            //   }
            // );
      
            // // save user token
            // user.token = token;
      
            // // user
            res.status(200).json(result);
          }
            res.status(400).send("Email or Password");
      } catch (err) {
        console.log(err);
      }
      // Our register logic ends here
});

module.exports = router;