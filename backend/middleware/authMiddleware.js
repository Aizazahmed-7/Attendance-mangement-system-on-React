import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userSchema.js'

const protect = asyncHandler(async( req,res ,next)=>{

let token

if(req.headers.authorization ){
   try {
    token=req.headers.authorization.split(' ')[1]
    const decoded =jwt.verify(token,"abc123")
    req.user = await User.findById(decoded.id).select('-password')
    next()
   } catch (error) {
    console.log(error)
    res.status(401)
    throw new Error ("not authorized, token failed")
   } 
   
}

if(!token) {
    res.status(401)
    throw new Error("no TOKEN")
}


})


export default protect