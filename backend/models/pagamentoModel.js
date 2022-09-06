import mongoose from 'mongoose'

const Schema = mongoose.Schema

const pagamentoSchema = new Schema({
    numeroParcela:{
        type:Number,
        required:true
    },
    valor:{
        type:Number,
        required:true
    },
    dataPrevista:{
        type:Date,
        required:true
    },
    dataRealizada:{
        type:Date,
        required:false
    }, 
    numeroEmpenho:{
        type:String,
        required:true
    },
    pago:Boolean,
    observacao:String,
    convenio:{
        type:Schema.Types.ObjectId,
        ref:'Convenio'
    }
})

const Pagamento = mongoose.model('Pagamento', pagamentoSchema)

export default Pagamento