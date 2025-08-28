import { createElement, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Routing from './Routing.jsx'

const reactRoot = createRoot(document.getElementById('root'));
reactRoot.render(<Routing />);

