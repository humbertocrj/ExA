import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import { useState } from "react";

import ConvenenteListar from "./pages/convenente/ConvenentePage_Listar";
import ConvenenteNovo from "./pages/convenente/ConvenentePage_Novo";
import ConvenenteDetalhe from "./pages/convenente/ConvenentePage_Detalhe";

import ConvenioListar from "./pages/convenios/ConveniosPage_Listar";
import ConvenioNovo from "./pages/convenios/ConveniosPage_Novo";
import ConvenioDetalhe from "./pages/convenios/ConveniosPage_Detalhe";

import Dashboard from "./pages/dashboard/DashboardPage";

import LicitacaoListar from "./pages/licitacao/LicitacaoPage_Listar";
import LicitacaoNovo from "./pages/licitacao/LicitacaoPage_Novo";
import LicitacaoDetalhe from "./pages/licitacao/LicitacaoPage_Detalhe";

import PagamentoListar from "./pages/pagamento/PagamentoPage_Listar";
import PagamentoNovo from "./pages/pagamento/PagamentoPage_Novo";
import PagamentoDetalhe from "./pages/pagamento/PagamentoPage_Detalhe";

import ResponsavelListar from "./pages/responsavel/ResponsavelPage_Listar";
import ResponsavelNovo from "./pages/responsavel/ResponsavelPage_Novo";
import ResponsavelDetalhe from "./pages/responsavel/Responsavel_Detalhe";
import ResponsavelConvenio from "./pages/responsavel/ResponsavelPage_RelConvenio";

import Login from "./pages/Login";

function App() {
  const [logged, setLogged] = useState(false);

  return (
    <div className="app">
      {!logged ? (
        <Login />
      ) : (
        <>
          <Header logged={logged} />
          <div className="content">
            : (
            <Main>
              <Sidebar />
              <Routes>
                <Route path="/convenios" element={<ConvenioListar />} />
                <Route path="/convenios/novo" element={<ConvenioNovo />} />
                <Route
                  path="/convenios/editar/:id"
                  element={<ConvenioNovo />}
                />
                <Route path="/convenios/:id" element={<ConvenioDetalhe />} />

                <Route path="/convenente" element={<ConvenenteListar />} />
                <Route path="/convenente/novo" element={<ConvenenteNovo />} />
                <Route
                  path="/convenente/editar/:id"
                  element={<ConvenenteNovo />}
                />
                <Route path="/convenente/:id" element={<ConvenenteDetalhe />} />

                <Route path="/pagamento" element={<PagamentoListar />} />
                <Route path="/pagamento/novo" element={<PagamentoNovo />} />
                <Route
                  path="/pagamento/editar/:id"
                  element={<PagamentoNovo />}
                />
                <Route path="/pagamento/:id" element={<PagamentoDetalhe />} />

                <Route path="/licitacao" element={<LicitacaoListar />} />
                <Route path="/licitacao/novo" element={<LicitacaoNovo />} />
                <Route
                  path="/licitacao/editar/:id"
                  element={<LicitacaoNovo />}
                />
                <Route path="/licitacao/:id" element={<LicitacaoDetalhe />} />

                <Route path="/responsavel" element={<ResponsavelListar />} />
                <Route path="/responsavel/novo" element={<ResponsavelNovo />} />
                <Route
                  path="/responsavel/editar/:id"
                  element={<ResponsavelNovo />}
                />
                <Route
                  path="/responsavel/:id"
                  element={<ResponsavelDetalhe />}
                />
                <Route
                  path="/responsavel/relacionar/:id"
                  element={<ResponsavelConvenio />}
                />

                <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
            </Main>
          </div>{" "}
        </>
      )}
    </div>
  );
}

export default App;
