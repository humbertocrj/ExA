import mongoose from 'mongoose'

const Schema = mongoose.Schema

const providenciasSchema = new mongoose.Schema({
    tipo:{
        type:String,
        required:true
    },
    descricao:{
        type:String,
        required:true
    },
    data:{
        type:Date,
        required:true
    },
    prazo:{
        type:Date,
        required:true
    },
    convenioId:{
        type:Schema.Types.ObjectId,
        ref:"Convenio"
    }
})

const Providencias = mongoose.model('Providencias', providenciasSchema)

export default Providencias