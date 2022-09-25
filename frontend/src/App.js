import {Routes, Route} from 'react-router-dom'
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";

import ConvenenteListar from "./pages/convenente/ConvenentePage_Listar";
import ConvenenteNovo from "./pages/convenente/ConvenentePage_Novo"
import ConvenenteDetalhe from "./pages/convenente/ConvenentePage_Detalhe"

import Convenios from "./pages/convenios/ConveniosPage";
import Dashboard from "./pages/dashboard/DashboardPage";
import Licitacao from "./pages/licitacao/LicitacaoPage";
import Pagamento from "./pages/pagamento/PagamentoPage";
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
            <Route path="/convenios" element={ <Convenios />}/>

            <Route path="/convenente" element={ <ConvenenteListar />}/>
            <Route path="/convenente/novo" element={ <ConvenenteNovo />}/>
            <Route path="/convenente/editar/:id" element={ <ConvenenteNovo />}/>
            <Route path="/convenente/:id" element={ <ConvenenteDetalhe />}/>

            <Route path="/pagamento" element={ <Pagamento />}/>
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
