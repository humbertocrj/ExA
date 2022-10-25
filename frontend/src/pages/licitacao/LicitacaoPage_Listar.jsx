import React, { useState } from 'react'
import {
  useNavigate} from "react-router-dom";
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

const PagamentoPage = () => {

  const [licitacoes, setLicitacoes] = useState(null)
  const [modalShow, setModalShow] = useState(false)
  const [convenio, setConvenio] = useState(false)
  const [licitacao, setLicitacao] = useState({ nome: "" })

  const getLicitacoes = async () => {
    const res = await axios.get('http://localhost:9000/api/licitacao')
    const data = await res.data
      
    setLicitacoes(data)


  }
  const navigate = useNavigate()

  const novaLicitacao = () => {
    navigate('/licitacao/novo')
  }
  const detalharPagamento = (e) => {
    const id = e.currentTarget.dataset.id
    navigate('/licitacao/' + id)
  }
  const editarPagamento = (e) => {
    const id = e.currentTarget.dataset.id
    navigate('/licitacao/editar/' + id)

  }
  const confirmaExclusao = async (answer) => {
    if (answer) {
      const res = await axios.delete('http://localhost:9000/api/licitacao/' + licitacao._id)
      const data = await res.data

      setLicitacoes(prev => {
        return prev.filter((r) => {
          return r._id !== data._id
        })
      })
    }
    setLicitacao({ nome: "" })

  }

  const deletarLicitacao = async (e) => {
    const res = await axios.get('http://localhost:9000/api/licitacao/' + e.target.id)
    const data = await res.data
    console.log(data)
    setLicitacao(data)
    setConvenio(data.convenio)
    setModalShow(true)
  }

  useEffect(() => {
    getLicitacoes()
  }, [])


  return (
    <div>

      <Title text="Lista de licitacoes" />
      <Row className="mt-4">
        <Col md={9}></Col>
        <Col md={3} className="d-flex justify-content-end">
          <Btn size="md" className="px-5" text="Novo" onClick={novaLicitacao} />
        </Col>
      </Row>
      {licitacoes && <Table striped bordered hover className="mt-4">
        <thead>
          <tr className="text-center">
            <th>Id</th>
            <th>Convenio</th>
            <th>Objeto</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {licitacoes.map((data, key) => {
            return (<tr className="text-center" key={key}>
              <td>{key + 1}</td>
              <td>{data.convenio.numeroCV}</td>
              <td>{data.convenio.objeto}</td>
              <td>{data.status}</td>
         
              <td style={{ textAlign: 'center' }}>
                <Button data-id={data._id} onClick={detalharPagamento} variant='outline-secondary' size="sm"><VisibilityIcon /></Button>
                <Button data-id={data._id} className="mx-1" variant='outline-secondary' onClick={editarPagamento} size="sm"><EditIcon /></Button>
                <Button id={data._id} onClick={deletarLicitacao} variant='outline-secondary' size="sm">
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
        text={"Gostaria de excluir o processo licitatório do convênio "+convenio.numeroCV}
        answer={confirmaExclusao}
      />

    </div>

  )
}

export default PagamentoPage