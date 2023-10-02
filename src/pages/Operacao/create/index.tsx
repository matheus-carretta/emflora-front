/* eslint-disable react/no-children-prop */
import { Flex, HStack, Heading } from '@chakra-ui/layout'
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast,
  InputGroup,
  InputLeftAddon,
  Select,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { ICreateOperacao } from '../interfaces'
import { AxiosError } from 'axios'
import { useOperacaoStore } from '../../../store/operacao'
import { useTipoOperacaoStore } from '../../../store/tipo-operacao'

const createOperacaoFormSchema = z.object({
  codigo: z.string().nonempty('O código é obrigatório.'),
  nome: z
    .string()
    .nonempty('O nome é obrigatório.')
    .min(3, 'O nome do  de operação precisa ter ao menso três caracteres.'),
  tipoOperacaoId: z.number(),
})

type createOperacaoInputs = z.infer<typeof createOperacaoFormSchema>

export function CreateOperacao() {
  const createOperacao = useOperacaoStore((state) => state.createOperacao)
  const tipoOperacoes = useTipoOperacaoStore((state) => state.tipoOperacao)

  const navigate = useNavigate()
  const toast = useToast()

  async function onSubmit(data: createOperacaoInputs) {
    const newOperacao: ICreateOperacao = {
      codigo: data.codigo,
      nome: data.nome,
      tipoOperacaoId: +data.tipoOperacaoId,
    }

    try {
      await createOperacao(newOperacao)
      toast({
        status: 'success',
        title: 'Operação criada com sucesso',
        duration: 2000,
      })
      navigate(-1)
    } catch (error) {
      const err = error as AxiosError
      toast({
        status: 'error',
        title: 'Erro ao criar operação',
        description: `Erro: ${err.message}`,
      })
    }
  }

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<createOperacaoInputs>({
    resolver: zodResolver(createOperacaoFormSchema),
  })

  return (
    <Flex
      flexDir="column"
      justifyContent="space-between"
      alignItems="flex-start"
      w="80%"
      margin="0 auto"
      h="full"
      gap={8}
    >
      <HStack gap={8}>
        <Button onClick={() => navigate(-1)} bgColor="transparent">
          <AiOutlineArrowLeft weight="bold" size={24} />
        </Button>
        <Heading>Criar operação</Heading>
      </HStack>
      <Heading size="lg">Dados da operação</Heading>

      <Flex
        as="form"
        flexDir="column"
        w="full"
        h="full"
        gap={6}
        p={8}
        borderRadius={8}
        shadow="base"
        bg="whiteAlpha.800"
        id="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Flex gap={8}>
          <FormControl as="fieldset" isInvalid={!!errors.codigo} isRequired>
            <FormLabel>Código da operação</FormLabel>
            <InputGroup>
              <InputLeftAddon children="OP" />
              <Input
                type="text"
                bg="blackAlpha.100"
                placeholder="101, 102..."
                {...register('codigo')}
              />
            </InputGroup>
            {errors.codigo ? (
              <FormErrorMessage>{errors.codigo.message}</FormErrorMessage>
            ) : null}
          </FormControl>

          <FormControl as="fieldset" isInvalid={!!errors.nome} isRequired>
            <FormLabel>Nome da operação</FormLabel>
            <Input
              type="text"
              bg="blackAlpha.100"
              placeholder="Digite o nome da operação"
              {...register('nome')}
            />
            {errors.nome ? (
              <FormErrorMessage>{errors.nome.message}</FormErrorMessage>
            ) : null}
          </FormControl>

          <FormControl as="fieldset">
            <FormLabel>Tipo de Operação</FormLabel>
            <Select
              bg="blackAlpha.100"
              {...register('tipoOperacaoId')}
              focusBorderColor="green.500"
              w="full"
            >
              {tipoOperacoes?.map((tipo) => (
                <option value={tipo.id} key={tipo.id}>
                  {tipo.nome}
                </option>
              ))}
            </Select>
          </FormControl>
        </Flex>

        <Button
          type="submit"
          form="form"
          bg="green.500"
          color="gray.100"
          _hover={{
            bg: 'green.600',
          }}
          size="lg"
          alignSelf="flex-end"
          isLoading={isSubmitting}
          isDisabled={!isDirty}
          onClick={() => onSubmit(getValues())}
        >
          Criar operação
        </Button>
      </Flex>
    </Flex>
  )
}
