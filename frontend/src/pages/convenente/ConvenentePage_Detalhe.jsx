import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import Title from '../../components/UI/Title'

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import axios from 'axios';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';


const ConvenenteDetalhe = () => {
  const [convenente, setConvenente] = useState([])
  const params = useParams()

  const getConvenente = async (id) => {
    const res = await axios.get('http://localhost:9000/api/convenentes/'+id)
 
    setConvenente(res.data)
  }

  useEffect(() => {
    getConvenente(params.id).then(() => {

    })
  }, [])

  return (
    <div>
      <Title text="Detalhes do Convenente" />

      <Row>
        <Col>
          <label>Nome:</label>
          <p>{convenente.nome}</p>
        </Col>
        <Col>
          <label>UF:</label>
          <p>{convenente.estado} - {convenente.sigla}</p>
        </Col>
        <Col>
          <label>CNPJ:</label>
          <p>{convenente.cnpj}</p>
        </Col>
      </Row>
      <Row>
        
        <Col>
          <label>Região:</label>
          <p>{convenente.regiao}</p>
        </Col>
        
      </Row>
      

      <div className="d-flex mt-5 justify-content-between">
        <Link className="btn btn-outline-secondary" to="/convenente">
          <ArrowBackIosIcon fontSize='small' />
          Voltar
        </Link>
      </div>

    </div>
  )
}

export default ConvenenteDetalhe