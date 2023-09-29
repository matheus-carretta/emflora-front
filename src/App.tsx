import {
  createHashRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Home } from './pages/Home'
import { TipoOperacao } from './pages/TipoOperacao'
import { useTipoOperacaoStore } from './store/tipo-operacao'
import { CreateTipoOperacao } from './pages/TipoOperacao/create'
import { EditTipoOperacao } from './pages/TipoOperacao/edit'
import { useOperacaoStore } from './store/operacao'
import { Operacao } from './pages/Operacao'
import { CreateOperacao } from './pages/Operacao/create'
import { EditOperacao } from './pages/Operacao/edit'

export declare type Params<Key extends string = string> = {
  readonly [key in Key]: string | undefined
}

function App() {
  const router = createHashRouter(
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
        <Route path="tipo-operacao/criar" element={<CreateTipoOperacao />} />
        <Route
          path="tipo-operacao/edit/:id"
          element={<EditTipoOperacao />}
          loader={async ({ params }: { params: Params }) => {
            if (params.id) {
              const tipoOperacao = await useTipoOperacaoStore
                .getState()
                .getOneTipoOperacao(+params.id)

              return tipoOperacao
            }
            return null
          }}
        />
        <Route
          path="operacao"
          element={<Operacao />}
          loader={async () => {
            const operacoes = await useOperacaoStore.getState().getOperacoes()
            return operacoes
          }}
        />
        <Route
          path="operacao/criar"
          element={<CreateOperacao />}
          loader={async () => {
            const tipoOperacoes = await useTipoOperacaoStore
              .getState()
              .getTiposOperacao()
            return tipoOperacoes
          }}
        />
        <Route
          path="operacao/edit/:id"
          element={<EditOperacao />}
          loader={async ({ params }: { params: Params }) => {
            if (params.id) {
              await useTipoOperacaoStore.getState().getTiposOperacao()

              const operacao = await useOperacaoStore
                .getState()
                .getOneOperacao(+params.id)

              return operacao
            }
            return null
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
