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


const ConveniosPage = () => {
    let [numeroCV, setNome] = useState("")
    let [processo, setProcesso] = useState("")
    let [proposta, setProposta] = useState("")
    let [tipoProjeto, setTipoProjeto] = useState("")
    const tipoProjetoSelect = ['Selecione o tipo', 'Marketing', 'Evento']
    const [objeto, setObjeto] = useState("")
    let [tipoSelecao, setTipoSelecao] = useState("")
    const tipoSelecaoSelect = ['Selecione o tipo', 'Chamamento', 'Emenda']
    const [programa, setPrograma] = useState("")
    const [recursoConcedente, setRecursoConcedente] = useState("")
    const [contrapartida, setContrapartida] = useState("")
    let [inicioVigencia, setInicioVigencia] = useState("")
    const [terminoVigencia, setTerminoVigencia] = useState("")
    let [inicioExecucao, setInicioExecucao] = useState("")
    const [terminoExecucao, setTerminoExecucao] = useState("")

    const [mensagemNovo, setMensagemNovo] = useState(false)
    const [mensagemAtualizar, setMensagemAtualizar] = useState(false)
    const { id } = useParams()

    const getConvenio = async (id) => {
        const res = await axios.get('http://localhost:9000/api/convenios/' + id)

        return res.data
    }

    const navigate = useNavigate()

    useEffect(() => {

        if (id) {
            getConvenio(id).then((res) => {

                setNome(res.numeroCV)
                setProcesso(res.cnpj)
                
            })
        }
    }, [])

    const submitHandler = async (e) => {

        e.preventDefault();
      
        const convenio = {
            numeroCV: numeroCV,
            objeto: objeto,
            numeroPrograma: programa,
            numeroProposta:proposta,
            numeroProcesso:processo,
            contrapartida: contrapartida,
            recursoConcedente: recursoConcedente,
            tipoDeProjeto: tipoProjeto,
            formaDeSelecao: tipoSelecao,
            responsavel: [],
            inicioVigencia: inicioVigencia,
            terminoVigencia: terminoVigencia,
            dataRealizacaoFim: terminoExecucao,
            dataRealizacaoInicio: inicioExecucao
        }

        if (!id) {
            const res = await axios.post('http://localhost:9000/api/convenios/novo', convenio)

            setMensagemNovo(true)

            setTimeout(() => {
                setMensagemNovo(false)
                
                
            }, 2000)
        } else {
            const res = await axios.patch('http://localhost:9000/api/responsaveis/' + id, convenio)

            setMensagemAtualizar(true)

            setTimeout(() => {
                setMensagemAtualizar(false)
            }, 2000)
        }

    }//submitHandler

    const titulo = (id ? "editar " : "adicionar ") + "convênio"

    return (
        <div className="h-100">
            <Row>
                <Col md="12">
                    <Title text={titulo} />
                </Col>
            </Row>
            <Row >
                <Col>
                    {mensagemNovo && <Message variant="success" text="Novo convênio salvo com sucesso!" />}
                    {mensagemAtualizar && <Message variant="success" text="Convênio atualizado com sucesso!" />}
                </Col>
            </Row>
            <form onSubmit={submitHandler}>
                <Row>
                    <Col>
                        <label htmlFor="numeroCV">Convênio*</label>
                        <input
                            type="text"
                            id="numeroCV"
                            name="numeroCV"
                            onChange={(e) => setNome(e.target.value)}
                            value={numeroCV}
                            required
                        />
                    </Col>
                    <Col>
                        <label htmlFor='processo'>Processo*</label>
                        <input
                            type="text"
                            id="processo"
                            name="processo"
                            onChange={(e) => setProcesso(e.target.value)}
                            value={processo}
                            required
                        />
                    </Col>
                    <Col>
                        <label htmlFor='processo'>Proposta*</label>
                        <input
                            type="text"
                            id="proposta"
                            name="proposta"
                            onChange={(e) => setProposta(e.target.value)}
                            value={proposta}
                            required
                        />
                    </Col>
                    <Col md="auto">

                        <label htmlFor="tipo">Tipo de projeto</label>
                        <select
                            name="tipo"
                            id="tipo"
                            onChange={(e) => setTipoProjeto(e.target.value)}
                            value={tipoProjeto}
                            required
                        >
                            {tipoProjetoSelect.map((data, key) => {
                                return <option key={key} value={data}>{data}</option>
                            })}
                        </select>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <label htmlFor='processo'>Objeto*</label>
                        <input
                            type="text"
                            id="objeto"
                            name="objeto"
                            onChange={(e) => setObjeto(e.target.value)}
                            value={objeto}
                            required
                        />
                    </Col>
                    <Col md="auto">

                        <label htmlFor="tipo">Tipo de Seleção</label>
                        <select
                            name="tipo"
                            id="tipo"
                            onChange={(e) => setTipoSelecao(e.target.value)}
                            value={tipoSelecao}
                        >
                            {tipoSelecaoSelect.map((data, key) => {
                                return <option key={key} value={data}>{data}</option>
                            })}
                        </select>
                    </Col>
                    <Col md={3}>
                        <label htmlFor='programa'>Programa*</label>
                        <input
                            type="text"
                            id="programa"
                            name="programa"
                            onChange={(e) => setPrograma(e.target.value)}
                            value={programa}
                            required
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md="auto">
                    <label htmlFor='recursoConcedente'>Recurso do Concedente*</label>
                        <input
                            type="number"
                            id="recursoConcedente"
                            name="recursoConcedente"
                            onChange={(e) => setRecursoConcedente(e.target.value)}
                            value={recursoConcedente}
                            required
                            step="any"
                            
                        />
                    </Col>
                    <Col md="auto">
                    <label htmlFor='contrapartida'>Contrapartida*</label>
                        <input
                            type="number"
                            id="contrapartida"
                            name="contrapartida"
                            onChange={(e) => setContrapartida(e.target.value)}
                            value={contrapartida}
                            required
                            step="any"
                            
                        />
                    </Col>
                </Row>
                <Row>
                <Col md="auto">
                    <label htmlFor='inicioVigencia'>Início da Vigência*</label>
                        <input
                            type="date"
                            id="inicioVigencia"
                            name="inicioVigencia"
                            onChange={(e) => setInicioVigencia(e.target.value)}
                            value={inicioVigencia}
                            required
                            
                        />
                    </Col>
                    <Col md="auto">
                    <label htmlFor='terminoVigencia'>Término da Vigência*</label>
                        <input
                            type="date"
                            id="terminoVigencia"
                            name="terminoVigencia"
                            onChange={(e) => setTerminoVigencia(e.target.value)}
                            value={terminoVigencia}
                            required
                        />
                    </Col>
                    <Col md="auto">
                    <label htmlFor='InícioExecucao'>Início da Execução</label>
                        <input
                            type="date"
                            id="inicioExecucao"
                            name="inicioExecucao"
                            onChange={(e) => setInicioExecucao(e.target.value)}
                            value={inicioExecucao}
                        />
                    </Col>
                    <Col md="auto">
                    <label htmlFor='terminoExecucao'>Término da Execução</label>
                        <input
                            type="date"
                            id="terminoExecucao"
                            name="terminoExecucao"
                            onChange={(e) => setTerminoExecucao(e.target.value)}
                            value={terminoExecucao}
                        />
                    </Col>
                </Row>


                <div className="d-flex mt-5 justify-content-between">
                    <Link className="btn btn-outline-secondary" to="/convenios">
                        <ArrowBackIosIcon fontSize='small' />
                        Voltar
                    </Link>
                    <Btn className="px-5" type="submit" text="Salvar" />
                </div>
            </form>
        </div>

    )
}

export default ConveniosPage