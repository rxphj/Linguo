import { createElement, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import CurrentLetter from './components/CurrentLetter.jsx';

const reactRoot = createRoot(document.getElementById('root'));
reactRoot.render(<CurrentLetter />);

