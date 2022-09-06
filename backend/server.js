import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import convenioRouter from './routers/convenioRouter.js';
import responsavelRouter from './routers/responsavelRouter.js'
import telefoneRouter from './routers/telefoneRouter.js'
import ufRouter from './routers/ufRouter.js'
import convenenteRouter from './routers/convenenteRouter.js';
import providenciasRouter from './routers/providenciasRouter.js'
import pagamentoRouter from './routers/pagamentoRouter.js'
import aceiteLicitatorioRouter from './routers/aceiteLicitatorioRouter.js'

const app = express();
app.use(express.json());

const res = dotenv.config();
if(res.error){
    throw res.error
}

async function connectDB() {
    await mongoose.connect(process.env.DB);
    console.log('Connected to database.');
}

connectDB().catch(err=>console.log(err));

//CRUDS
app.use('/api/convenios', convenioRouter) 
app.use('/api/responsaveis', responsavelRouter)
app.use('/api/telefones', telefoneRouter)
app.use('/api/ufs', ufRouter)
app.use('/api/convenentes', convenenteRouter)
app.use('/api/providencias', providenciasRouter)
app.use('/api/pagamentos', pagamentoRouter)
app.use('/api/aceite_licitacao', aceiteLicitatorioRouter)

//Middle to catch error from express-async-handler
app.use((err, req, res,next) => {
    res.status(500).send({message: err.message});
  })
  
const PORT = process.env.PORT 
 
app.listen(PORT, (req, res)=>{
    console.log('Listening on port '+PORT);
})