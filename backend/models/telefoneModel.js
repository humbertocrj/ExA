import mongoose from 'mongoose';
const {Schema} = mongoose
const telefoneSchema = new Schema({
    tipo:{
        type:String,
        required:true,
    },
    numero:{
        type:String,
        required:true
    },
    responsavel:{
        type:Schema.Types.ObjectId,
        ref:"Responsavel"
    }
})

const Telefone = mongoose.model('Telefone', telefoneSchema)

export default Telefone