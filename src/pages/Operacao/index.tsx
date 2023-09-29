import { AxiosError } from 'axios'
import { deleteWithAuth } from '../../services/basicService'
import {
  Button,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
  useToast,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useOperacaoStore } from '../../store/operacao'
import { convertCentsToReais } from '../../utils/coin-convert'

export function Operacao() {
  const operacoes = useOperacaoStore((state) => state.operacoes)
  const getOperacoes = useOperacaoStore((state) => state.getOperacoes)
  const toast = useToast()
  const navigate = useNavigate()

  async function handleDelete(id: number) {
    try {
      await deleteWithAuth(`tipo-operacao/${id}`)
      await getOperacoes()
    } catch (error) {
      const err = error as AxiosError
      toast({
        status: 'error',
        title: 'Erro ao deletar tipo de operação',
        description: `Erro: ${err.message}`,
      })
    }
  }

  return (
    <VStack gap={8} w="80%" flex={1} alignItems="flex-start" margin="0 auto">
      <Heading fontWeight="extrabold" alignSelf="center">
        Operações
      </Heading>

      <Button
        role="a"
        size="md"
        bg="green.500"
        color="white"
        _hover={{
          bg: 'green.600',
        }}
        onClick={() => navigate('criar')}
        alignSelf="end"
      >
        Criar operação
      </Button>

      <TableContainer
        w="full"
        p={8}
        gap={4}
        display="flex"
        flexDir="column"
        border="1px"
        borderRadius={8}
        bg={'whiteAlpha.800'}
        borderColor={'gray.300'}
        shadow="base"
      >
        <Table colorScheme="green" variant="simple">
          <Thead>
            <Tr>
              <Th>Código</Th>
              <Th>Nome</Th>
              <Th textAlign="center">Tipo de Operação</Th>
              <Th textAlign="center">Valor unitário</Th>
              <Th textAlign="center">Rend. Principal</Th>
              <Th textAlign="center">Rend. Suporte</Th>
              <Th textAlign="center">Editar</Th>
              <Th textAlign="center">Deletar</Th>
            </Tr>
          </Thead>
          <Tbody>
            {operacoes?.map((operacao) => (
              <Tr key={operacao.id}>
                <Td textAlign="center">{operacao.codigo}</Td>
                <Td>{operacao.nome}</Td>
                <Td textAlign="center">{operacao.tipoOperacao.nome}</Td>
                <Td textAlign="center">
                  {convertCentsToReais(operacao.valorUnitario)}
                </Td>
                <Td textAlign="center">
                  {convertCentsToReais(operacao.rendPrincipal)}
                </Td>
                <Td textAlign="center">
                  {operacao.rendSuporte
                    ? convertCentsToReais(operacao.rendSuporte)
                    : convertCentsToReais(0)}
                </Td>
                <Td textAlign="center">
                  <Button
                    role="a"
                    size="md"
                    bg="green.500"
                    color="white"
                    _hover={{
                      bg: 'green.600',
                    }}
                    onClick={() => navigate(`edit/${operacao.id}`)}
                  >
                    Editar
                  </Button>
                </Td>
                <Td textAlign="center">
                  <Button
                    role="a"
                    size="md"
                    bg="green.500"
                    color="white"
                    _hover={{
                      bg: 'green.600',
                    }}
                    onClick={() => handleDelete(operacao.id)}
                  >
                    Deletar
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </VStack>
  )
}
