import * as mongoose from 'mongoose'

export const CardSchema = new mongoose.Schema({
    type: { type:String, required: true }, 
    cardText: { type:String, required: true },
    category: { type:String, required: true }
})

export interface Card extends mongoose.Document {
    id:string, 
    type:string, 
    cardText:string
    category:string
};
