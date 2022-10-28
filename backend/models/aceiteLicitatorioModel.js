import mongoose from 'mongoose'
const Schema = mongoose.Schema 

const aceiteLicitatorioSchema = new mongoose.Schema({
   
    processoExecucao:{type: Boolean, default:false},
    anexos:{type: Boolean, default:false},
    esclarecimento:{type: Boolean, default:false},
    contratoSubConvenio:{type: Boolean, default:false},
    prorrogacao:{type: Boolean, default:false},
    liberacaoFinanceira:Date,
    movimentacaoFinanceira:Date,
    observacao:String,
    status:String,
    dataOficioAnulacao:Date,
    convenio:{
        type:Schema.Types.ObjectId,
        ref:'Convenio'
    } 
})

const AceiteLicitatorio = mongoose.model('AceiteLicitatorio', aceiteLicitatorioSchema)


export default AceiteLicitatorio