/* eslint-disable react/no-children-prop */
import { useTipoOperacaoStore } from '../../../store/tipo-operacao'
import { Flex, HStack, Heading } from '@chakra-ui/layout'
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  NumberInput,
  NumberInputField,
  Select,
  useToast,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { z } from 'zod'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { AxiosError } from 'axios'
import { ICreateOperacao } from '../interfaces'
import { useOperacaoStore } from '../../../store/operacao'

const createOperacaoFormSchema = z.object({
  codigo: z.string().nonempty('O código é obrigatório.'),
  nome: z
    .string()
    .nonempty('O nome é obrigatório.')
    .min(3, 'O nome do  de operação precisa ter ao menso três caracteres.'),
  valorUnitario: z
    .number()
    .nonnegative('Não é possível enviar valores negativos'),
  rendPrincipal: z
    .number()
    .nonnegative('Não é possível enviar valores negativos'),
  rendSuporte: z
    .number()
    .nonnegative('Não é possível enviar valores negativos')
    .optional(),
  tipoOperacaoId: z.number(),
})

type createOperacaoInputs = z.infer<typeof createOperacaoFormSchema>

export function EditOperacao() {
  const operacao = useOperacaoStore((state) => state.operacaoDetails)
  console.log(operacao?.rendSuporte)
  const editOperacao = useOperacaoStore((state) => state.editOperacao)
  const tipoOperacoes = useTipoOperacaoStore((state) => state.tipoOperacao)

  const navigate = useNavigate()
  const toast = useToast()
  const { id } = useParams()

  async function onSubmit(data: createOperacaoInputs) {
    const newOperacao: ICreateOperacao = {
      rendSuporte: data.rendSuporte ? data.rendSuporte : 0,
      valorUnitario: data.valorUnitario * 100,
      rendPrincipal: data.rendPrincipal * 100,
      codigo: data.codigo,
      nome: data.nome,
      tipoOperacaoId: +data.tipoOperacaoId,
    }

    try {
      await editOperacao(+(id as string), newOperacao)
      toast({
        status: 'success',
        title: 'Operação editada com sucesso',
        duration: 2000,
      })
      navigate(-1)
    } catch (error) {
      const err = error as AxiosError
      toast({
        status: 'error',
        title: 'Erro ao editar operação',
        description: `Erro: ${err.message}`,
      })
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<createOperacaoInputs>({
    resolver: zodResolver(createOperacaoFormSchema),
    defaultValues: {
      nome: operacao?.nome ?? '',
      codigo: operacao?.codigo ?? '',
      valorUnitario: operacao?.valorUnitario
        ? operacao.valorUnitario / 100
        : undefined,
      rendPrincipal: operacao?.rendPrincipal
        ? operacao.rendPrincipal / 100
        : undefined,
      rendSuporte: operacao?.rendSuporte ? operacao.rendSuporte : undefined,
      tipoOperacaoId: operacao?.tipoOperacaoId ?? undefined,
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
        <Heading>Editar operação</Heading>
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

          <FormControl
            as="fieldset"
            isInvalid={!!errors.valorUnitario}
            isRequired
          >
            <FormLabel as="legend">Valor unitário</FormLabel>
            <NumberInput
              bg="blackAlpha.50"
              focusBorderColor="green.500"
              borderRadius={4}
              step={0.2}
            >
              <NumberInputField
                {...register('valorUnitario', { valueAsNumber: true })}
                color="gray.700"
                fontWeight="bold"
                _placeholder={{
                  color: 'gray.500',
                }}
                placeholder="Valor em reais"
              />
            </NumberInput>

            {errors.valorUnitario && (
              <FormErrorMessage>
                {errors.valorUnitario.message}
              </FormErrorMessage>
            )}
          </FormControl>

          <FormControl
            as="fieldset"
            isInvalid={!!errors.rendPrincipal}
            isRequired
          >
            <FormLabel as="legend">Rend. Principal</FormLabel>
            <NumberInput
              bg="blackAlpha.50"
              focusBorderColor="green.500"
              borderRadius={4}
              step={0.2}
            >
              <NumberInputField
                {...register('rendPrincipal', { valueAsNumber: true })}
                color="gray.700"
                fontWeight="bold"
                _placeholder={{
                  color: 'gray.500',
                }}
                placeholder="Valor em reais"
              />
            </NumberInput>

            {errors.rendPrincipal && (
              <FormErrorMessage>
                {errors.rendPrincipal.message}
              </FormErrorMessage>
            )}
          </FormControl>

          <FormControl as="fieldset" isInvalid={!!errors.rendSuporte}>
            <FormLabel as="legend">Rend. Suporte</FormLabel>
            <NumberInput
              bg="blackAlpha.50"
              focusBorderColor="green.500"
              borderRadius={4}
              step={0.2}
              defaultValue={0}
            >
              <NumberInputField
                {...register('rendSuporte', { valueAsNumber: true })}
                color="gray.700"
                fontWeight="bold"
                _placeholder={{
                  color: 'gray.500',
                }}
                placeholder="Valor em reais"
              />
            </NumberInput>

            {errors.rendSuporte && (
              <FormErrorMessage>{errors.rendSuporte.message}</FormErrorMessage>
            )}
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
          Editar operação
        </Button>
      </Flex>
    </Flex>
  )
}
