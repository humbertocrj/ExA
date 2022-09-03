import express from 'express';
import asyncHandler from 'express-async-handler'
import Convenente from '../models/convenenteModel.js'
import UF from '../models/ufModel.js'

const convenenteRouter = express.Router();

convenenteRouter.get('/', asyncHandler(async (req, res)=>{
    const docs = await Convenente.find({})
 
    res.json(docs)
}))

convenenteRouter.post('/novo', asyncHandler(async (req, res)=>{
    const novoConvenente = new Convenente({
        nome:req.body.nome,
        cnpj:req.body.cnpj,
        uf:req.body.uf
    })

    const doc = await novoConvenente.save()
    res.json(doc)
}))

convenenteRouter.get('/:id', asyncHandler(async (req, res) => {
    const id = req.params.id

    const convenente = await Convenente.findById(id).exec()
    const uf = await UF.findById(convenente.uf)
    const convenenteDetalhe = {
        id:convenente.id,
        nome:convenente.nome, 
        cnpj:convenente.cnpj,
        ufId:uf.id,
        estado:uf.nome, 
        sigla:uf.sigla, 
        regiao:uf.regiao}
 
    res.json(convenenteDetalhe)
}))

convenenteRouter.patch('/:id', asyncHandler(async(req, res)=>{
    
}))

export default convenenteRouter
