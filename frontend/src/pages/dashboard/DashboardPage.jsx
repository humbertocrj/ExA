import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import RecursoConvenioAno from '../../components/Charts/RecursoConvenioAno'
import RecursoPorTipoProjeto from '../../components/Charts/RecursoPorTipoProjeto'
import LicitacaoStatus from '../../components/Charts/LicitacaoStatus'

import Table from 'react-bootstrap/Table';

import style from './Dashboard.module.css'
import Title from '../../components/UI/Title'
import axios from 'axios'
import Card from '../../components/UI/Card'

import { floatToCurrency } from '../../utils/currency'

import Button from 'react-bootstrap/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';


const DashboardPage = () => {
  const [data, setData] = useState()

  const getData= async (e) => {
    const res = await axios.get('http://localhost:9000/api/dashboard/')
    const data = await res.data
    setData(data)
  }
  
  const navigate = useNavigate()


  useEffect(()=>{
  
    getData()
  },[])

  const detalharConvenio = (e) => {
    const id = e.currentTarget.dataset.id
    navigate('/convenios/' + id)
  }

  return (
    <div className="main">
      <Title text="Dashboard" />
      <h5>Pendências</h5>
      <div className={style.cards}>
            <Card title={data &&data.pagamentosPendentes[0].contagem} subtitle="Pagamentos pendentes" color="#153e5c" />
            <Card title={data &&floatToCurrency(data.pagamentosPendentes[0].total)}   subtitle="Total a ser pago" color="#20a8d8"/>
            <Card title="4"   subtitle="Licitações em aberto"color="#ffce42" />
      </div>
      <h5>Análise de Recursos</h5>
      <div className={style.dashboard}>
        <div className={style["chart-container"]}>
          <h6>Recurso alocado por ano</h6>
          <RecursoConvenioAno cor="#ffce42" data={data && data.recursoPorAno} />
        </div>
        <div className={style["chart-container"]}>
          <h6>Recurso alocado em marketing</h6>
          <RecursoPorTipoProjeto cor="#153e5c" tipo="Marketing" data={data && data.recursoPorTipoProjeto.filter((item)=>{return item._id.tipo==='Marketing'})} />
        </div>
        <div className={style["chart-container"]}>
          <h6>Recurso alocado em eventos</h6>
          <RecursoPorTipoProjeto cor="#20a8d8" tipo="Marketing" data={data && data.recursoPorTipoProjeto.filter((item)=>{return item._id.tipo==='Evento'})} />
        </div>
      </div>

      <h5>Convênios Vigentes</h5>
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr className="text-center">
            <th>Id</th>
            <th>CV</th>
            <th>Proposta</th>
            <th>Processo</th>
            <th>Objeto</th>
            <th>Detalhar</th>
          </tr>
        </thead>
        <tbody>
          
          {data && data.conveniosVigentes.map((data, key) => {
            return (<tr key={key}>
              <td className="text-center">{key + 1}</td>
              <td >{data.numeroCV}</td>
              <td>{data.numeroProposta}</td>
              <td>{data.numeroProcesso}</td>
              <td>{data.objeto}</td>
              <td>  <Button data-id={data._id} onClick={detalharConvenio} variant='outline-secondary' size="sm"><VisibilityIcon /></Button></td>
            </tr>)
          })}
        </tbody>

      </Table>
    </div>
  )
}

export default DashboardPage

