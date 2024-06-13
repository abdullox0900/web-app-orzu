import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider as LangProvider } from '../src/context/langContext.tsx'
import App from './App.tsx'
import { ShoppingCartProvider } from './context/shoppingCartContext.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ShoppingCartProvider>
      <LangProvider>
        <App />
      </LangProvider>
    </ShoppingCartProvider>
  </BrowserRouter>
)
