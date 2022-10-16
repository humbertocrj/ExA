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

import dateFormat from "../../utils/date"
import {floatToCurrency} from '../../utils/currency'

const ConveniosPage = () => {
    let [numeroCV, setNumeroCV] = useState("")
    let [processo, setProcesso] = useState("")
    let [proposta, setProposta] = useState("")
    let [tipoProjeto, setTipoProjeto] = useState("")
    const [objeto, setObjeto] = useState("")
    let [tipoSelecao, setTipoSelecao] = useState("")
    const [programa, setPrograma] = useState("")
    const [recursoConcedente, setRecursoConcedente] = useState("")
    const [contrapartida, setContrapartida] = useState("")
    let [inicioVigencia, setInicioVigencia] = useState("")
    const [terminoVigencia, setTerminoVigencia] = useState("")
    let [inicioExecucao, setInicioExecucao] = useState("")
    const [terminoExecucao, setTerminoExecucao] = useState("")
    
    const { id } = useParams()

    const getConvenio = async (id) => {
        const res = await axios.get('http://localhost:9000/api/convenios/' + id)

        return res.data
    }

    const navigate = useNavigate()

    useEffect(() => {

        if (id) {
            getConvenio(id).then((res) => {

                setNumeroCV(res.numeroCV)
                setObjeto(res.objeto)
                setPrograma(res.numeroPrograma)
                setProposta(res.numeroProposta)
                setProcesso(res.numeroProcesso)
                setContrapartida(res.contrapartida)
                setRecursoConcedente(res.recursoConcedente)
                setTipoProjeto(res.tipoDeProjeto)
                setTipoSelecao(res.formaDeSelecao)
                setInicioVigencia(dateFormat(res.inicioVigencia, true))
                setTerminoVigencia(dateFormat(res.terminoVigencia,true))
                setInicioExecucao(dateFormat(res.dataRealizacaoInicio,true))
                setTerminoExecucao(dateFormat(res.dataRealizacaoFim, true))

            })
        }
    }, [])

    return (
        <div className="h-100">
            <Row>
                <Col md="12">
                    <Title text="Detalhes do Convênio" />
                </Col>
            </Row>


            <Row>
                <Col>
                    <label htmlFor="numeroCV">Convênio</label>
                    {numeroCV}
                </Col>
                <Col>
                    <label htmlFor='processo'>Processo</label>
                    {processo}
                </Col>
                <Col>
                    <label htmlFor='processo'>Proposta</label>
                    {proposta}
                </Col>
                <Col md="auto">
                    <label htmlFor="tipo">Tipo de projeto</label>
                    {tipoProjeto}
                </Col>
            </Row>
            <Row>
                <Col>
                    <label htmlFor='processo'>Objeto</label>
                    {objeto}
                </Col>
                <Col md="auto">
                    <label htmlFor="tipo">Tipo de Seleção</label>
                    {tipoSelecao}
                </Col>
                <Col md={3}>
                    <label htmlFor='programa'>Programa</label>
                    {programa}
                </Col>
            </Row>
            <Row>
                <Col md="auto">
                    <label htmlFor='recursoConcedente'>Recurso do Concedente</label>
                    {floatToCurrency(recursoConcedente)}
                </Col>
                <Col md="auto">
                    <label htmlFor='contrapartida'>Contrapartida</label>
                    {floatToCurrency(contrapartida)}
                </Col>
            </Row>
            <Row>
                <Col md="auto">
                    <label htmlFor='inicioVigencia'>Início da Vigência</label>
                    {inicioVigencia}

                </Col>
                <Col md="auto">
                    <label htmlFor='terminoVigencia'>Término da Vigência</label>
                    {terminoVigencia}

                </Col>
                <Col md="auto">
                    <label htmlFor='InícioExecucao'>Início da Execução</label>
                    {inicioExecucao}

                </Col>
                <Col md="auto">
                    <label htmlFor='terminoExecucao'>Término da Execução</label>
                    {terminoExecucao}

                </Col>
            </Row>


            <div className="d-flex mt-5 justify-content-between">
                <Link className="btn btn-outline-secondary" to="/convenios">
                    <ArrowBackIosIcon fontSize='small' />
                    Voltar
                </Link>

            </div>

        </div>

    )
}

export default ConveniosPage