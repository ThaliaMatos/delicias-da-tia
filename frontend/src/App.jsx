import Header from "./components/Header/index";
import './App.css'
import Footer from "./components/Footer";

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1">
        <h1>Seja bem vindo ao nosso site</h1>
      </main>
      <Footer />
    </div>
  );
}

export default App;
