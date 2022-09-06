import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";

function App() {
  return (
    <div className="container">
      <Header />
      <div className="content">
        <Sidebar />
        <Main>
          asdf
        </Main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
