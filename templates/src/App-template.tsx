
import { Route, Routes, Link } from 'react-router-dom';
import Home from './features/home/Home';
import {{domainName}}List from "./features/{{domainCamelCase}}/{{domainName}}List"; 

function App() {
  
  return (
    <div>
      <h1>Sample App</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/{{domainCamelCase}}s">{{domainName}}s</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/{{domainCamelCase}}s' element={<{{domainName}}List />} />
      </Routes>

    </div>
  )
}

export default App