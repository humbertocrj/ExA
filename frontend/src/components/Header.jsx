import React from 'react'
import style from './Header.module.css'
import LogoutIcon from '@mui/icons-material/Logout';

const Header = (props) => {
  return (
    <div className={style.header}>
      <div className={style.logo}><span>Ex</span><span><sub>A</sub></span></div>
      <div className={style.menu}>
        <a href="/" >
        <LogoutIcon />
        </a>
        </div>

    </div>
  )
}

export default Header