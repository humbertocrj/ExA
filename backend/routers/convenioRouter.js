import express from 'express';
import Convenio from '../models/convenioModel.js'
import asyncHandler from 'express-async-handler'

const convenioRouter = express.Router()


convenioRouter.get('/', asyncHandler(async (req, res, next)=>{
    const convenios = await Convenio.find({})
    res.json(convenios)
}))

convenioRouter.get('/:id', asyncHandler(async (req, res)=>{
    const convenio = await Convenio.findById(req.params.id)
    res.json(convenio)
}))

convenioRouter.post('/novo', asyncHandler(async (req, res,next)=>{
    
    const convenio = new Convenio({
        numeroCV:req.body.numeroCV,
        numeroPrograma:req.body.numeroPrograma,
        tipoDeProjeto:req.body.tipoDeProjeto,
        formaDeSelecao:req.body.formaDeSelecao,
        objeto:req.body.objeto,
        inicioVigencia:req.body.inicioVigencia,
        terminoVigencia:req.body.terminoVigencia,
        dataRealizacaoInicio:req.body.dataRealizacaoInicio,
        dataRealizacaoFim:req.body.dataRealizacaoFim,
        recursoConcedente:req.body.recursoConcedente,
        contrapartida:req.body.contrapartida,
        responsavel:req.body.responsavel
    })
     await convenio.save()
    res.json(convenio)
}))

convenioRouter.patch('/:id',asyncHandler( async (req,res, next) => {
    const filter = req.params.id
    const update = {
        numeroCV:req.body.numeroCV,
        numeroPrograma:req.body.numeroPrograma,
        formaDeSelecao:req.body.formaDeSelecao,
        tipoDeProjeto:req.body.tipoDeProjeto,
        objeto:req.body.objeto,
        inicioVigencia:req.body.inicioVigencia,
        terminoVigencia:req.body.terminoVigencia,
        dataRealizacaoInicio:req.body.dataRealizacaoInicio,
        dataRealizacaoFim:req.body.dataRealizacaoFim,
        recursoConcedente:req.body.recursoConcedente,
        contrapartida:req.body.contrapartida,
        responsavel:req.body.responsavel
    }
    
   let doc =  await Convenio.findByIdAndUpdate(filter, update, {returnOriginal:false})
   res.json(doc)
  
}))

convenioRouter.delete('/:id', asyncHandler(async(req,res,next)=>{
    const id = req.params.id
    const doc = await Convenio.findByIdAndDelete(id)
    res.json(doc)

}))
export default convenioRouter