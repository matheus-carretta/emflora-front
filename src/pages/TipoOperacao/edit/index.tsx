import { useTipoOperacaoStore } from '../../../store/tipo-operacao'
import { Flex, HStack, Heading } from '@chakra-ui/layout'
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { z } from 'zod'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { AxiosError } from 'axios'
import { ICreateTipoOperacao } from '../interfaces'

const createTipoOperacaoFormSchema = z.object({
  nome: z
    .string()
    .nonempty('O nome é obrigatório.')
    .min(3, 'O nome do tipo de operação precisa ter ao menso três caracteres.'),
})

type createTipoOperacaoInputs = z.infer<typeof createTipoOperacaoFormSchema>

export function EditTipoOperacao() {
  const tipoOperacao = useTipoOperacaoStore(
    (state) => state.tipoOperacaoDetails,
  )
  const editTipoOperacao = useTipoOperacaoStore(
    (state) => state.editTipoOperacao,
  )

  const navigate = useNavigate()
  const toast = useToast()
  const { id } = useParams()

  async function onSubmit(data: createTipoOperacaoInputs) {
    const newTipoOperacao: ICreateTipoOperacao = data

    try {
      await editTipoOperacao(+(id as string), newTipoOperacao)
      toast({
        status: 'success',
        title: 'Tipo de operação editado com sucesso',
        duration: 2000,
      })
      navigate(-1)
    } catch (error) {
      const err = error as AxiosError
      toast({
        status: 'error',
        title: 'Erro ao editar tipo de operação',
        description: `Erro: ${err.message}`,
      })
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<createTipoOperacaoInputs>({
    resolver: zodResolver(createTipoOperacaoFormSchema),
    defaultValues: {
      nome: tipoOperacao?.nome ?? '',
    },
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
        <Heading>Editar tipo de operação</Heading>
      </HStack>
      <Heading size="lg">Dados do tipo de operação</Heading>

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
          <FormControl as="fieldset" isInvalid={!!errors.nome} isRequired>
            <FormLabel>Nome do tipo de operação</FormLabel>
            <Input
              {...register('nome')}
              bg="blackAlpha.100"
              placeholder="Mecanizada, manual..."
            />
            {errors.nome ? (
              <FormErrorMessage>{errors.nome.message}</FormErrorMessage>
            ) : null}
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
        >
          Criar tipo de operação
        </Button>
      </Flex>
    </Flex>
  )
}
