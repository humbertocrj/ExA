import express from 'express';
import Convenio from '../models/convenioModel.js'
import asyncHandler from 'express-async-handler'

const dashboardRouter = express.Router()

let getConvenio = (req) => {

  return {
    numeroCV: req.body.numeroCV,
    numeroPrograma: req.body.numeroPrograma,
    numeroProposta: req.body.numeroProposta,
    numeroProcesso: req.body.numeroProcesso,
    formaDeSelecao: req.body.formaDeSelecao,
    tipoDeProjeto: req.body.tipoDeProjeto,
    objeto: req.body.objeto,
    inicioVigencia: req.body.inicioVigencia,
    terminoVigencia: req.body.terminoVigencia,
    dataRealizacaoInicio: req.body.dataRealizacaoInicio,
    dataRealizacaoFim: req.body.dataRealizacaoFim,
    recursoConcedente: req.body.recursoConcedente,
    contrapartida: req.body.contrapartida,
    responsavel: req.body.responsavel,
    convenente: req.body.convenente,
    ano: req.body.inicioVigencia.substring(0, 4)
  }
}

const recursosPorAno = async () => {
  
  let docs = await Convenio.aggregate([
    {
      $group: {

        _id: '$ano',
        Total: { $sum: { $add: ['$recursoConcedente', '$contrapartida'] } }
      }
    }
  ]);

  docs.sort((a, b) => { return a._id - b._id })
  return docs
}

const recursosPorTipoProjeto = async () => {

  let docs = await Convenio.aggregate([
    {
      $group:{
        _id:{ano:'$ano', tipo:'$tipoDeProjeto'},
        Total:{$sum:{$add:['$contrapartida', '$recursoConcedente']}}
    }
  }
    
  ]);

  docs.sort((a, b) => { return a._id.ano - b._id.ano })
  return docs
 
}


dashboardRouter.get('/', asyncHandler(async (req, res, next) => {

  const rpa = await recursosPorAno()
  const cptp = await recursosPorTipoProjeto()
  console.log(cptp)

  res.json({ 
    "recursoPorAno": rpa,
    "recursoPorTipoProjeto":cptp
 })
}))




export default dashboardRouter