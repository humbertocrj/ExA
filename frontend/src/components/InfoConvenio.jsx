
import React, { useState } from 'react'
import { useEffect } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import 'bootstrap/dist/css/bootstrap.css';

import dateFormat from "../utils/date"

const InfoConvenio = (props) => {
 
  return <>
   
    {props.convenio && (
      <div className="border rounded px-3"><Row>
        <Col>
          <label>Convênio</label>
          <p>{props.convenio.numeroCV}</p>
        </Col>
        <Col>
          <label>Processo</label>
          <p>{props.convenio.numeroProcesso}</p>
        </Col>
        <Col>
          <label>Programa</label>
          <p>{props.convenio.numeroPrograma}</p>
        </Col>
      </Row>
        <Row>
          <Col>
            <label>Objeto</label>
            <p>{props.convenio.objeto}</p>
          </Col>
          <Col md="auto">
            <label>Início da vigência</label>
            <p>{dateFormat(props.convenio.inicioVigencia, true)}</p>
          </Col>
          <Col md="auto">
            <label>Término da vigência</label>
            <p>{dateFormat(props.convenio.terminoVigencia, true)}</p>
          </Col>
        </Row></div>)}
  </>
}

export default InfoConvenio