
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
//@ts-ignore
import Editor from "./pages/Editor.js";
import SetTitle from "./pages/SetTitle"
import Home from './pages/Home';

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}>
      </Route>
      <Route path='/app' element={<Editor/>}/>
      <Route path="/set-title" element={<SetTitle/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
