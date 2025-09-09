//geschrieben von Yasmin Holik

import { createElement, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Routing from './Routing.jsx'
import "primereact/resources/themes/lara-light-blue/theme.css"; 
import "primereact/resources/primereact.min.css";              
import "primeicons/primeicons.css";    

const reactRoot = createRoot(document.getElementById('root'));
//Einstiegspunkt, Komponente Routing steuert welche Seite geladen werden soll
reactRoot.render(<Routing />);

