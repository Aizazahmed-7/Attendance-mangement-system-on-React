import mongoose from 'mongoose'
import admin from './admin.js'
import Admin from './models/adminSchema.js'
import connectDB from './config/db.js'

connectDB();


const importData = async () =>{

  try {
    const createdadmin = await Admin.insertMany(admin)
    console.log(createdadmin)
  } catch (error) {
    console.log(error)
  }
}


importData();
