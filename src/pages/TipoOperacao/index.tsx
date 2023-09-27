import { AxiosError } from 'axios'
import { deleteWithAuth } from '../../services/basicService'
import { useTipoOperacaoStore } from '../../store/tipo-operacao'
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

export function TipoOperacao() {
  const tipoOperacoes = useTipoOperacaoStore((state) => state.tipoOperacao)
  const getTipoOperacoes = useTipoOperacaoStore(
    (state) => state.getTiposOperacao,
  )
  const toast = useToast()
  const navigate = useNavigate()

  async function handleDelete(id: number) {
    try {
      await deleteWithAuth(`tipo-operacao/${id}`)
      await getTipoOperacoes()
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
        Tipos de operação
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
        Criar tipo de operação
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
              <Th>ID</Th>
              <Th w="60%">Tipo de operação</Th>
              <Th textAlign="center">Editar</Th>
              <Th textAlign="center">Deletar</Th>
            </Tr>
          </Thead>
          <Tbody>
            {tipoOperacoes?.map((tipo) => (
              <Tr key={tipo.id}>
                <Td>{tipo.id}</Td>
                <Td>{tipo.nome}</Td>
                <Td textAlign="center">
                  <Button
                    role="a"
                    size="md"
                    bg="green.500"
                    color="white"
                    _hover={{
                      bg: 'green.600',
                    }}
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
                    onClick={() => handleDelete(tipo.id)}
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
