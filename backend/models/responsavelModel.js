import mongoose from 'mongoose';
const {Schema} = mongoose

const responsavelSchema = new mongoose.Schema({
    nome:{
        type:String,
        required:true
    },
    tipo:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    telefoneTrabalhoCel:{
        type:String
    },
    telefoneTrabalhoFixo:{
        type:String
    },telefonePessoal:{
        type:String
    }
})

const Responsavel = mongoose.model('Responsavel', responsavelSchema)

export default Responsavel