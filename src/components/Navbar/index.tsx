import { Link, Outlet, useNavigation } from 'react-router-dom'
import { Flex } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/react'
import { LoadingLogo } from '../LoadingLogo'

export function Navbar() {
  const { state } = useNavigation()

  return (
    <>
      <Flex
        as="nav"
        justifyContent="center"
        alignItems="center"
        w="100%"
        h="5vh"
        backgroundColor="green.300"
        borderBottom="1px solid black"
        marginBottom="5px"
      >
        <Button
          as={Link}
          to="/operacao"
          bg="transparent"
          w="max-content"
          color="whiteAlpha.900"
          _hover={{
            bg: 'green.400',
          }}
          px={2}
          size="md"
          gap={3}
        >
          Operação
        </Button>
        <Button
          as={Link}
          to="/tipo-operacao"
          bg="transparent"
          w="max-content"
          color="whiteAlpha.900"
          _hover={{
            bg: 'green.700',
          }}
          px={2}
          size="md"
          gap={2}
        >
          Tipo de Operação
        </Button>
      </Flex>
      <div>
        {state === 'loading' ? (
          <>
            <LoadingLogo />
          </>
        ) : (
          <Outlet />
        )}
      </div>
    </>
  )
}
