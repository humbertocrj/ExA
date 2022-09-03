import express from 'express'
import Providencias from "../models/providenciasModel.js";
import asyncHandler from 'express-async-handler'

const providenciasRouter = express.Router()

providenciasRouter.post('/novo', asyncHandler(async (req, res)=>{

    const providencias = new Providencias({
        tipo:req.body.tipo,
        descricao:req.body.descricao,
        data:req.body.data,
        prazo:req.body.prazo,
        convenioId:req.body.convenio
    })

    await providencias.save()

    res.json(providencias)

}))

providenciasRouter.get("/", asyncHandler(async (req, res)=>{
    const docs = await Providencias.find({})

    res.json(docs)
}))

providenciasRouter.get('/:id', asyncHandler(async (req, res)=>{
    const id = req.params.id
    const providencia = await Providencias.findById(id);
    
    res.json(providencia)
}))

providenciasRouter.delete('/:id', asyncHandler(async (req, res)=>{
    const id = req.params.id
    const doc = await Providencias.findByIdAndDelete(id)

    res.json(doc)
}))
export default providenciasRouter

