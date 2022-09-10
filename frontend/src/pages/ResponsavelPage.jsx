import React, { useState } from 'react'
import Title from '../components/UI/Title'
import style from './ResponsavelPage.module.css'

import Input from '../components/UI/Input'
import Fieldset from '../components/UI/Fieldset'
import Select from '../components/UI/Select'
import Button from '../components/UI/Button'

import axios from 'axios'
import { useEffect } from 'react'

const ResponsavelPage = () => {
  let nome = ""
  let email = ""
  let telefoneTrabalho = ""
  let telefoneFixo = ""
  let telefonePessoal = ""
  let tipoResponsavel = ""

  const [mostrarForm, setMostrarForm] = useState(false)

  const [responsaveis, setResponsaveis] = useState(null)

  const onChangeNome = (value) => {
    nome = value
  }

  const onChangeEmail = (value) => {
    email = value
  }

  const onChangeTelefoneTrabalho = (value) => {
    telefoneTrabalho = value
  }

  const onChangeTelefoneFixo = (value) => {
    telefoneFixo = value
  }

  const onChangeTelefonePessoal = (value) => {
    telefonePessoal = value
  }
  const onChangeTipo = (value) =>{
    tipoResponsavel = value

  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const responsavel = {
      nome: nome,
      email: email,
      tipo:tipoResponsavel,
      telefoneTrabalhoCel: telefoneTrabalho,
      telefoneTrabalhoFixo: telefoneFixo,
      telefonePessoal: telefonePessoal
    }

    const res = await axios.post('http://localhost:9000/api/responsaveis/novo', responsavel)
    console.log(res)
  }

  const toggleExibirForm = () => {
    setMostrarForm(!mostrarForm)
  }

  const getResponsaveis = async () => {
    const res = await axios.get('http://localhost:9000/api/responsaveis')
    const data = await res.data
    setResponsaveis(data)
  }

  useEffect(() => {
    getResponsaveis()
  }, [])

  return (
    <div>
      <Title text="Responsável" />

      {!mostrarForm && <Button text="Novo" onClick={toggleExibirForm} />}
      {mostrarForm && <form className={style["form-container"]} onSubmit={submitHandler}>
        <div className={style.grid}>

          <Input
            label="Nome*"
            type="text"
            id="nome"
            nome="nome"
            onChange={onChangeNome}
            required
          />

          <Input
            label="E-mail*"
            type="email"
            id="email"
            nome="email"
            onChange={onChangeEmail}
            required
          />


          <Select
            name="tipo"
            id="tipo"
            label="Tipo de responsável*"
            data={['Selecione o tipo','Técnico do Ministério', 'Técnico do convenente', 'Gestor convenente']}
            onChange={onChangeTipo}
            required
          />

        </div>
        <Fieldset legend="Telefone">

          <Input
            label="Celular - trabalho)"
            type="tel"
            id="telefoneCelularTrabalho"
            nome="telefoneCelularTrabalho"
            onChange={onChangeTelefoneTrabalho}
          />
          <Input
            label="Fixo - Trabalho*"
            type="tel"
            id="telefoneFixoTrabalho"
            nome="telefoneFixoTrabalho"
            onChange={onChangeTelefoneFixo}
            required
          />
          <Input
            label="Pessoal"
            type="tel"
            id="telefonePessoal"
            nome="telefonePessoal"
            onChange={onChangeTelefonePessoal}
          />
        </Fieldset>

        <div className={style.right}>

          <Button type="submit" text="Salvar" />
        </div>
      </form>}
      {mostrarForm && <Button text="Cancelar" onClick={toggleExibirForm} />}

      <table className={style.table}>
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Telefone trabalho</th>
            <th>Telefone fixo</th>
            <th>Celular pessoal</th>
          </tr>

        </thead>
        <tbody>
          {
            responsaveis && responsaveis.map((r, key) => {
              return <tr key={key}><td>{r.tipo}</td>
                <td>{r.nome}</td>
                <td>{r.email}</td>
                <td>{r.telefoneTrabalhoCel}</td>
                <td>{r.telefoneTrabalhoFixo}</td>
                <td>{r.telefonePessoal}</td>
              </tr>


            })}
        </tbody>

      </table>
    </div>

  )
}

export default ResponsavelPage