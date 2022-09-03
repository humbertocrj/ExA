import mongoose from 'mongoose';

const responsavelSchema = new mongoose.Schema({
    nome:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    telefone:{
        type:String,
        required:true
    },
    tipo:{
        type:String,
        required:true
    }
})

const Responsavel = mongoose.model('Responsavel', responsavelSchema)

export default Responsavel