import asyncHandler from 'express-async-handler'
import User from '../models/userSchema.js'
import generateToken from '../utils/generateToken.js'


const authUser = asyncHandler(async (req,res) =>{

const {email,password}=req.body

const user = await User.findOne({email})

if (user && ( user.password===password)){
res.json({
    _id:user._id,
    name:user.name,
    email:user.email,
    image:user.image,
    attendance:user.attendance,
    token:generateToken(user._id)
})
} else{
    res.status(401)
    throw new Error('Invalid email or password')
}

})

//register new user
//post
//public
const registerUser = asyncHandler(async (req,res) =>{

    const {name,email,password,image}=req.body
    const today= new Date();
    const date1 = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const userExist = await User.findOne({email})
    
    if(userExist){
        res.status(400)
        throw new Error('user already exists')
    }

    const user = await User.create({
        name,
        email,
        password,
        image,
        attendance: []
    })

    if(user){
        res.status(201).json({
            user
        })
    }else{
        res.status(400)
        throw new Error('invalid user data')
    }
  
    } )



//get/user/profile
//get 
//private
const getUserProfile = asyncHandler(async (req,res) =>{

   
    const user = await User.findById(req.params.id)
    if(user){
        res.json(user)
    }else{
        res.status(404)
    }
    } )


    const updateUserAttendance = asyncHandler(async (req,res) =>{

   
        const user = await User.findById(req.params.id)
        if(user){

            if(user.attendance[req.body.index].presence === 'A'){
                user.attendance[req.body.index].presence = 'P'
            }

            else if(user.attendance[req.body.index].presence === 'P'){
                user.attendance[req.body.index].presence = 'L'
            }

            else {
                user.attendance[req.body.index].presence = 'A'
            }
            
             const updatedUser = await user.save()
            res.json(updatedUser)
        }else{
            res.status(404)
        }
        } )
    



//get all users
    const getUserList = asyncHandler(async (req,res) =>{
        const user = await User.find({})
        if(user){
            res.json(user)
        }else{
            res.status(404)
        }
        } )

    const updateUserProfile = asyncHandler(async (req,res) =>{
         console.log(req.body._id)
        const user = await User.findById(req.body._id)
        const today= new Date();
        const date1 = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        
        if(user){
           user.attendance.push({date:date1,presence:req.body.presence})

           const updatedUser = await user.save()

           res.json({
            _id:updatedUser._id,
            name:updatedUser.name,
            email:updatedUser.email,
            image:updatedUser.image,
            attendance:updatedUser.attendance,
            token:generateToken(updatedUser._id)
        })
        }else{
            res.status(404)
        }
        } )


export {authUser ,getUserProfile,registerUser,updateUserProfile,getUserList,updateUserAttendance}