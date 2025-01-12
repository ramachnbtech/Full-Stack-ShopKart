const userModel = require("../../models/userModel")
const bcrypt = require('bcryptjs');


async function userSignUpController(req, res) {
  try {

    const { email, password, name } = req.body

    const user = await userModel.findOne({email})

    // console.log('user',user);
    
    if(user){
      // return res.status(400).json({message: "Email already exists."})
      throw new Error('Email already exists.')
    }
    

    if (!email) {
      throw new Error('Please provide email')
    }
    if (!password) {
      throw new Error('Please provide password')
    }
    if (!name) {
      throw new Error('Please provide name')
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hashSync(password, salt);

    if(!hashPassword){
      throw new Error('Password hashing failed')
    }

    const payload = {
      ...req.body,
      role: "GENERAL",
      password: hashPassword
    }

    const userData = new userModel(payload)
    const saveUser = await userData.save()
    
    res.status(201).json({
      data: saveUser,
      success: true,
      error: false,
      message: 'User created successfully!',
      
    })


  } catch (err) {
    // console.log('err',err.message);
    
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    })
  }

}

module.exports = userSignUpController