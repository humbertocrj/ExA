import React, { useState} from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useNavigate,
  useLocation
} from "react-router-dom";
import Title from '../../components/UI/Title'
 

import Btn from '../../components/UI/Button'
import MyModal from '../../components/UI/MyModal'

import axios from 'axios'
import { useEffect } from 'react'

import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import 'bootstrap/dist/css/bootstrap.css';

import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from 'react-bootstrap/Button';
import { FaTrashAlt } from "react-icons/fa";

const ConveniosPage = () => {

  const [convenios, setConvenios] = useState(null)
  const [modalShow, setModalShow] = useState(false)
  const [deletar, setDeletar] = useState(false)
  const [convenio, setConvenio] = useState({nome:""})
  
  const getConvenios = async () => {
    const res = await axios.get('http://localhost:9000/api/convenios')
    const data = await res.data
    setConvenios(data)

  }
  const navigate = useNavigate()

  const novoConvenio = () => {
    navigate('/convenios/novo')
  }
  const detalharConvenio = (e)=>{
    const id = e.currentTarget.dataset.id
    navigate('/convenios/'+id)
  }
  const editarConvenio = (e) => {
    const id = e.currentTarget.dataset.id
    navigate('/convenios/editar/'+id)
    
  }
  const confirmaExclusao = async (answer) => {
    if (answer) {
      const res = await axios.delete('http://localhost:9000/api/convenios/'+convenio._id)
      const data = await res.data

      setConvenios(prev=> {return prev.filter((r)=>{
        return r._id !== data._id
      })})
    }
    setConvenio({nome:""})

  }

  const deletarConvenio = async (e) => {
    const res = await axios.get('http://localhost:9000/api/convenios/' + e.target.id)
      const data = await res.data
    console.log(data)
    setConvenio(data)
    setModalShow(true)
  }

  useEffect(() => {
    getConvenios()
  }, [])


  return (
    <div>

      <Title text="Lista de convenios" />
      <Row className="mt-4">
        <Col md={9}></Col>
        <Col md={3} className="d-flex justify-content-end">
          <Btn size="md" className="px-5" text="Novo" onClick={novoConvenio} />
        </Col>
      </Row>
      {convenios && <Table striped bordered hover className="mt-4">
        <thead>
          <tr className="text-center">
            <th>Id</th>
            <th>CV</th>
            <th>Proposta</th>
            <th>Processo</th>
            <th>Objeto</th>
            <th>Ação</th>

          </tr>
        </thead>
        <tbody>
          {convenios.map((data, key) => {
            return (<tr  key={key}>
              <td className="text-center">{key + 1}</td>
              <td >{data.numeroCV}</td>
              <td>{data.numeroProposta}</td>
              <td>{data.numeroProcesso}</td>
              <td>{data.objeto}</td>
              <td style={{ textAlign: 'center' }}>
                <Button data-id={data._id} onClick={detalharConvenio} variant='outline-secondary' size="sm"><VisibilityIcon /></Button>
                <Button data-id={data._id} className="mx-1" variant='outline-secondary' onClick={editarConvenio} size="sm"><EditIcon /></Button>
                <Button id={data._id} onClick={deletarConvenio} variant='outline-secondary' size="sm">
                  <DeleteIcon style={{ pointerEvents: "none" }}></DeleteIcon>
                </Button>
              </td>
            </tr>)
          })}
        </tbody>

      </Table>}
          
      <MyModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        backdrop="static"
        title="Confirmação de exclusão"
        text={"Gostaria de excluir "+convenio.numeroCV } 
        answer={confirmaExclusao}
      />

    </div>

  )
}

export default ConveniosPage