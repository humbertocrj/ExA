import express from 'express';
import asyncHandler from 'express-async-handler'
import Responsavel from '../models/responsavelModel.js';

const responsavelRouter = express.Router();

const getResponsavel = (req)=> {
    return {
            nome: req.body.nome,
            email: req.body.email,
            telefoneTrabalhoCel: req.body.telefoneTrabalhoCel,
            telefoneTrabalhoFixo: req.body.telefoneTrabalhoFixo,
            telefonePessoal:req.body.telefonePessoal,
            tipo:req.body.tipo
        }
    
}

responsavelRouter.get('/',asyncHandler(async (req, res, next) => {
    const docs = await Responsavel.find({})
    res.json(docs)
}))

responsavelRouter.get('/:id', asyncHandler(async (req, res, next) => {
    const responsavelId = req.params.id

    const doc = await Responsavel.findById(responsavelId)
    
    res.json(doc)
}))

responsavelRouter.post('/novo', asyncHandler(async (req, res, next) => {
   
    const responsavel = new Responsavel(getResponsavel(req))

    const doc = await responsavel.save()
    res.json(doc)
  
}))

responsavelRouter.patch('/:id', asyncHandler(async(req,res,next)=>{
    const filter = req.params.id
    const update = getResponsavel(req)

    const doc = await Responsavel.findByIdAndUpdate(filter, update, {returnOriginal:false})
    res.json(doc)

}))

responsavelRouter.delete('/:id', asyncHandler(async (req, res, next)=>{
    const filter = req.params.id

    const doc = await Responsavel.findByIdAndDelete(filter)
    res.json(doc)
}))

export default responsavelRouter