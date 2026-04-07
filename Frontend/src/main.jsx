import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './pages/Home.jsx'
import Listar_Produto from './pages/Listar_Produtos'
import Produto_Descriçao from './pages/Produto_Descrição'
import SignUp from './pages/SignUp'
import SingIn from './pages/SingIn'
import Carrinho from './pages/Carrinho'
import AdminProdutos from './pages/admin/AdminProdutos'
import CadastroProdutos from './pages/admin/CadastroProdutos';
import ModProduto from './pages/admin/ModificarProduto'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import PrivateRoute from './components/PrivateRoute'
import StaffRoute from './components/StaffRoute'
import AtualizarProduto from './pages/admin/AtualizarProduto'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/listar_produtos",
    element: <Listar_Produto />
  },
  {
    path: '/products/:id',
    element: <Produto_Descriçao />
  },
  {
    path: "/signup",
    element: <SignUp />
  },
  {
    path: "/signin",
    element: <SingIn />
  },
  {
    path: "/carrinho",
    element: (
    <PrivateRoute>
      <Carrinho />
    </PrivateRoute>
  ),
  },
  {
    path: "/admin/produtos",
    element: (
      <StaffRoute>
        <AdminProdutos />
      </StaffRoute>
    )
  },
  {
    path: "/admin/cadastro_produtos",
    element: (
      <StaffRoute>
        <CadastroProdutos />
      </StaffRoute>
    )
  },
  {
    path: "/admin/products/:id",
    element: (
      <StaffRoute>
        <ModProduto />
      </StaffRoute>
    )
  },
  {
    path: "/admin/atualizar_produto/:id",
    element: (
      <StaffRoute>
        <AtualizarProduto />
      </StaffRoute>
    )
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </StrictMode>,
)
