import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Title from '../../components/UI/Title'
import style from './ResponsavelPage.module.css'

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


const ResponsavelPage = () => {
  let [nome, setNome] = useState("")
  let [email, setEmail] = useState("")
  let [telefoneTrabalho, setTelefoneTrabalho] = useState("")
  let [telefoneFixo, setTelefoneFixo] = useState("")
  let [telefonePessoal, setTelefonePessoal] = useState("")
  let [tipoResponsavel, setTipoResponsavel] = useState("")
  const tipoResponsavelSelect = ['Selecione o tipo', 'Técnico do Ministério', 'Técnico do convenente', 'Gestor convenente']

  const [mostrarForm, setMostrarForm] = useState(false)
  const [responsaveis, setResponsaveis] = useState(null)
  const [mensagemNovo, setMensagemNovo] = useState(false)
  const [mensagemAtualizar, setMensagemAtualizar] = useState(false)
  const { id } = useParams()

  const getResponsavel = async (id) => {
    const res = await axios.get('http://localhost:9000/api/responsaveis/' + id)

    return res.data
  }
  const navigate = useNavigate()
  useEffect(() => {
    if (id) {
      getResponsavel(id).then((res) => {

        setNome(res.nome)
        setEmail(res.email)
        setTipoResponsavel(res.tipo)
        setTelefoneTrabalho(res.telefoneTrabalhoCel)
        setTelefoneFixo(res.telefoneTrabalhoFixo)
        setTelefonePessoal(res.telefonePessoal)
      })

    }
  }, [])

  const submitHandler = async (e) => {

    e.preventDefault();
    const responsavel = {
      nome: nome,
      email: email,
      tipo: tipoResponsavel,
      telefoneTrabalhoCel: telefoneTrabalho,
      telefoneTrabalhoFixo: telefoneFixo,
      telefonePessoal: telefonePessoal
    }

    if (!id) {
      const res = await axios.post('http://localhost:9000/api/responsaveis/novo', responsavel)

      setMensagemNovo(true)

      setTimeout(() => {
        setMensagemNovo(false)
        setNome("")
        setEmail("")
        setTipoResponsavel("")
        setTelefoneTrabalho("")
        setTelefoneFixo("")
        setTelefonePessoal("")

      }, 2000)
    } else {
      const res = await axios.patch('http://localhost:9000/api/responsaveis/' + id, responsavel)

      setMensagemAtualizar(true)

      setTimeout(() => {
        setMensagemAtualizar(false)
      }, 2000)
    }

  }//submitHandler

  const titulo = (id ? "editar " : "adicionar ") + "responsavel"

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
      <form className={style["form-container"]} onSubmit={submitHandler}>
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
            <label htmlFor='email'>E-mail*</label>
            <input
              type="email"
              id="email"
              nome="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </Col>
        </Row>
        <Col md={4}>

          <label htmlFor="tipo">Tipo de responsavel</label>
          <select
            name="tipo"
            id="tipo"
            onChange={(e) => setTipoResponsavel(e.target.value)}
            value={tipoResponsavel}
          >
            {tipoResponsavelSelect.map((data, key) => {
              return <option key={key} value={data}>{data}</option>
            })}
          </select>
        </Col>

        <Row>
          <Col md={4}>
            <label htmlFor="telefoneCelularTrabalho">Celular - trabalho</label>
            <input
              type="tel"
              id="telefoneCelularTrabalho"
              nome="telefoneCelularTrabalho"
              onChange={(e) => setTelefoneTrabalho(e.target.value)}
              value={telefoneTrabalho}
              className="w-100"
            />
          </Col>
          <Col md={4}>
            <label htmlFor="telefoneFixoTrabalho">Fixo - Trabalho</label>
            <input
              type="tel"
              id="telefoneFixoTrabalho"
              nome="telefoneFixoTrabalho"
              onChange={(e) => setTelefoneFixo(e.target.value)}
              value={telefoneFixo}
              className="w-100"

              required
            />
          </Col>
          <Col md={4}>
            <label htmlFor="telefonePessoal">Telefone pessoal</label>
            <input
              type="tel"
              id="telefonePessoal"
              nome="telefonePessoal"
              onChange={(e) => setTelefonePessoal(e.target.value)}
              value={telefonePessoal}
            />
          </Col>
        </Row>

        <div className="d-flex mt-5 justify-content-between">
          <Link className="btn btn-outline-secondary" to="/responsavel">
            <ArrowBackIosIcon fontSize='small' />
            Voltar
          </Link>
          <Btn className="px-5" type="submit" text="Salvar" />
        </div>
      </form>
    </div>

  )
}

export default ResponsavelPage