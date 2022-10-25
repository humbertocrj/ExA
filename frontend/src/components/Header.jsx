import React from 'react'
import style from './Header.module.css'
import LogoutIcon from '@mui/icons-material/Logout';

const Header = (props) => {
  
  const logout = ()=>{
    props.setLogged(false)
  }

  return (
    <div className={style.header}>
      <div className={style.logo}><span>Ex</span><span><sub>A</sub></span></div>
      <div className={style.menu}>
       {props.logged && 
       <a onClick={logout} href="/" >
        <LogoutIcon />
        </a>}
        </div>

    </div>
  )
}

export default Header