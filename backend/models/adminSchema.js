import mongoose from "mongoose";
import bcrypt from 'bcryptjs'


const AdminSchema = mongoose.Schema({

name:{
    type:String,
    required:true,
    
},

email:{
    type:String,
    required:true,
    unique:true
},


password:{
    type:String,
    required:true
},

leaves : [
      {
          date:{type:String,required:true},
          user :{type:mongoose.Schema.Types.ObjectId , required:true , ref : "User"}             
      }
]
},{
    timestamps :true
})

const Admin = mongoose.model("Admin",AdminSchema)

export default Admin
