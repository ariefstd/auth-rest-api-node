const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const conn = require('../dbConnection').promise();

exports.register = async(req,res,next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() });
    }

    try{

        const [row] = await conn.execute(
            "SELECT `email` FROM `user_reg` WHERE `email`=?",
            [req.body.email]
          );

        if (row.length > 0) {
            return res.status(201).json({
                message: "The E-mail already in use",
            });
        }

        const hashPass = await bcrypt.hash(req.body.password, newFunction());

        const [rows] = await conn.execute('INSERT INTO `user_reg`(`name`,`email`,`password`) VALUES(?,?,?)',[
            req.body.name,
            req.body.email,
            hashPass
        ]);

        if (rows.affectedRows === 1) {
            return res.status(201).json({
                message: "The user has been successfully inserted.",
            });
        }
        
    }catch(err){
        next(err);
    }

    function newFunction() {
        return 12;
    }
}