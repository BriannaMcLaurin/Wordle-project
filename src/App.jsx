import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Container} from '@mui/material';
import {Wordle} from "./pages/wordle";
import { NoContent } from "./pages/NoContent";


function App() {

  return (
    <Container maxWidth="md">
      <h1>Wordle</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Wordle />} />
          <Route path="/startGame" element />
          <Route path="*" element={<NoContent />} />
        </Routes>
      </BrowserRouter>
     
    </Container>
  );
}

export default App;
