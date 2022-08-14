import asyncHandler from 'express-async-handler'
import Admin from '../models/adminSchema.js'
import User from '../models/userSchema.js'
import generateToken from '../utils/generateToken.js'


const authAdmin = asyncHandler(async (req,res) =>{

const {email,password}=req.body

const admin = await Admin.findOne({email})

if (admin && ( admin.password===password)){
res.json({
    _id:admin._id,
    name:admin.name,
    email:admin.email,
    leaves:admin.leaves,
    token:generateToken(admin._id)
})
} else{
    res.status(401)
    throw new Error('Invalid email or password')
}

})

//register new user
//post
//public
const putUserLeave = asyncHandler(async (req,res) =>{

    const {_id,date}=req.body
    
    const userExist = await User.findById(_id)
    const admin = await Admin.findOne({name:"admin"})
    
    if(admin){
           admin.leaves.push({user:_id,date:date})
           admin.save()
           res.send("sucess")
    }
    else{
        throw new Error('something was wrong in requesting leaves')
    }
    } )


    const evaluateUserLeave = asyncHandler(async (req,res) =>{

        const {index,name}=req.body
        
        
        const admin = await Admin.findOne({name:"admin"})
        
        if(admin){

            if(name === 'Accept') {
               const date1= admin.leaves[index].date
               const userExist = await User.findById(admin.leaves[index].user)
               userExist.attendance.push({date:date1,presence:'L'})
               admin.leaves.splice(index,1)
               userExist.save()
               admin.save()
               res.send(admin)
            }

            if(name === 'Reject'){
                admin.leaves.splice(index,1)
                admin.save()
                res.send(admin)
            }
        }
        else{
            throw new Error('something was wrong in requesting leaves')
        }
        } )



        const deleteUser = asyncHandler(async (req,res) =>{

            try {
                const {_id}=req.body
                const user = await User.findByIdAndDelete(_id) 
                res.send("user Deleted")    
            } catch (error) {
                throw new Error("user not found");
            }
            })




 
export {authAdmin,putUserLeave ,evaluateUserLeave, deleteUser }