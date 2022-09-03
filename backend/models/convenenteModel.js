import mongoose from 'mongoose';
const {Schema} = mongoose

const convenenteSchema = new Schema({
    nome:{
        type:String,
        required:true
    },
    cnpj:{
        type:String,
        required:true
    },
    uf:{
        type:Schema.Types.ObjectId,
        ref:'UF'
    }
})

const Convenente = mongoose.model('Convenente', convenenteSchema)

export default Convenente