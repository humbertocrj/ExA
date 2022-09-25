import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import Title from '../../components/UI/Title'

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import axios from 'axios';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';


const ResponsavelDetalhe = () => {
  const [responsavel, setResponsavel] = useState([])
  const params = useParams()

  const getResponsavel = async (id) => {
    const res = await axios.get('http://localhost:9000/api/responsaveis/'+id)
    

    setResponsavel(res.data)
  }

  useEffect(() => {
    getResponsavel(params.id).then(() => {

    })
  }, [params.id])

  return (
    <div>
      <Title text="Detalhes do Responsável" />

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

      <div className="d-flex mt-5 justify-content-between">
        <Link className="btn btn-outline-secondary" to="/responsavel">
          <ArrowBackIosIcon fontSize='small' />
          Voltar
        </Link>
      </div>

    </div>
  )
}

export default ResponsavelDetalhe