import mongoose from 'mongoose';

const {Schema} = mongoose;

const ufSchema = new Schema({
    nome:{
        type:String,
        required:true,
    },
    sigla:{
        type:String,
        required:true,
    },
    regiao:{
        type:String,
        required:true
    }
})

const Uf = mongoose.model('UF', ufSchema);

export default Uf