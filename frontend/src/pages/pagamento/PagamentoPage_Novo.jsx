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


const PagamentoPage = () => {
  let [parcela, setParcela] = useState("")
  let [dataPrevista, setDataPrevista] = useState("")
  let [dataRealizada, setDataRealizada] = useState("")
  let [pago, setPago] = useState(false)
  let [observacao, setObservacao] = useState("")
  let [convenio, setConvenio] = useState("")
  let [exibirFormulario, setExibirFormulario] = useState(false)
  let [numeroEmpenho, setNumeroEmpenho] = useState("")

  const [mostrarForm, setMostrarForm] = useState(false)
  const [responsaveis, setResponsaveis] = useState(null)
  const [mensagemNovo, setMensagemNovo] = useState(false)
  const [mensagemAtualizar, setMensagemAtualizar] = useState(false)
  const { id } = useParams()

  const getResponsavel = async (id) => {
    const res = await axios.get('http://localhost:9000/api/responsaveis/' + id)

    return res.data
  }

  const getConvenio = async (numero) => {
    const res = await axios.get('http://localhost:9000/api/convenios/numero?convenio=' + numero)
    return res.data
  }

  const navigate = useNavigate()
  useEffect(() => {

    if (id) {
      getResponsavel(id).then((res) => {

        setParcela(res.parcela)
        setDataPrevista(res.dataPrevista)
        setNumeroEmpenho(res.numeroEmpenho)
        setPago(res.pago)
        setObservacao(res.observacao)

      })

    }
  }, [])

  const submitHandler = async (e) => {

    e.preventDefault();
    const responsavel = {
      parcela: parcela,
      dataPrevista: dataPrevista,
      dataRealizada: dataRealizada,
      numeroEmpenho: numeroEmpenho,
      pago: pago,
      observacao: observacao,
    }

    if (!id) {
      const res = await axios.post('http://localhost:9000/api/responsaveis/novo', responsavel)

      setMensagemNovo(true)

      setTimeout(() => {
        setMensagemNovo(false)
        setParcela("")
        setDataPrevista("")
        setDataRealizada("")
        setNumeroEmpenho("")
        setPago(false)
        setObservacao("")

      }, 2000)
    } else {
      const res = await axios.patch('http://localhost:9000/api/responsaveis/' + id, responsavel)

      setMensagemAtualizar(true)

      setTimeout(() => {
        setMensagemAtualizar(false)
      }, 2000)
    }

  }//submitHandler

  const consultarConvenio = async (e) => {
    e.preventDefault();
    const res = await getConvenio(convenio)
    if (res) {
      setExibirFormulario(true)
    }
  }
  const titulo = (id ? "editar " : "adicionar ") + "pagamento"

  return (
    <div className="h-100">
      <Row>
        <Col md="12">
          <Title text={titulo} />
        </Col>
      </Row>
      <Row >
        <Col>
          {mensagemNovo && <Message variant="success" text="Novo pagamento salvo com sucesso!" />}
          {mensagemAtualizar && <Message variant="success" text="Pagamento atualizado com sucesso!" />}
        </Col>
      </Row>

      <Row>
        <Col>
          <form className="d-flex" onSubmit={consultarConvenio}>
            <input
              type="text"
              id="numero"
              placeholder='Digite o número do convênio.'
              value={convenio}
              onChange={(e) => setConvenio(e.target.value)}
            />
            <button className="btn btn-primary">Consultar</button>
          </form>
        </Col>
      </Row>


      {exibirFormulario && (<form onSubmit={submitHandler}>
        <Row>
          <Col md="auto">
            <label htmlFor="parcela">Número da parcela*</label>
            <input
              type="number"
              id="parcela"
              name="parcela"
              onChange={(e) => setParcela(e.target.value)}
              value={parcela}
              required
              step='1'
              min='0'
            />
          </Col>
          <Col md="auto">
            <label htmlFor='dataPrevista'>Data prevista*</label>
            <input
              type="date"
              id="dataPrevista"
              name="dataPrevista"
              onChange={(e) => setDataPrevista(e.target.value)}
              value={dataPrevista}
              required
            />
          </Col>
          <Col md="auto">
            <label htmlFor='dataRealizada'>Data realizada</label>
            <input
              type="date"
              id="dataRealizada"
              name="dataRealizada"
              onChange={(e) => setDataPrevista(e.target.value)}
              value={dataRealizada}
              required
            />
          </Col>
        </Row>
        <Row>
          <Col md={4}>

            <label htmlFor="numeroEmpenho">Número do Empenho</label>
            <input
              type="text"
              name="numeroEmpenho"
              id="numeroEmpenho"
              onChange={(e) => setNumeroEmpenho(e.target.value)}
              value={numeroEmpenho}
            />

          </Col>
          <Col md="auto" className="d-flex align-items-center justify-content-center mt-2">

            <input
              type="checkbox"
              id="pago"
              name="pago"
              onChange={(e) => setPago(e.target.checked)}
              checked={pago}
            />
            <label className="m-2" htmlFor="pago">Pago</label>

          </Col>
        </Row>
        <Row>
          <Col>
            <label htmlFor="observação">Obvervação</label>
            <textarea
              type="tel"
              id="observação"
              name="observação"
              onChange={(e) => setObservacao(e.target.value)}
              value={observacao}
              className="w-100"
              rows="5"

              required
            />
          </Col>
        </Row>

        <div className="d-flex mt-5 justify-content-between">
          <Link className="btn btn-outline-secondary" to="/pagamento">
            <ArrowBackIosIcon fontSize='small' />
            Voltar
          </Link>
          <Btn className="px-5" type="submit" text="Salvar" />
        </div>
      </form>)}
    </div>

  )
}

export default PagamentoPage