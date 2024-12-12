import { Image } from '@chakra-ui/react'
import { Flex } from '@chakra-ui/layout'

export function Home() {
  return (
    <Flex w="100%" h="95vh" justifyContent="center">
      <Flex justifyContent="center" alignContent="center">
        <Image
          src="https://emflora.com.br/wp-content/uploads/2018/12/cropped-Logo-200x51.png"
          alt="Dan Abramov"
          w="200px"
          h="51px"
        />
      </Flex>
    </Flex>
  )
}
