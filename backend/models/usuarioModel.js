import mongoose from 'mongoose'

const {Schema} = mongoose

const usuarioSchema = new Schema({
    nome:{
        type:String,
        required:true
    }, 
    email:{
        type:String,
        required:true
    },
    senha:{
        type:String,
        required:true
    },
    perfil:{
        type:String
    }
})

const Usuario = mongoose.model('Usuario', usuarioSchema)

export default Usuario