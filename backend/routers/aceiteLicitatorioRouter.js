import express from 'express'
import asyncHandler from 'express-async-handler'
import AceiteLicitatorio from '../models/aceiteLicitatorioModel.js'

const aceiteLicitatorioRouter = express.Router()

aceiteLicitatorioRouter.post('/novo',  asyncHandler(async (req, res)=>{
   
    const aceiteLicitatorio = new AceiteLicitatorio({
        processoExecucao:req.body.processoExecucao,
        anexos:req.body.anexos,
        esclarecimento:req.body.esclarecimento,
        contratoSubConvenio: req.body.contratoSubConvenio,
        observacao:req.body.observacao,
        prorrogacao:req.body.prorrogacao,
        aceiteConcluido:req.body.aceiteConcluido,
        status:req.body.status,
        dataOficioAnulacao:req.body.dataOficioAnulacao,
        analiseAprovada:req.body.analiseAprovada,
        liberacaoFinanceira:req.body.liberacaoFinanceira,
        movimentacaoFinanceira:req.body.movimentacaoFinanceira,
        convenio:req.body.convenio
    })

    const doc = await aceiteLicitatorio.save()
    res.json(doc)
}) )

aceiteLicitatorioRouter.get('/', asyncHandler(async (req, res)=>{
    const docs = await AceiteLicitatorio.find({}).populate('convenio')

    res.json(docs)
}))

aceiteLicitatorioRouter.patch('/:id', asyncHandler(async (req, res)=>{
    const filter = req.params.id 
    const update = {
        processoExecucao:req.body.processoExecucao,
        anexos:req.body.anexos,
        esclarecimento:req.body.esclarecimento,
        contratoSubConvenio: req.body.contratoSubConvenio,
        observacao:req.body.observacao,
        prorrogacao:req.body.prorrogacao,
        aceiteConcluido:req.body.aceiteConcluido,
        status:req.body.status,
        dataOficioAnulacao:req.body.dataOficioAnulacao,
        analiseAprovada:req.body.analiseAprovada,
        liberacaoFinanceira:req.body.liberacaoFinanceira,
        movimentacaoFinanceira:req.body.movimentacaoFinanceira,
        convenio:req.body.convenio
    }

    const doc = await AceiteLicitatorio.findByIdAndUpdate(filter, update, {returnOriginal:false})

    res.json(doc)
}))

aceiteLicitatorioRouter.get('/:id', asyncHandler(async (req, res)=>{
    const id = req.params.id 

    const doc = await AceiteLicitatorio.findById(id).populate('convenio')

    res.json(doc)
}))

aceiteLicitatorioRouter.delete('/:id', asyncHandler(async (req, res)=>{
    const id = req.params.id 

    const doc = await AceiteLicitatorio.findByIdAndDelete(id)

    res.json(doc)
}))

export default aceiteLicitatorioRouter