import { Route, Routes } from 'react-router-dom' // Import React router-dom 

// Import Pages
import Basket from './pages/basket/basket'
import Categories from './pages/categories/categories'
import CategoriesChildren from './pages/categories/categories_children'
import CategoriesInner from './pages/categories/categories_inner'
import CategoriesItem from './pages/categories/categories_item'
import NotFound from './pages/not_found/not_found'
import Questions from './pages/questions/questions'

// Import Components
import Header from './components/header/header'

import './App.css' // Importing CSS file for styling

import useTelegramTheme from './hooks/useTelegramTheme' // Import Telegram Theme Hook

function App() {

  const theme = useTelegramTheme()

  document.body.className = theme === 'dark' ? 'dark-theme' : 'light-theme'

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Categories />} />
        <Route path="children/:slug" element={<CategoriesChildren />} />
        <Route path="children_inner/:slug" element={<CategoriesInner />} />
        <Route path="children_item/:slug" element={<CategoriesItem />} />
        <Route path="basket" element={<Basket />} />
        <Route path="question" element={<Questions />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
