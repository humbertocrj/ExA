import {Routes, Route} from 'react-router-dom'
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";

import Convenente from "./pages/ConvenentePage";
import Convenios from "./pages/ConveniosPage";
import Dashboard from "./pages/DashboardPage";
import Licitacao from "./pages/LicitacaoPage";
import Pagamento from "./pages/PagamentoPage";
import Responsavel from "./pages/ResponsavelPage";

function App() {
  return (
    <div className="app">
      <Header />
      <div className="content">
        <Sidebar />
        <Main>
          <Routes>
            <Route path="/" element={ <Dashboard />}/>
            <Route path="/convenios" element={ <Convenios />}/>
            <Route path="convenente" element={ <Convenente />}/>
            <Route path="pagamento" element={ <Pagamento />}/>
            <Route path="licitacao" element={ <Licitacao />}/>
            <Route path="responsavel" element={ <Responsavel />}/>
          </Routes>

        </Main>
      </div>
    </div>
  );
}

export default App;
