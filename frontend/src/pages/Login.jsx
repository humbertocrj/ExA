import React, { useState } from 'react'
import style from './Login.module.css'
import axios from 'axios'
import Mensagem from '../components/UI/Message'

const Login = (props) => {
    const [usuario, setUsuario] = useState("")
    const [senha, setSenha] = useState("")
    const [mensagem, setMensagem] = useState("")
    

    const autenticar = async (e) => {
        e.preventDefault()

        const res = await axios.post('http://localhost:9000/api/usuario/autenticar', {
            email: usuario,
            senha: senha
        })

        if (res.data.mensagemErro) {
            setMensagem(res.data.mensagemErro)

            setTimeout(() => {
                setMensagem("")
            }, 2000)

        }else{
            props.autenticado(true)
        }
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
                    <input
                        type="text"
                        id="usuario"
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                    />

                    <label htmlFor="senha">Senha:</label>
                    <input
                        type="password"
                        id="senha"
                        value={senha}
                        onChange={(e) => { setSenha(e.target.value) }} />
                    <button className="btn btn-warning" type="submit">Entrar</button>
                    <div className="w-100 mt-2">
                    {mensagem && <Mensagem variant="danger" text="Usuário e/ou senha errado(s)!!! " />}
                </div>
                </form>


            </div>
        </div>
    )
}

export default Login