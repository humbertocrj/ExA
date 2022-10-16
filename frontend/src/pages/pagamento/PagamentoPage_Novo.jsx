import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Title from '../../components/UI/Title'

import Btn from '../../components/UI/Button'
import Message from '../../components/UI/Message'

import axios from 'axios'
import { useEffect } from 'react'


import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import 'bootstrap/dist/css/bootstrap.css';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import dateFormat from "../../utils/date"
import { floatToCurrency, currencyToFloat } from '../../utils/currency'


import ConsultarConvenio from '../../components/ConsultarConvenio'
import InfoConvenio from '../../components/InfoConvenio'

const PagamentoPage = () => {
  const [parcela, setParcela] = useState("")
  const [valor, setValor] = useState("")
  const [dataPrevista, setDataPrevista] = useState("")
  const [dataRealizada, setDataRealizada] = useState("")
  const [pago, setPago] = useState(false)
  const [observacao, setObservacao] = useState("")
  const [convenio, setConvenio] = useState("")
  const [exibirFormulario, setExibirFormulario] = useState(false)
  const [numeroEmpenho, setNumeroEmpenho] = useState("")


  const [mensagemNovo, setMensagemNovo] = useState(false)
  const [mensagemAtualizar, setMensagemAtualizar] = useState(false)

  const { id } = useParams()

  const pagamento = async (id) => {
    const res = await axios.get('http://localhost:9000/api/pagamentos/' + id)

    return res.data
  }

  const consultarConvenio = (convenio) => {
    if (convenio) {
      setExibirFormulario(true)
      setConvenio(convenio)
    } else {
      setExibirFormulario(false)
      setConvenio("")
    }
  }

  useEffect(() => {

    if (id) {
      pagamento(id).then((res) => {
        setParcela(res.numeroParcela)
        setValor(floatToCurrency(res.valor))
        setDataPrevista(dateFormat(res.dataPrevista))
        setDataRealizada(dateFormat(res.dataRealizada))
        setNumeroEmpenho(res.numeroEmpenho)
        setPago(res.pago)
        setObservacao(res.observacao)
        setExibirFormulario(true)
        setConvenio(res.convenio)
      })
    }
  }, [])

  const submitHandler = async (e) => {

    e.preventDefault();

    const pagamento = {
      numeroParcela: parcela,
      valor: currencyToFloat(valor),
      dataPrevista: dataPrevista,
      dataRealizada: dataRealizada,
      numeroEmpenho: numeroEmpenho,
      pago: pago,
      observacao: observacao,
      convenio: convenio._id
    }

    if (!id) {
      const res = await axios.post('http://localhost:9000/api/pagamentos/novo', pagamento)

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
      const res = await axios.patch('http://localhost:9000/api/pagamentos/' + id, pagamento)

      setMensagemAtualizar(true)

      setTimeout(() => {
        setMensagemAtualizar(false)
      }, 2000)
    }

  }//submitHandler


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

      {id ? <InfoConvenio convenio={convenio} /> :
        (<div><ConsultarConvenio consulta={consultarConvenio} />
          <Link className="btn btn-outline-secondary" to="/pagamento">
            <ArrowBackIosIcon fontSize='small' />
            Voltar
          </Link>
        </div>)}

      {exibirFormulario && (<form className="mt-4" onSubmit={submitHandler}>
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
            <label htmlFor="valor">Valor*</label>
            <input
              type="text"
              id="valor"
              name="valor"
              onChange={(e) => floatToCurrency(e.target.value, true, setValor)}
              value={(valor)}
              required
            />

          </Col>
        </Row>
        <Row>
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
              onChange={(e) => setDataRealizada(e.target.value)}
              value={dataRealizada}
              required
            />
          </Col>
          <Col md={4}>

            <label htmlFor="numeroEmpenho">Número do Empenho*</label>
            <input
              type="text"
              name="numeroEmpenho"
              id="numeroEmpenho"
              onChange={(e) => setNumeroEmpenho(e.target.value)}
              value={numeroEmpenho}
              required
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