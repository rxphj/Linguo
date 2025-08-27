import { createElement, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import LoginPage from './pages/LoginPage.jsx'
import Routing from './Routing.jsx'

const reactRoot = createRoot(document.getElementById('root'));
reactRoot.render(<Routing />);

