import express from 'express'
import asyncHandler from 'express-async-handler'
import Usuario from '../models/usuarioModel.js'
import bcrypt from 'bcryptjs'

const usuarioRouter = express.Router()

usuarioRouter.post('/novo', asyncHandler( async(req,res)=>{
    
     const senha =  bcrypt.hashSync(req.body.senha, 10)

     const usuario = new Usuario({
        nome:req.body.nome,
        email:req.body.email,
        senha:senha,
        perfil:req.body.perfil
    })

    const doc =await usuario.save()
    
    res.json(`Usuário ${req.body.nome} criado com sucesso!`)
}))

usuarioRouter.post('/autenticar', asyncHandler(async (req, res)=>{
    const email = req.body.email
    const senha = req.body.senha

    
}))


export default usuarioRouter