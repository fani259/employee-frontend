
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Authcontext from './context/authcontext.jsx'


createRoot(document.getElementById('root')).render(
  <Authcontext>
    <App />
  </Authcontext>
)
