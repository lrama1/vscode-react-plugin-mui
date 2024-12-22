
import { Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './features/home/Home';
import {{domainName}}List from "./features/{{domainCamelCase}}/{{domainName}}List"; 
import {{domainName}}Edit from "./features/{{domainCamelCase}}/{{domainName}}Edit";

function App() {
  
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/{{domainCamelCase}}s' element={<{{domainName}}List />} />
        <Route path='/{{domainCamelCase}}' element={<{{domainName}}Edit />} />
      </Routes>

    </div>
  )
}

export default App