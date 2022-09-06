import express from 'express';
import asyncHandler from 'express-async-handler'
import Responsavel from '../models/responsavelModel.js';

const responsavelRouter = express.Router();

responsavelRouter.get('/',asyncHandler(async (req, res, next) => {
    const docs = await Responsavel.find({})
    res.json(docs)
}))

responsavelRouter.get('/:id', asyncHandler(async (req, res, next) => {
    const responsavelId = req.params.id

    const responsavel = await Responsavel.findById(responsavelId)
    const doc = await responsavel.populate('telefone')

    res.json(doc)
}))

responsavelRouter.post('/novo', asyncHandler(async (req, res, next) => {
    const responsavel = new Responsavel({
        nome: req.body.nome,
        email: req.body.email,
        telefone: req.body.telefone,
        tipo:req.body.tipo
    })

    const doc = await responsavel.save()
    res.json(doc)
  
}))

responsavelRouter.patch('/:id', asyncHandler(async(req,res,next)=>{
    const filter = req.params.id
    const update = {
        nome: req.body.nome,
        email: req.body.email,
        telefone: req.body.telefone,
        tipo:req.body.tipo
    }
    const doc = await Responsavel.findByIdAndUpdate(filter, update, {returnOriginal:false})
    res.json(doc)

}))

responsavelRouter.delete('/:id', asyncHandler(async (req, res, next)=>{
    const filter = req.params.id

    const doc = await Responsavel.findByIdAndDelete(filter)
    res.json(doc)
}))

export default responsavelRouter