const express = require('express')
const router = express.Router()
const User = require('../../models/User')
const uuid = require('uuid')

router.post('/register', async (req, res) => {
    const { email, password }  = req.body

    try {

        let user = await User.findOne({ email })

        if (user) {
            res.status(400).json({ errors: ['User already exists'] })
        }

        const authId = uuid.v4()

        user = new User({
            email,
            password,
            authId
        })

        await user.save()

        res.json({authId})

    } catch (err) {
        console.error(err.message)
        res.status(500).send('server error')   
    }
})

router.post('/login', async (req, res) => {

    const { email, password }  = req.body

    try {

        let user = await User.findOne({ email })

        if (!user) {
            res.status(400).json({ errors: ['Username or password is incorrect']})    
        }

        if (password !== user.password) {
            res.status(400).json({ errors: ['Username or password is incorrect']})            
        }

        res.json({authId: user.authId})

    } catch (err) {
 
        console.error(err.message)
        res.status(500).send('server error')
        
    }
})

router.post('/id', async (req, res) => {

    const { userId }  = req.body

    try {

        console.log(req.body)
        console.log(userId)

        let user = await User.findOne({ authId: userId })

        if (user) {
            res.json({ isValid: true})    
        } else {
            res.json({ isValid: false})
        }

    } catch (err) {
 
        console.error(err.message)
        res.status(500).send('server error')
        
    }
})

module.exports = router