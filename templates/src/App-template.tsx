
import { Route, Routes, Link } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './features/home/Home';
import {{domainName}}List from "./features/{{domainCamelCase}}/{{domainName}}List"; 

function App() {
  
  return (
    <div>
      <h1>Sample App</h1>
      <Navigation />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/{{domainCamelCase}}s' element={<{{domainName}}List />} />
      </Routes>

    </div>
  )
}

export default App