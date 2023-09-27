import { create } from 'zustand'
import { getWithAuth, postWithAuth } from '../services/basicService'
import {
  ICreateTipoOperacao,
  ITipoOperacao,
} from '../pages/TipoOperacao/interfaces'

export interface TipoOperacaoStore {
  tipoOperacao: ITipoOperacao[]
  getTiposOperacao: () => Promise<ITipoOperacao[]>
  createTipoOperacao: (data: ICreateTipoOperacao) => Promise<void>
}

export const useTipoOperacaoStore = create<TipoOperacaoStore>((set) => ({
  tipoOperacao: [],

  getTiposOperacao: async () => {
    const res = await getWithAuth('/tipo-operacao')

    set({ tipoOperacao: res?.data })

    return res?.data
  },

  createTipoOperacao: async (data: ICreateTipoOperacao) => {
    await postWithAuth('tipo-operacao', data)
  },
}))
