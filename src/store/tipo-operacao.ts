import { create } from 'zustand'
import {
  getWithAuth,
  putWithAuth,
  postWithAuth,
} from '../services/basicService'
import {
  ICreateTipoOperacao,
  ITipoOperacao,
} from '../pages/TipoOperacao/interfaces'

export interface TipoOperacaoStore {
  tipoOperacao: ITipoOperacao[]
  tipoOperacaoDetails: ITipoOperacao | null
  getTiposOperacao: () => Promise<ITipoOperacao[]>
  createTipoOperacao: (data: ICreateTipoOperacao) => Promise<void>
  getOneTipoOperacao: (id: number) => Promise<ITipoOperacao>
  editTipoOperacao: (id: number, data: ICreateTipoOperacao) => Promise<void>
}

export const useTipoOperacaoStore = create<TipoOperacaoStore>((set) => ({
  tipoOperacao: [],
  tipoOperacaoDetails: null,

  getTiposOperacao: async () => {
    const res = await getWithAuth('tipo-operacao')

    set({ tipoOperacao: res?.data })

    return res?.data
  },

  createTipoOperacao: async (data: ICreateTipoOperacao) => {
    await postWithAuth('tipo-operacao', data)
  },

  getOneTipoOperacao: async (id: number) => {
    const response = await getWithAuth(`tipo-operacao/${id}`)

    if (response) {
      set({ tipoOperacaoDetails: response?.data })
      return response?.data
    }

    return null
  },

  editTipoOperacao: async (id: number, data: ICreateTipoOperacao) => {
    await putWithAuth(`tipo-operacao/${id}`, data)
  },
}))
