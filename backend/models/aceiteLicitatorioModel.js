import mongoose from 'mongoose'
const Schema = mongoose.Schema 

const aceiteLicitatorioSchema = new mongoose.Schema({
   
    processoExecucao:String,
    anexos:String,
    esclarecimento:String,
    contratoSubConvenio:String,
    prorrogacao:Boolean,
    liberacaoFinanceira:Date,
    movimentacaoFinanceira:Date,
    observacao:String,
    aceiteConcluido:Boolean,
    status:String,
    dataOficioAnulacao:Date,
    analiseAprovada:Boolean,
    convenio:{
        type:Schema.Types.ObjectId,
        ref:'Convenio'
    } 
})

const AceiteLicitatorio = mongoose.model('AceiteLicitatorio', aceiteLicitatorioSchema)


export default AceiteLicitatorio