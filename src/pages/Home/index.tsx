import { Box, Image } from '@chakra-ui/react'
import { Flex } from '@chakra-ui/layout'

export function Home() {
  return (
    <Flex w="100%" h="95vh" justifyContent="center">
      <Box boxSize="sm" alignSelf="center">
        <Image
          src="https://emflora.com.br/wordpress/wp-content/uploads/2018/12/cropped-Logo.png"
          alt="Dan Abramov"
        />
      </Box>
    </Flex>
  )
}
