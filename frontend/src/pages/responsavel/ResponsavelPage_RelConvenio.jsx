import React, { useState } from 'react'
import { useNavigate, useParams, Link } from "react-router-dom";
import Title from '../../components/UI/Title'


import Btn from '../../components/UI/Button'
import MyModal from '../../components/UI/MyModal'

import axios from 'axios'
import { useEffect } from 'react'

import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import 'bootstrap/dist/css/bootstrap.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import LinkIcon from "@mui/icons-material/Check";
import LinkOff from "@mui/icons-material/Cancel";


import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from 'react-bootstrap/Button';
import { FaTrashAlt } from "react-icons/fa";

const ConveniosPage = () => {

    const [convenios, setConvenios] = useState(null)
    const [modalShow, setModalShow] = useState(false)
    const [deletar, setDeletar] = useState(false)
    const [convenio, setConvenio] = useState({ nome: "" })
    const [responsavel, setResponsavel] = useState("")
    
    const params = useParams()

    const getConvenios = async () => {
        const res = await axios.get('http://localhost:9000/api/convenios')
        const data = await res.data
        setConvenios(data)
    }
    const navigate = useNavigate()

    const novoConvenio = () => {
        navigate('/convenios/novo')
    }
    const detalharConvenio = (e) => {
        const id = e.currentTarget.dataset.id
        navigate('/convenios/' + id)
    }
    const editarConvenio = (e) => {
        const id = e.currentTarget.dataset.id
        navigate('/convenios/editar/' + id)

    }
    const confirmaExclusao = async (answer) => {
        if (answer) {
            const res = await axios.delete('http://localhost:9000/api/convenios/' + convenio._id)
            const data = await res.data

            setConvenios(prev => {
                return prev.filter((r) => {
                    return r._id !== data._id
                })
            })
        }
        setConvenio({ nome: "" })

    }

    const deletarConvenio = async (e) => {
        const res = await axios.get('http://localhost:9000/api/convenios/' + e.target.id)
        const data = await res.data

        setConvenio(data)
        setModalShow(true)
    }

    const getResponsavel = async (id) => {
        const res = await axios.get('http://localhost:9000/api/responsaveis/' + id)
        setResponsavel(res.data)
    }
    const vincular = async (e) => {
        const pos = e.currentTarget.dataset.pos
        let convenio = convenios[pos]
        convenio.responsavel.push(params.id)
        const res = await axios.patch('http://localhost:9000/api/convenios/' + convenio._id, convenio)
       
        setConvenios((prev)=>{
           return prev.map(item=>{
                if(item._id ===convenio._id){
                    item.responsavel = convenio.responsavel
                }
                return item
            })
        })
    }

    const desvincular = async (e) => {
        const pos = e.currentTarget.dataset.pos

        let conv = convenios[pos]
        conv.responsavel = conv.responsavel.filter((item) => {

            return item !== params.id
        })

        const res = await axios.patch('http://localhost:9000/api/convenios/' + conv._id, conv)
       
         setConvenios((prev)=>{
            return prev.map(value=>{
                if(value._id ==conv._id){
                    value.responsavel = conv.responsavel
                }
                return value
            })
         })       
    }
    const estaVinculado = (id, lista) => {

        return lista ? lista.includes(id) : false
    }
    useEffect(() => {
        getConvenios()
        getResponsavel(params.id)
    }, [])


    return (
        <div>

            <Title text="Relacionar o responsável aos convênios" />
            <div>
                <Row>
                    <Col>
                        <label>Nome:</label>
                        <p>{responsavel.nome}</p>
                    </Col>
                    <Col>
                        <label>E-mail:</label>
                        <p>{responsavel.email}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <label>Telefone Celular de Trabalho:</label>
                        <p>{responsavel.telefoneTrabalhoCel}</p>
                    </Col>
                    <Col>
                        <label>Telefone Fixo do Trabalho:</label>
                        <p>{responsavel.telefoneTrabalhoFixo}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <label>Telefone Celular Pessoal:</label>
                        <p>{responsavel.telefonePessoal}</p>
                    </Col>

                </Row>
            </div>
            {convenios && <Table striped bordered hover className="mt-4">
                <thead>
                    <tr className="text-center">
                        <th>Id</th>
                        <th>CV</th>
                        <th>Objeto</th>
                        <th>Situação</th>
                        <th>Ação</th>

                    </tr>
                </thead>
                <tbody>
                    {convenios.map((data, key) => {
                        return (<tr key={key}>
                            <td className="text-center">{key + 1}</td>
                            <td >{data.numeroCV}</td>
                            <td>{data.objeto}</td>
                            <td className="text-center">{estaVinculado(params.id, data.responsavel) ? "Vinculado" : "Não Vinculado"}</td>
                            <td style={{ textAlign: 'center' }}>
                                <Button
                                    data-pos={key}
                                    data-id={data._id}
                                    className="mx-1"
                                    variant='outline-secondary'
                                    onClick={vincular}
                                    size="sm"
                                    disabled={estaVinculado(params.id, data.responsavel)}
                                >
                                    <LinkIcon
                                    style={{ 
                                        pointerEvents: "none", 
                                        color: !estaVinculado(params.id, data.responsavel)?"#267ab2":"gray"}}
                                     />
                                </Button>
                                <Button
                                    data-pos={key}
                                    id={data._id}
                                    onClick={desvincular}
                                    variant='outline-secondary'
                                    size="sm"
                                    disabled={!estaVinculado(params.id, data.responsavel)}>
                                    <LinkOff 
                                    style={{ 
                                        pointerEvents: "none", 
                                        color: estaVinculado(params.id, data.responsavel)?"#267ab2":"gray"}}
                                    ></LinkOff>
                                </Button>
                            </td>
                        </tr>)
                    })}
                </tbody>

            </Table>}
            <div className="d-flex mt-5 justify-content-between">
          <Link className="btn btn-outline-secondary" to="/responsavel">
            <ArrowBackIosIcon fontSize='small' />
            Voltar
          </Link>
          <Btn className="px-5" type="submit" text="Salvar" />
        </div>

            <MyModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                backdrop="static"
                title="Confirmação de exclusão"
                text={"Gostaria de excluir " + convenio.numeroCV}
                answer={confirmaExclusao}
            />

        </div>

    )
}

export default ConveniosPage