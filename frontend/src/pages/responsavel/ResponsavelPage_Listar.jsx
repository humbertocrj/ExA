import React, { useState } from 'react'
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
import style from './ResponsavelPage.module.css'

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
import PersonAddIcon from '@mui/icons-material/GroupAdd';

import Button from 'react-bootstrap/Button';
import { FaTrashAlt } from "react-icons/fa";

const ResponsavelPage = () => {

  const [responsaveis, setResponsaveis] = useState(null)
  const [modalShow, setModalShow] = useState(false)
  const [deletar, setDeletar] = useState(false)
  const [responsavel, setReponsavel] = useState({ nome: "" })

  const getResponsaveis = async () => {
    const res = await axios.get('http://localhost:9000/api/responsaveis')
    const data = await res.data
    setResponsaveis(data)

  }
  const navigate = useNavigate()

  const novoResponsavel = () => {
    navigate('/responsavel/novo')
  }
  const detalharResponsavel = (e) => {
    const id = e.currentTarget.dataset.id
    navigate('/responsavel/' + id)
  }
  const editarResponsavel = (e) => {
    const id = e.currentTarget.dataset.id
    navigate('/responsavel/editar/' + id)

  }
  const confirmaExclusao = async (answer) => {
    if (answer) {
      const res = await axios.delete('http://localhost:9000/api/responsaveis/' + responsavel._id)
      const data = await res.data

      setResponsaveis(prev => {
        return prev.filter((r) => {
          return r._id != data._id
        })
      })
    }
    setReponsavel({ nome: "" })

  }

  const deletarResponsavel = async (e) => {
    const res = await axios.get('http://localhost:9000/api/responsaveis/' + e.target.id)
    const data = await res.data

    setReponsavel(data)
    setModalShow(true)
  }

  const vincularConvenio = (e)=>{
    const id = e.currentTarget.dataset.id
    navigate('/responsavel/relacionar/' + id)
  }
  useEffect(() => {
    getResponsaveis()
  }, [])


  return (
    <div>

      <Title text="Lista de responsáveis" />
      <Row className="mt-4">
        <Col md={9}></Col>
        <Col md={3} className="d-flex justify-content-end">
          <Btn size="md" className="px-5" text="Novo" onClick={novoResponsavel} />
        </Col>
      </Row>
      {responsaveis && <Table className="mt-4" striped bordered hover >
        <thead>
          <tr className="text-center">
            <th>Id</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Tipo</th>
            <th>Ação</th>

          </tr>
        </thead>
        <tbody>
          {responsaveis.map((data, key) => {
            return (<tr key={key}>
              <td className="text-center">{key + 1}</td>
              <td>{data.nome}</td>
              <td>{data.email}</td>
              <td>{data.tipo}</td>
              <td style={{ textAlign: 'center' }}>
                <Button data-id={data._id} className="m-1" onClick={vincularConvenio} variant='outline-secondary' size="sm"><PersonAddIcon /></Button>
                <Button data-id={data._id} onClick={detalharResponsavel} variant='outline-secondary' size="sm"><VisibilityIcon /></Button>
                <Button data-id={data._id} className="m-1" variant='outline-secondary' onClick={editarResponsavel} size="sm"><EditIcon /></Button>
                <Button id={data._id} onClick={deletarResponsavel} variant='outline-secondary' size="sm">
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
        text={"Gostaria de excluir " + responsavel.nome}
        answer={confirmaExclusao}
      />

    </div>

  )
}

export default ResponsavelPage