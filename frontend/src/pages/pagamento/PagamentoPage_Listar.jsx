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

const PagamentoPage = () => {

  const [pagamentos, setPagamentos] = useState(null)
  const [modalShow, setModalShow] = useState(false)
  const [deletar, setDeletar] = useState(false)
  const [convenente, setConvenente] = useState({nome:""})
  
  const getPagamentos = async () => {
    const res = await axios.get('http://localhost:9000/api/pagamentos')
    const data = await res.data
    setPagamentos(data)
     

  }
  const navigate = useNavigate()

  const novoPagamento = () => {
    navigate('/pagamento/novo')
  }
  const detalharConvenente = (e)=>{
    const id = e.currentTarget.dataset.id
    navigate('/convenente/'+id)
  }
  const editarConvenente = (e) => {
    const id = e.currentTarget.dataset.id
    navigate('/convenente/editar/'+id)
    
  }
  const confirmaExclusao = async (answer) => {
    if (answer) {
      const res = await axios.delete('http://localhost:9000/api/pagamentos/'+convenente.id)
      const data = await res.data

      setPagamentos(prev=> {return prev.filter((r)=>{
        return r._id !== data._id
      })})
    }
    setConvenente({nome:""})

  }

  const deletarConvenente = async (e) => {
    const res = await axios.get('http://localhost:9000/api/pagamentos/' + e.target.id)
      const data = await res.data

    setConvenente(data)
    setModalShow(true)
  }

  useEffect(() => {
    getPagamentos()
  }, [])


  return (
    <div>

      <Title text="Lista de pagamentos" />
      <Row className="mt-4">
        <Col md={9}></Col>
        <Col md={3} className="d-flex justify-content-end">
          <Btn size="md" className="px-5" text="Novo" onClick={novoPagamento} />
        </Col>
      </Row>
      {pagamentos && <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>Id</th>
            <th>Convenio</th>
            <th>Objeto</th>
            <th>Forma de Seleção</th>
            <th>Parcela</th>
            <th>Valor</th>
            <th>Ação</th>

          </tr>
        </thead>
        <tbody>
          {pagamentos.map((data, key) => {
            return (<tr key={key}>
              <td>{key + 1}</td>
              <td>{data.convenio.numeroCV}</td>
              <td>{data.convenio.objeto}</td>
              <td>{data.convenio.formaDeSelecao}</td>
              <td>{data.numeroParcela}</td>
              <td>{data.valor}</td>
              <td style={{ textAlign: 'center' }}>
                <Button data-id={data._id} onClick={detalharConvenente} variant='outline-secondary' size="sm"><VisibilityIcon /></Button>
                <Button data-id={data._id} className="mx-1" variant='outline-secondary' onClick={editarConvenente} size="sm"><EditIcon /></Button>
                <Button id={data._id} onClick={deletarConvenente} variant='outline-secondary' size="sm">
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
        text={"Gostaria de excluir "+convenente.nome } 
        answer={confirmaExclusao}
      />

    </div>

  )
}

export default PagamentoPage