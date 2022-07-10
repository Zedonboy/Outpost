
import {
  HashRouter,
  Routes,
  Route,
} from "react-router-dom";
//@ts-ignore
import Editor from "./pages/Editor.js";
import SetTitle from "./pages/SetTitle"
import Home from './pages/Home';

function App() {

  return (
    <HashRouter>
    <Routes>
      <Route path='/' element={<Home/>}>
      </Route>
      <Route path='/app' element={<Editor/>}/>
      <Route path="/set-title" element={<SetTitle/>}/>
    </Routes>
    </HashRouter>
  )
}

export default App
