import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import RecursoConvenioAno from '../../components/Charts/RecursoConvenioAno'
import RecursoPorTipoProjeto from '../../components/Charts/RecursoPorTipoProjeto'
import LicitacaoStatus from '../../components/Charts/LicitacaoStatus'

import style from './Dashboard.module.css'
import Title from '../../components/UI/Title'
import axios from 'axios'

const DashboardPage = () => {
  const [data, setData] = useState()

  const getData= async (e) => {
    const res = await axios.get('http://localhost:9000/api/dashboard/')
    const data = await res.data
    setData(data)
    console.log(data.recursoPorTipoProjeto.filter((item)=>{return item._id.tipo==='Marketing'}))
  }
  


  useEffect(()=>{
  
    getData()
  },[])

  return (
    <div className="main">
      <Title text="Dashboard" />
      <h5>Análise de Recursos</h5>
      <div className={style.dashboard}>
        <div className={style["chart-container"]}>
          <h6>Recurso alocado por ano</h6>
          <RecursoConvenioAno data={data && data.recursoPorAno} />
        </div>
        <div className={style["chart-container"]}>
          <h6>Recurso alocado em marketing</h6>
          <RecursoPorTipoProjeto cor="green" tipo="Marketing" data={data && data.recursoPorTipoProjeto.filter((item)=>{return item._id.tipo==='Marketing'})} />
        </div>
        <div className={style["chart-container"]}>
          <h6>Recurso alocado em eventos</h6>
          <RecursoPorTipoProjeto cor="red" tipo="Marketing" data={data && data.recursoPorTipoProjeto.filter((item)=>{return item._id.tipo==='Evento'})} />
        </div>
      </div>

      <h5>Procedimento Licitatório</h5>
      <div className={style.dashboard}>
        <div className={style["chart-container"]}>
          <h6>Recurso alocado por ano</h6>
          <LicitacaoStatus />
        </div>
    
      </div>
    </div>
  )
}

export default DashboardPage

