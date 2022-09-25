import express from 'express';
import Uf from '../models/ufModel.js';
import asyncHandler from 'express-async-handler'

const ufRouter = express.Router();

ufRouter.post('/novo',asyncHandler(async (req, res, next) =>{
    const uf = new Uf({
        nome:req.body.nome,
        sigla:req.body.sigla,
        regiao:req.body.regiao
    })

    const doc = await uf.save();

    res.json(doc)
}) )

ufRouter.get('/', asyncHandler(async (req,res)=>{
    const docs = await Uf.find({}).sort({nome:1})
    res.json(docs)
}))


export default ufRouter