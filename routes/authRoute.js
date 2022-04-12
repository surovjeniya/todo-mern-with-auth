const {Router} = require('express')
const User = require('../models/User')
const {check,validationResult}  = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')

const router = Router()

router.post('/registration',
    [
        check('email',"Incorrect email").isEmail(),
        check('password',"Password min 6 symbols").isLength({min:6}),
    ],
    async (req,res) => {
        
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).json({
                errors:errors.array()
            })
        }
        const {email,password,confirmPassword} = req.body
        if(password === confirmPassword) {
            const isUsed = await User.findOne({
                email:email
            })
            if(isUsed) {
                return res.status(300).json({
                    message:"This address is already in use.Try another email"
                })
            }

            const hashedPassword = await bcrypt.hash(password,12)

            const user = new User ({
                email,password:hashedPassword
            })

            await user.save()
            res.status(201).json({
                message:'Registration done.',
            })

        } else {
            return res.status(300).json({
                message: "Password dont match.Try again"
            })
        }
    }catch(e) {
        res.status(500).json({
            messsage:'Registration error.Try again. '+e.message
        })
    }
})


router.post('/login',
    [
        check('email',"Incorrect email").isEmail(),
        check('password',"Password min 6 symbols").exists(),
    ],
    async (req,res) => {
        
    try {
        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            return res.status(400).json({
                errors:errors.array()
            })
        }

        const {email,password} = req.body

        const user = await User.findOne({email})

        if(!user) {
            return res.status(400).json({
                messsage:"This email not registered"
            })
        }

        const isMatchPassword = await bcrypt.compare(password,user.password)
        if(!isMatchPassword) {
            return res.status(400).json({
                messsage:"Passwords dont't match!"
            }) 
        }

        const jwtSecret = config.get('jwtSecret') || 'surovjeniya jwt'
        const token = jwt.sign(
            {userId:user._id},
            jwtSecret,
            {expiresIn:'1h'}
        )

        res.status(200).json({
            message:'Done',
            token,
            userId:user._id
        })
    }catch(e) {
        res.status(500).json({
            messsage:'Registration error.Try again. '+e.message
        })
    }
})


module.exports = router