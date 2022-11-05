import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import style from './Sidebar.module.css'
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import HandshakeIcon from '@mui/icons-material/Handshake';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import HailIcon from '@mui/icons-material/Hail';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TaskIcon from '@mui/icons-material/Task';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Sidebar = (props) => {

  const [show, setShow] = useState(false)
  const sidebarStyle = style.sidebar + " " + (show ? style.show : style.hide)
  const toggleButtonStyle = style.toggle
  const toggleShow = () => {
    setShow(!show)
  }

  return (
    <div className={sidebarStyle}>
      <div className={toggleButtonStyle} onClick={toggleShow}>
        <div className={style["toggle-icon"]}>
          {show ? <CloseIcon fontSize="small" /> : <ArrowForwardIcon fontSize="small" />}
        </div>
      </div>

      
        <Link className={style["sidebar-item"]} to="/">
          <BarChartOutlinedIcon fontSize="large" />
          <span >Dashboard</span>
        </Link>
      
        <Link className={style["sidebar-item"]} to="convenios">
          <HandshakeIcon fontSize="large" />
          <span>Convenios</span>
        </Link>

      <Link to="convenente" className={style["sidebar-item"]}>
        <HomeWorkIcon fontSize="large" />
        <span >Convenente</span>
      </Link>

      <Link to="responsavel" className={style["sidebar-item"]}>
        <HailIcon fontSize="large" />
        <span >Responsável</span>
      </Link>

      <Link to="Pagamento" className={style["sidebar-item"]}>
        <AttachMoneyIcon fontSize="large" />
        <span >Pagamento</span>
      </Link>

      <Link to="licitacao" className={style["sidebar-item"]}>
        <TaskIcon fontSize="large" />
        <span >Licitação</span>
      </Link>

    </div>
  )
}

export default Sidebar