import { ITipoOperacao } from '../../TipoOperacao/interfaces'

export interface IOperacao {
  id: number
  codigo: string
  nome: string
  tipoOperacaoId: number
  tipoOperacao: ITipoOperacao
}

export interface ICreateOperacao {
  codigo: string
  nome: string
  tipoOperacaoId: number
}
