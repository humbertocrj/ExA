import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Title from '../../components/UI/Title'


import Input from '../../components/UI/Input'
import Select from '../../components/UI/Select'
import Btn from '../../components/UI/Button'
import Message from '../../components/UI/Message'

import axios from 'axios'
import { useEffect } from 'react'


import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import 'bootstrap/dist/css/bootstrap.css';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';


const ConvenentePage = () => {
  let [nome, setNome] = useState("")
  let [cnpj, setCnpj] = useState("")
  
  let [uf, setUF] = useState("")

  const [ufs, setUFs] = useState([])
  const [mostrarForm, setMostrarForm] = useState(false)
  const [responsaveis, setResponsaveis] = useState(null)
  const [mensagemNovo, setMensagemNovo] = useState(false)
  const [mensagemAtualizar, setMensagemAtualizar] = useState(false)
  const { id } = useParams()

  const getConvenente = async (id) => {
    const res = await axios.get('http://localhost:9000/api/convenentes/' + id)

    return res.data
  }

  const listarUF = async ()=>{
    const res = await axios.get('http://localhost:9000/api/ufs')

    setUFs(res.data)
    setUF(res.data[0]._id)
     
  }

  const navigate = useNavigate()

  useEffect(() => {

    listarUF()
     
    if (id) {
      getConvenente(id).then((res) => {

        setNome(res.nome)
        setCnpj(res.cnpj)
        setUF(res.ufId)
        console.log(res.ufId)
      })
    }
  }, [])

  const submitHandler = async (e) => {

    e.preventDefault();
    const convenente = {
      nome: nome,
      cnpj: cnpj,
      uf: uf,
    }

    if (!id) {
      const res = await axios.post('http://localhost:9000/api/convenentes/novo', convenente)

      setMensagemNovo(true)

      setTimeout(() => {
        setMensagemNovo(false)
        setNome("")
        setCnpj("")
        setUF("")
         
      }, 2000)
    } else {
      const res = await axios.patch('http://localhost:9000/api/responsaveis/' + id, convenente)

      setMensagemAtualizar(true)

      setTimeout(() => {
        setMensagemAtualizar(false)
      }, 2000)
    }

  }//submitHandler

  const titulo = (id ? "editar " : "adicionar ") + "convenente"

  return (
    <div className="h-100">
      <Row>
        <Col md="12">
          <Title text={titulo} />
        </Col>
      </Row>
      <Row >
        <Col>
        {mensagemNovo && <Message variant="success" text="Novo responsável salvo com sucesso!" />}
        {mensagemAtualizar && <Message variant="success" text="Responsável atualizado com sucesso!" />}
        </Col>
      </Row>
      <form   onSubmit={submitHandler}>
        <Row>
          <Col>
            <label htmlFor="nome">Nome*</label>
            <input
              type="text"
              id="nome"
              nome="nome"
              onChange={(e) => setNome(e.target.value)}
              value={nome}
              required
            />
          </Col>
          <Col>
            <label htmlFor='cnpj'>CNPJ*</label>
            <input
              type="cnpj"
              id="cnpj"
              nome="cnpj"
              onChange={(e) => setCnpj(e.target.value)}
              value={cnpj}
              required
            />
          </Col>
        </Row>
        <Col md={4}>

          <label htmlFor="uf">UF*</label>
          <select
            name="uf"
            id="uf"
            onChange={(e) => setUF(e.target.value)}
            value={uf}
          >
            {ufs.map((data, key) => {
              return <option key={key} value={data._id}>{data.nome}</option>
            })}
           
          </select>
        </Col>

        <div className="d-flex mt-5 justify-content-between">
          <Link className="btn btn-outline-secondary" to="/convenente">
            <ArrowBackIosIcon fontSize='small' />
            Voltar
          </Link>
          <Btn className="px-5" type="submit" text="Salvar" />
        </div>
      </form>
    </div>

  )
}

export default ConvenentePage