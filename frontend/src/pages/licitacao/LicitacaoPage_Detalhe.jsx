import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Title from '../../components/UI/Title'

import axios from 'axios'
import { useEffect } from 'react'

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import 'bootstrap/dist/css/bootstrap.css';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import dateFormat from "../../utils/date"
import { floatToCurrency, currencyToFloat } from '../../utils/currency'

import InfoConvenio from '../../components/InfoConvenio'
import { stringToBoolean } from '../../utils/converToBool'
const PagamentoPage = () => {

    const [liberacao, setLiberacao] = useState("")
    const [movimentacao, setMovimentacao] = useState("")
    const [processoExecucao, setProcessoExecucao] = useState("")
  
    const [esclarecimento, setEsclarecimento] = useState("")
    const [subConvenio, setSubConvenio] = useState("")
    const [anexo, setAnexo] = useState("")
    const [observacao, setObservacao] = useState("")
    const [convenio, setConvenio] = useState("")
    const [exibirFormulario, setExibirFormulario] = useState("")
    const [prorrogacao, setProrrogacao] = useState("")
    const [dataOficioAnulacao, setDataOficioAnulacao] = useState("")
  
    const statusOption = ['Selecione a situação', "Não iniciado", "Em andamento", "Suspenso", "Cancelado", "Concluído"]
    const [status, setStatus] = useState(statusOption[0])
   
    const { id } = useParams()  

    const getLicitacao = async (id) => {
        const res = await axios.get('http://localhost:9000/api/licitacao/' + id)
        return res.data
      }
    

    const navigate = useNavigate()


    useEffect(() => {

        getLicitacao(id).then((res) => {

            setProcessoExecucao(res.processoExecucao)
            setEsclarecimento(res.esclarecimento)
            setSubConvenio(res.contratoSubConvenio)
            setProrrogacao(stringToBoolean(res.prorrogacao))
            setAnexo(res.anexos)
            setObservacao(res.observacao)
            setExibirFormulario(true)
            setConvenio(res.convenio)
            setStatus(res.status)
            setLiberacao(dateFormat(res.liberacaoFinanceira, true))
            setMovimentacao(dateFormat(res.movimentacaoFinanceira, true))
            setDataOficioAnulacao(dateFormat(res.dataOficioAnulacao, true))
        })

    }, [])

    return (

        <div className="h-100">
            <Row>
                <Col md="12">
                    <Title text="Detalhes do pagamento" />
                </Col>
            </Row>
            <InfoConvenio convenio={convenio} />

            <Row className="mt-3">
                <Col md="auto">
                    <label htmlFor="parcela">Processo de Execução:</label>
                    {processoExecucao?"Sim":"Não"}

                </Col>
                <Col md="auto" >
                    <label htmlFor="valor">Possui anexos</label>
                    {anexo?"Sim":"Não"}
                </Col>
                <Col md="auto">
                    <label htmlFor="numeroEmpenho">Houve pedido de esclarecimento</label>
                    {esclarecimento?"Sim":"Não"}
                </Col>
                <Col md="auto">
                    <label htmlFor="numeroEmpenho">Foi prorrogado</label>
                    {prorrogacao?"Sim":"Não"}
                </Col>
                <Col md="auto">
                    <label htmlFor="numeroEmpenho">Situação</label>
                    {status}
                </Col>
            </Row>
            <Row>
                <Col >
                    <label htmlFor='dataPrevista'>Liberação financeira</label>
                    {liberacao}

                </Col>
                <Col >
                    <label htmlFor='dataRealizada'>Movimentação financeira</label>
                    {movimentacao}
                </Col>
                
                <Col md="auto" className="">
                    <label htmlFor="pago">Data da anulação</label>
                    {dataOficioAnulacao}
                </Col>
            </Row>
            <Row className="mt-2">
                <Col>
                    <label htmlFor="observação">Obvervação</label>
                    {observacao}
                </Col>
            </Row>
            <div className="d-flex mt-5 justify-content-between">
                <Link className="btn btn-outline-secondary" to="/licitacao">
                    <ArrowBackIosIcon fontSize='small' />
                    Voltar
                </Link>
                
            </div>
        </div>





    )
}

export default PagamentoPage