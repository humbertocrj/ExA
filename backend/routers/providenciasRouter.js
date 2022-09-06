import express from 'express'
import Providencias from "../models/providenciasModel.js";
import asyncHandler from 'express-async-handler'

const providenciasRouter = express.Router()

const getProvidencias = (req)=>{
    return {
        tipo:req.body.tipo,
        descricao:req.body.descricao,
        data:req.body.data,
        prazo:req.body.prazo,
        convenio:req.body.convenio
    }
}

providenciasRouter.get("/", asyncHandler(async (req, res)=>{
    const docs = await Providencias.find({})

    res.json(docs)
}))

providenciasRouter.post('/novo', asyncHandler(async (req, res)=>{

    const providencias = new Providencias(getProvidencias(req))

    await providencias.save()

    res.json(providencias)

}))

providenciasRouter.get('/:id', asyncHandler(async (req, res)=>{
    const id = req.params.id
    const providencia = await Providencias.findById(id).populate("convenio");
    
    res.json(providencia)
}))

providenciasRouter.patch('/:id', asyncHandler(async (req, res)=>{
    const filter = req.params.id
    const update = getProvidencias(req)

    const doc = await Providencias.findByIdAndUpdate(filter, update,{returnOriginal:false})

    res.json(doc)

}))

providenciasRouter.delete('/:id', asyncHandler(async (req, res)=>{
    const id = req.params.id
    const doc = await Providencias.findByIdAndDelete(id)

    res.json(doc)
}))
export default providenciasRouter

