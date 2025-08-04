import { BrowserRouter, Routes, Route } from "react-router";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<div>Merhaba</div>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
