import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
  let nome = ""
  let email = ""
  let telefoneTrabalho = ""
  let telefoneFixo = ""
  let telefonePessoal = ""
  let tipoResponsavel = ""

  const [mostrarForm, setMostrarForm] = useState(false)
  const [responsaveis, setResponsaveis] = useState(null)
  const [mensagem, setMensagem] = useState(false)

  const navigate = useNavigate()

  const onChangeNome = (value) => {
    nome = value
  }

  const onChangeEmail = (value) => {
    email = value
  }

  const onChangeTelefoneTrabalho = (value) => {
    telefoneTrabalho = value
  }

  const onChangeTelefoneFixo = (value) => {
    telefoneFixo = value
  }

  const onChangeTelefonePessoal = (value) => {
    telefonePessoal = value
  }
  const onChangeTipo = (value) => {
    tipoResponsavel = value

  }

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
    
    const res = await axios.post('http://localhost:9000/api/responsaveis/novo', responsavel)
    console.log(res)

    setMensagem(true)
    setTimeout(() => {
      setMensagem(false)
    }, 2000)
  }//submitHandler

  return (
    <div className="container   h-100">
      <Row>
        <Col md="12">
          <Title text="adicionar responsável" />
        </Col>
      </Row>
      {mensagem && <Message variant="success" text="Novo responsável salvo com sucesso!" />}
      <form className={style["form-container"]} onSubmit={submitHandler}>
        <Row>
          <Col>
            <Input
              label="Nome*"
              type="text"
              id="nome"
              nome="nome"
              onChange={onChangeNome}
              required
            />
          </Col>
          <Col>
            <Input
              label="E-mail*"
              type="email"
              id="email"
              nome="email"
              onChange={onChangeEmail}
              required
            />
          </Col>
        </Row>
        <Col md={3}>
          <Select
            name="tipo"
            id="tipo"
            label="Tipo de responsável*"
            data={['Selecione o tipo', 'Técnico do Ministério', 'Técnico do convenente', 'Gestor convenente']}
            onChange={onChangeTipo}
            required
          />
        </Col>

        <Row>
          <Col md={3}>
            <Input
              label="Celular - trabalho)"
              type="tel"
              id="telefoneCelularTrabalho"
              nome="telefoneCelularTrabalho"
              onChange={onChangeTelefoneTrabalho}
            />
          </Col>
          <Col md={3}>
            <Input
              label="Fixo - Trabalho*"
              type="tel"
              id="telefoneFixoTrabalho"
              nome="telefoneFixoTrabalho"
              onChange={onChangeTelefoneFixo}
              required
            />
          </Col>
          <Col md={3}>
            <Input
              label="Pessoal"
              type="tel"
              id="telefonePessoal"
              nome="telefonePessoal"
              onChange={onChangeTelefonePessoal}
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