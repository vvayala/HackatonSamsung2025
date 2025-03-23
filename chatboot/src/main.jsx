import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import PagePrincipal from './components/pages/PagePrincipal'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PagePrincipal />
  </StrictMode>,
)
