import React from 'react'
import style from './Login.module.css'

const Login = () => {
    const autenticar = (e) => {
        e.preventDefault()

    }
    return (
        <div className={style.container}>
            <div className={style.leftContent}>

                <h1>Seja Bem-Vindo ao</h1>
                <div className={style.logo}>Ex<sub>A</sub></div>
                <p>Sistema de apoio ao acompanhamento e
                    monitoramento da execução de convênios</p>
            </div>
            <div className={style.rightContent}>
                
                    <h1>Faça seu login</h1>
                
                <form onSubmit={autenticar}>
                    <label htmlFor="usuario">Usuário:</label>
                    <input type="text" id="usuario" />
                    <label htmlFor="senha">Senha:</label>
                    <input type="password" id="usuario" />
                    <button className="btn btn-warning" type="submit">Entrar</button>
                </form>
            </div>
        </div>
    )
}

export default Login