import * as mongoose from 'mongoose'

export const UserSchema = new mongoose.Schema({
    userRole: { type:String, required: true }, 
    userName: { type:String, required: true },
    userPassword: { type:String, required: true }
})

export interface User extends mongoose.Document {
    id:string, 
    userRole:string, 
    userName:string
    userPassword:string
};
