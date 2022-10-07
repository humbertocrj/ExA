
import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import Message from '../components/UI/Message'

import axios from 'axios'
import { useEffect } from 'react'


import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import 'bootstrap/dist/css/bootstrap.css';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import dateFormat from "../utils/date"

const ConsultarConvenio = (props) => {
  const [convenio, setConvenio] = useState("")
  const [exibirFormulario, setExibirFormulario] = useState(false)
  const [resultadoBusca, setResultadoBusca] = useState("")
  const [mensagemBusca, setMensagemBusca] = useState(false)

  const getConvenio = async (numero) => {
    const res = await axios.get('http://localhost:9000/api/convenios/numero?convenio=' + numero)
    return res.data
  }

  const consultarConvenio = async (e) => {
    e.preventDefault();
    const res = await getConvenio(convenio)
    props.consulta(res)

    if (res) {
      setResultadoBusca(res)
      setMensagemBusca(false)
    } else {
      setMensagemBusca(true)
      setResultadoBusca("")
      setTimeout(() => {
        setMensagemBusca(false)
      }, 4000)
    }
  }

  return <>
    <Row>
      <Col>
        <form className="d-flex" onSubmit={consultarConvenio}>
          <input
            type="text"
            id="numero"
            placeholder='Digite o número do convênio que deseja adicionar um pagamento'
            value={convenio}
            onChange={(e) => setConvenio(e.target.value)}
          />
          <button className="btn btn-primary">Consultar</button>
        </form>
      </Col>
    </Row>
    <Row className="mt-3">
      <Col>
        {mensagemBusca && <Message variant="danger"
          text="Convênio não encontrado, verifique se ele está cadastrado ou se o número está correto." />}
      </Col>
    </Row>

    {resultadoBusca && (
      <div className="border rounded px-3"><Row>
        <Col>
          <label>Convênio</label>
          <p>{resultadoBusca.numeroCV}</p>
        </Col>
        <Col>
          <label>Processo</label>
          <p>{resultadoBusca.numeroProcesso}</p>
        </Col>
        <Col>
          <label>Programa</label>
          <p>{resultadoBusca.numeroPrograma}</p>
        </Col>
      </Row>
        <Row>
          <Col>
            <label>Objeto</label>
            <p>{resultadoBusca.objeto}</p>
          </Col>
          <Col md="auto">
            <label>Início da vigência</label>
            <p>{dateFormat(resultadoBusca.inicioVigencia, true)}</p>
          </Col>
          <Col md="auto">
            <label>Término da vigência</label>
            <p>{dateFormat(resultadoBusca.terminoVigencia, true)}</p>
          </Col>
        </Row></div>)}
  </>
}

export default ConsultarConvenio