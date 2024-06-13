import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/header/header'
import Categories from './pages/categories'
import CategoriesChildren from './pages/categories_children'
import CategoriesInner from './pages/categories_inner'
import NotFound from './pages/not_found/not_found'
import Basket from './pages/basket/basket'

function App() {

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Categories />} />
        <Route path="children/:slug" element={<CategoriesChildren />} />
        <Route path="children_inner/:slug" element={<CategoriesInner />} />
        <Route path="basket" element={<Basket />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
