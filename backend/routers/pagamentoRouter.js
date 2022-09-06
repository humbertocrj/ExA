import express from 'express'
import asyncHandler from 'express-async-handler'
import Pagamento from '../models/pagamentoModel.js'

const pagamentoRouter = express.Router()
const getPagamento = (req)=>{
    return {
        numeroParcela: req.body.numeroParcela,
        valor:req.body.valor,
        dataPrevista:req.body.dataPrevista,
        dataRealizada:req.body.dataRealizada,
        numeroEmpenho:req.body.numeroEmpenho,
        pago:req.body.pago,
        observacao:req.body.observacao,
        convenio:req.body.convenio
    }
}

pagamentoRouter.post('/novo', asyncHandler(async (req, res)=>{
    const pagamento = new Pagamento(getPagamento(req))

    const doc = await pagamento.save()
    res.json(doc)
}))

pagamentoRouter.get('/', asyncHandler( async (req, res)=>{
    const docs = await Pagamento.find({})

    res.json(docs)
}))

pagamentoRouter.patch('/:id', asyncHandler( async (req, res)=>{
    const update = getPagamento(req)
    const filter = req.params.id

    const doc = await Pagamento.findByIdAndUpdate(filter,update, {returnOriginal:false})

    res.json(doc)
}))

pagamentoRouter.get('/:id', asyncHandler(async (req, res)=>{
    const id = req.params.id

    const doc = await Pagamento.findById(id).populate('convenio')

    res.json(doc)
}))

pagamentoRouter.delete('/:id', asyncHandler(async (req, res)=>{
    const id = req.params.id
    const doc = await Pagamento.findByIdAndDelete(id)

    res.json(doc)
}))

export default pagamentoRouter