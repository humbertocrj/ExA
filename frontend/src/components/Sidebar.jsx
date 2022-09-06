import React, { useState } from 'react'
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
        {show?<CloseIcon fontSize="small"/>:<ArrowForwardIcon fontSize="small"/>}
        </div>
      </div>

      <div className={style["sidebar-item"]}>
        <BarChartOutlinedIcon fontSize="large" />
        <span >Dashboard</span>
      </div>

      <div className={style["sidebar-item"]}>
        <HandshakeIcon fontSize="large" />
        <span >Convênios</span>
      </div>

      <div className={style["sidebar-item"]}>
        <HomeWorkIcon fontSize="large" />
        <span >Convenente</span>
      </div>

      <div className={style["sidebar-item"]}>
        <HailIcon fontSize="large" />
        <span >Responsável</span>
      </div>

      <div className={style["sidebar-item"]}>
        <AttachMoneyIcon fontSize="large" />
        <span >Pagamento</span>
      </div>

      <div className={style["sidebar-item"]}>
        <TaskIcon fontSize="large" />
        <span >Licitação</span>
      </div>

    </div>
  )
}

export default Sidebar