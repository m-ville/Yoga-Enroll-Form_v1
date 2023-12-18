import { BrowserRouter, Route, Routes } from "react-router-dom";
import EnrollForm from "./Pages/EnrollForm"
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<EnrollForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
