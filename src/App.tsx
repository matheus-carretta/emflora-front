import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Home } from './pages/Home'
import { TipoOperacao } from './pages/TipoOperacao'
import { useTipoOperacaoStore } from './store/tipo-operacao'
import { CreateTipoOperacao } from './pages/TipoOperacao/create'

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Navbar />}>
        <Route index element={<Home />} />
        <Route
          path="tipo-operacao"
          element={<TipoOperacao />}
          loader={async () => {
            const tipoOperacoes = await useTipoOperacaoStore
              .getState()
              .getTiposOperacao()
            return tipoOperacoes
          }}
        />
        <Route
          path="tipo-operacao/criar"
          element={<CreateTipoOperacao />}
          loader={async () => {
            const tipoOperacoes = await useTipoOperacaoStore
              .getState()
              .getTiposOperacao()
            return tipoOperacoes
          }}
        />
      </Route>,
    ),
  )
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
