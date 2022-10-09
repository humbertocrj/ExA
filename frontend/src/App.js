import {Routes, Route} from 'react-router-dom'
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";

import ConvenenteListar from "./pages/convenente/ConvenentePage_Listar";
import ConvenenteNovo from "./pages/convenente/ConvenentePage_Novo"
import ConvenenteDetalhe from "./pages/convenente/ConvenentePage_Detalhe"

import ConvenioListar from "./pages/convenios/ConveniosPage_Listar";
import ConvenioNovo from "./pages/convenios/ConveniosPage_Novo"
import ConvenioDetalhe from "./pages/convenios/ConveniosPage_Detalhe"

import Dashboard from "./pages/dashboard/DashboardPage";

import Licitacao from "./pages/licitacao/LicitacaoPage";

import PagamentoListar from "./pages/pagamento/PagamentoPage_Listar";
import PagamentoNovo from "./pages/pagamento/PagamentoPage_Novo";
import PagamentoDetalhe from './pages/pagamento/PagamentoPage_Detalhe'

import ResponsavelListar from "./pages/responsavel/ResponsavelPage_Listar";
import ResponsavelNovo from "./pages/responsavel/ResponsavelPage_Novo";
import ResponsavelDetalhe from './pages/responsavel/Responsavel_Detalhe';

function App() {
  return (
    <div className="app">
      <Header />
      <div className="content">
        <Sidebar />
        <Main>
          <Routes>
            <Route path="/convenios" element={ <ConvenioListar />}/>
            <Route path="/convenios/novo" element={ <ConvenioNovo />}/>
            <Route path="/convenios/editar/:id" element={ <ConvenioNovo />}/>
            <Route path="/convenios/:id" element={ <ConvenioDetalhe />}/>

            <Route path="/convenente" element={ <ConvenenteListar />}/>
            <Route path="/convenente/novo" element={ <ConvenenteNovo />}/>
            <Route path="/convenente/editar/:id" element={ <ConvenenteNovo />}/>
            <Route path="/convenente/:id" element={ <ConvenenteDetalhe />}/>

            <Route path="/pagamento" element={ <PagamentoListar />}/>
            <Route path="/pagamento/novo" element={ <PagamentoNovo />}/>
            <Route path="/pagamento/editar/:id" element={ <PagamentoNovo />}/>
            <Route path="/pagamento/:id" element={ <PagamentoDetalhe />}/>

            <Route path="/licitacao" element={ <Licitacao />}/>

            <Route path="/responsavel" element={ <ResponsavelListar />}/>
            <Route path="/responsavel/novo" element={ <ResponsavelNovo />}/>
            <Route path="/responsavel/editar/:id" element={ <ResponsavelNovo />}/>
            <Route path="/responsavel/:id" element={ <ResponsavelDetalhe />}/>
            <Route path="/" element={ <Dashboard />}/>

          </Routes>

        </Main>
      </div>
    </div>
  );
}

export default App;
