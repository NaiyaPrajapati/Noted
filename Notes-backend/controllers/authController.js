require('dotenv').config()
const jwt = require('jsonwebtoken')
var User = require('../models/user')
var bcrypt = require('bcrypt')
// return 
// error if error
// token if user exist or not exist

exports.register = (req, res) => {
    var newUser = new User(req.body);
    console.log(req.body);
    newUser.password = bcrypt.hashSync(req.body.password, 10);
    newUser.save((err, user) => {
      if (err) {
        if (err.code == 11000) res.json({ error: "Username already Taken" });
        else {
          res.status(401).send({
            msg: err,
          });
        }
      } else {
        user.password = undefined;
        let payload = { _id: newUser._id };
        let token = jwt.sign(payload, "secretkey");
        res.json({ token, name:user.name, email:user.email });
      }
    });
  };

exports.Login = async (req, res) => {

    const { email, password } = req.body;
    if (!email || !password) {
        res.json({ error: "All fields are required" })
    }
    else{
        User.findOne({ email: email }, (err, user) => {
            if (err) {
                res.json({ error: "Something went wrong" })
            } else {
                if (!user) {
                    res.json({ error: "User doesn't exist" })
                }
                else {
                    if (!user.password) {
                        res.json({ error: "You haven't set your password" })
                    }
                    else {
                        bcrypt.compare(password, user.password).then(match => {
                        
                            if (match) {
                                let payload = { id: user._id, email: user.email }
                                let token = jwt.sign(payload, process.env.JWTSECRETKEY, {
                                    expiresIn: "24h"
                                })
                                res.json({ token, name:user.name, email:user.email })
                            }
                            else {
                                res.json({ error: 'Incorrect password!!' })
                            }
                        }).catch(err => {
                            res.json({ error: "Something went wrong" })
                        })
                    }
    
                }
    
            }
        })
    }
}
