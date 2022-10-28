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

import style from "./licitacao.module.css"
import { stringToBoolean } from '../../utils/converToBool'

const LicitacaoPage = () => {
  const [liberacao, setLiberacao] = useState("")
  const [movimentacao, setMovimentacao] = useState("")
  const [processoExecucao, setProcessoExecucao] = useState(false)

  const [esclarecimento, setEsclarecimento] = useState(false)
  const [subConvenio, setSubConvenio] = useState(false)
  const [anexo, setAnexo] = useState(false)
  const [observacao, setObservacao] = useState("")
  const [convenio, setConvenio] = useState("")
  const [exibirFormulario, setExibirFormulario] = useState("")
  const [prorrogacao, setProrrogacao] = useState(false)
  const [dataOficioAnulacao, setDataOficioAnulacao] = useState("")

  const statusOption = ["Não iniciado", "Em andamento", "Suspenso", "Cancelado", "Concluído"]
  const [status, setStatus] = useState(statusOption[0])


  const [mensagemNovo, setMensagemNovo] = useState(false)
  const [mensagemAtualizar, setMensagemAtualizar] = useState(false)

  const { id } = useParams()

  const getLicitacao = async (id) => {
    const res = await axios.get('http://localhost:9000/api/licitacao/' + id)
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
      getLicitacao(id).then((res) => {
        setProcessoExecucao(stringToBoolean(res.processoExecucao))
        setEsclarecimento(stringToBoolean(res.esclarecimento))
        setSubConvenio(stringToBoolean(res.contratoSubConvenio))
        setProrrogacao(stringToBoolean(res.prorrogacao))
        setAnexo(stringToBoolean(res.anexos))
        setObservacao(res.observacao)
        setExibirFormulario(true)
        setConvenio(res.convenio)
        setStatus(res.status)
        setLiberacao(dateFormat(res.liberacaoFinanceira))
        setMovimentacao(dateFormat(res.movimentacaoFinanceira))
        setDataOficioAnulacao(dateFormat(res.dataOficioAnulacao))
        console.log(res)
      })
    }
  }, [])

  const submitHandler = async (e) => {

    e.preventDefault();

    const licitacao = {
      liberacaoFinanceira: liberacao,
      movimentacaoFinanceira: movimentacao,
      esclarecimento: esclarecimento,
      contratoSubConvenio: subConvenio,
      processoExecucao:processoExecucao,
      prorrogacao: stringToBoolean(prorrogacao),
      anexos: anexo,
      observacao: observacao,
      status: status,
      dataOficioAnulacao: dataOficioAnulacao,
      convenio: convenio._id
    }
    console.log(licitacao)

    if (!id) {
      const res = await axios.post('http://localhost:9000/api/licitacao/novo', licitacao)

      setMensagemNovo(true)

      setTimeout(() => {
        setMensagemNovo(false)
        setProcessoExecucao("")
        setEsclarecimento("")
        setSubConvenio("")
        setProrrogacao(false)
        setAnexo(false)
        setObservacao("")
        setStatus("Selecione a situação")
        setLiberacao("")
        setMovimentacao("")
        setDataOficioAnulacao("")
        setConvenio(false)
        setExibirFormulario(false)

      }, 2000)
    } else {
      const res = await axios.patch('http://localhost:9000/api/licitacao/' + id, licitacao)

      setMensagemAtualizar(true)

      setTimeout(() => {
        setMensagemAtualizar(false)
      }, 2000)
    }

  }//submitHandler


  const titulo = (id ? "editar " : "adicionar ") + "licitação"

  return (
    <div className="h-100">
      <Row>
        <Col md="12">
          <Title text={titulo} />
        </Col>
      </Row>
      <Row >
        <Col>
          {mensagemNovo && <Message variant="success" text="Nova licitação salva com sucesso!" />}
          {mensagemAtualizar && <Message variant="success" text="Licitação atualizada com sucesso!" />}
        </Col>
      </Row>

      {convenio ? <InfoConvenio convenio={convenio} /> :
        (<div>
          <ConsultarConvenio consulta={consultarConvenio} /><Link className="btn btn-outline-secondary" to="/licitacao">
            <ArrowBackIosIcon fontSize='small' />
            Voltar
          </Link>
        </div>)}

      {exibirFormulario && (<form className="mt-4" onSubmit={submitHandler}>
        <Row>
          <Col md="auto" className="form-group row">
            <label style={{ "whiteSpace": "nowrap" }} className="m-2">Situação do processo licitatório</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              {statusOption.map((item, key) => { return <option key={key}>{item}</option> })}
            </select>
          </Col>
        </Row>
        <Row>
          <Col md="auto" className="mt-2">
            <label className="m-2" htmlFor="liberacao">Liberação Financeira:</label>
            <input
              type="date"
              id="liberacao"
              name="liberacao"
              onChange={(e) => setLiberacao(e.target.value)}
              value={liberacao}
            />
          </Col>
          <Col md="auto" className=" mt-2">
            <label className="m-2" htmlFor="movimentacao">Movimentação Financeira:</label>
            <input
              type="date"
              id="movimentacao"
              name="movimentacao"
              onChange={(e) => setMovimentacao(e.target.value)}
              value={movimentacao}
            />
          </Col>
          <Col md="auto" className=" mt-2">
            <label className="m-2" htmlFor="oficioAnulacao">Ofício de Anulação:</label>
            <input
              type="date"
              id="oficioAnulacao"
              name="oficioAnulacao"
              onChange={(e) => setDataOficioAnulacao(e.target.value)}
              value={dataOficioAnulacao}
            />
          </Col>
        </Row>
        <Row>
          <Col md="auto" className="d-flex align-items-center justify-content-center mt-2">
            <label style={{ "whiteSpace": "nowrap" }} className="m-2" htmlFor="processoExecucao">Processo de execução:</label>
            <input
              type="checkbox"
              id="processoExecucao"
              name="processoExecucao"
              onChange={(e) => setProcessoExecucao(e.target.checked)}
              checked={processoExecucao}
            />
          </Col>
          <Col md="auto" className="d-flex align-items-center justify-content-center mt-2">
            <label style={{ "whiteSpace": "nowrap" }} className="m-2" htmlFor="anexo">Possui anexos:</label>
            <input
              type="checkbox"
              id="anexo"
              name="anexo"
              onChange={(e) => setAnexo(e.target.checked)}
              checked={anexo}
            />
          </Col>
          <Col md="auto" className="d-flex align-items-center justify-content-center mt-2">
            <label style={{ "whiteSpace": "nowrap" }} className="m-2" htmlFor='esclarecimento'>Esclarecimentos:</label>
            <input
              type="checkbox"
              id="esclarecimento"
              name="esclarecimento"
              onChange={(e) => setEsclarecimento(e.target.checked)}
              checked={esclarecimento}
            />
          </Col>

          <Col md="auto" className=" d-flex align-items-center mt-2">
            <label style={{ "whiteSpace": "nowrap" }} className="m-2" htmlFor='subConvenio'>Subconvenio:</label>
            <input
              type="checkbox"
              id="subConvenio"
              name="subConvenio"
              onChange={(e) => setSubConvenio(e.target.checked)}
              checked={subConvenio}
            />
          </Col>
          <Col md="auto" className="d-flex align-items-center justify-content-center mt-2">

            <label className="m-2" htmlFor="prorrogacao">Prorrogação:</label>
            <input
              type="checkbox"
              name="prorrogacao"
              id="prorrogacao"
              onChange={(e) => setProrrogacao(e.target.checked)}
              checked={prorrogacao}

            />
          </Col>
        </Row>

        <Row>
          <Col>
            <label htmlFor="observação">Obvervação</label>
            <textarea

              id="observação"
              name="observação"
              onChange={(e) => setObservacao(e.target.value)}
              value={observacao}
              className="w-100 p-3"
              rows="5"
              required
            />
          </Col>
        </Row>

        <div className="d-flex mt-5 justify-content-between">
          <Link className="btn btn-outline-secondary" to="/licitacao">
            <ArrowBackIosIcon fontSize='small' />
            Voltar
          </Link>
          <Btn className="px-5" type="submit" text="Salvar" />
        </div>
      </form>)}
    </div>

  )
}

export default LicitacaoPage