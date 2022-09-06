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
    }
})

const Telefone = mongoose.model('Telefone', telefoneSchema)

export default Telefone