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

const PagamentoPage = () => {

    const [parcela, setParcela] = useState("")
    const [valor, setValor] = useState("")
    const [dataPrevista, setDataPrevista] = useState("")
    const [dataRealizada, setDataRealizada] = useState("")
    const [pago, setPago] = useState(false)
    const [observacao, setObservacao] = useState("")
    const [convenio, setConvenio] = useState("")

    const [numeroEmpenho, setNumeroEmpenho] = useState("")

    const { id } = useParams()

    const getPagamento = async (id) => {
        const res = await axios.get('http://localhost:9000/api/pagamentos/' + id)

        return res.data
    }

    const navigate = useNavigate()


    useEffect(() => {

        getPagamento(id).then((res) => {

            setParcela(res.numeroParcela)
            setValor(res.valor)
            setDataPrevista(res.dataPrevista)
            setDataRealizada(res.dataPrevista)
            setNumeroEmpenho(res.numeroEmpenho)
            setPago(res.pago)
            setObservacao(res.observacao)
            setConvenio(res.convenio)
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
                <Col >
                    <label htmlFor="parcela">Parcela</label>
                    {parcela}

                </Col>
                <Col  >
                    <label htmlFor="valor">Valor</label>
                    {floatToCurrency(valor)}
                </Col>
                <Col md={4}>

                    <label htmlFor="numeroEmpenho">Número do Empenho*</label>
                    {numeroEmpenho}

                </Col>
            </Row>
            <Row>
                <Col >
                    <label htmlFor='dataPrevista'>Data prevista</label>
                    {dateFormat(dataPrevista, true)}

                </Col>
                <Col >
                    <label htmlFor='dataRealizada'>Data realizada</label>
                    {dateFormat(dataRealizada, true)}
                </Col>
                
                <Col md="auto" className="">
                    <label htmlFor="pago">Pago</label>
                    {pago ? "Sim" : "Não"}
                </Col>
            </Row>
            <Row className="mt-2">
                <Col>
                    <label htmlFor="observação">Obvervação</label>
                    {observacao}
                </Col>
            </Row>
            <div className="d-flex mt-5 justify-content-between">
                <Link className="btn btn-outline-secondary" to="/pagamento">
                    <ArrowBackIosIcon fontSize='small' />
                    Voltar
                </Link>
                
            </div>
        </div>





    )
}

export default PagamentoPage