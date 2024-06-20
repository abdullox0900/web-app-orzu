import { Route, Routes } from 'react-router-dom'
import Header from './components/header/header'
import Basket from './pages/basket/basket'
import Categories from './pages/categories/categories'
import CategoriesChildren from './pages/categories/categories_children'
import CategoriesInner from './pages/categories/categories_inner'
import CategoriesItem from './pages/categories/categories_item'
import NotFound from './pages/not_found/not_found'

import './App.css'
import useTelegramTheme from './hooks/useTelegramTheme'
import Questions from './pages/questions/questions'


function App() {

  const theme = useTelegramTheme()

  if (theme == 'dark') {
    document.body.style.backgroundColor = '#151a28'
  }


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
