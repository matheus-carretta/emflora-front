import { ICreateOperacao, IOperacao } from '../pages/Operacao/interfaces'
import { create } from 'zustand'
import {
  getWithAuth,
  postWithAuth,
  putWithAuth,
} from '../services/basicService'

export interface OperacaoStore {
  operacoes: IOperacao[]
  operacaoDetails: IOperacao | null
  getOperacoes: () => Promise<IOperacao[]>
  createOperacao: (data: ICreateOperacao) => Promise<void>
  getOneOperacao: (id: number) => Promise<IOperacao>
  editOperacao: (id: number, data: ICreateOperacao) => Promise<void>
}

export const useOperacaoStore = create<OperacaoStore>((set) => ({
  operacoes: [],
  operacaoDetails: null,

  getOperacoes: async () => {
    const res = await getWithAuth('operacao')

    set({ operacoes: res?.data })

    return res?.data
  },

  createOperacao: async (data: ICreateOperacao) => {
    await postWithAuth('operacao', data)
  },

  getOneOperacao: async (id: number) => {
    const response = await getWithAuth(`tipo-operacao/${id}`)

    if (response) {
      set({ operacaoDetails: response?.data })
      return response?.data
    }

    return null
  },

  editOperacao: async (id: number, data: ICreateOperacao) => {
    await putWithAuth(`tipo-operacao/${id}`, data)
  },
}))
