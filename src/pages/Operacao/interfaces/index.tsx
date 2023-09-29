import { ITipoOperacao } from '../../TipoOperacao/interfaces'

export interface IOperacao {
  id: number
  codigo: string
  nome: string
  valorUnitario: number
  rendPrincipal: number
  rendSuporte: number
  tipoOperacaoId: number
  tipoOperacao: ITipoOperacao
}

export interface ICreateOperacao {
  codigo: string
  nome: string
  valorUnitario: number
  rendPrincipal: number
  rendSuporte: number
  tipoOperacaoId: number
}
