import mongoose from 'mongoose';
const {Schema} = mongoose

const responsavelSchema = new mongoose.Schema({
    nome:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    telefone:[{type:Schema.Types.ObjectId, ref:'Telefone' }],
    tipo:{
        type:String,
        required:true
    }
})

const Responsavel = mongoose.model('Responsavel', responsavelSchema)

export default Responsavel