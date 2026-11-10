import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './app.scss'
import { installClickSounds } from './lib/sound'

installClickSounds()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
