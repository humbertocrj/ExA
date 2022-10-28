import mongoose  from 'mongoose';
const Schema = mongoose.Schema

const convenioSchema = new mongoose.Schema({
    numeroCV:{
        required: true,
        type:String
    },
    numeroProcesso:{
        required: true,
        type:String
    },
    numeroProposta:{
        required: true,
        type:String
    },
    tipoDeProjeto:{
        required:true,
        type:String
    },
    objeto:{
        required:true,
        type:String
    },
    formaDeSelecao:{
        required:true,
        type:String
    },
    numeroPrograma:{
        required:true,
        type:String
    },
    recursoConcedente:{
        required:true,
        type:Number
    },
    contrapartida:{
        required:true,
        type:Number
    },
    inicioVigencia:{
        required:true,
        type:Date
    },
    ano:{
        required:true,
        type:Number
    },
    terminoVigencia:{
        required:true,
        type:Date
    },
    dataRealizacaoInicio:{
        required:true,
        type:Date
    },
    dataRealizacaoFim:{
        required:true,
        type:Date
    },
    responsavel:{
        type:[Schema.Types.ObjectId],
        ref:"Responsavel"
    },
    convenente:{
        type:Schema.Types.ObjectId,
        ref:"Convenente"
    }
})

const Convenio = mongoose.model('Convenio',convenioSchema)

export default Convenio