import express from 'express'
import asyncHandler from 'express-async-handler'
import Telefone from '../models/telefoneModel.js'

const telefoneRouter = express.Router()

telefoneRouter.post('/novo', asyncHandler(async (req,res, next) => {
    const telefone = new Telefone({
        tipo:req.body.tipo,
        numero:req.body.numero,
    })
    
   const doc = await telefone.save()
   res.json(doc)
}))

telefoneRouter.get('/', asyncHandler(async (req, res, next) => {
    const docs = await Telefone.find({})

    res.json(docs)
}))

telefoneRouter.get('/:id', asyncHandler(async (req, res, next) => {
    const id = req.params.id
    const doc = await Telefone.findById(id)

    res.json(doc)
}))

telefoneRouter.patch('/:id', asyncHandler(async (req, res, next) => {
    const filter = req.params.id
    const update = {
        tipo:req.body.tipo,
        numero:req.body.numero
    }
   const doc =  await Telefone.findByIdAndUpdate(filter, update, {returnOriginal:false})
   res.json(doc)
}))

telefoneRouter.delete('/:id', asyncHandler(async (req, res, next)=>{
    const id = req.params.id

    const doc = await Telefone.findByIdAndDelete(id)

    res.json(doc)
}))

export default telefoneRouter