import { Flex } from '@chakra-ui/layout'
import { Image, keyframes } from '@chakra-ui/react'

const opacityAnim = keyframes`
  from { opacity: 1 }
  to { opacity:0.3 }
`

export function LoadingLogo() {
  const imageAnimation = `${opacityAnim} infinite 0.8s alternate`

  return (
    <Flex w="full" h="full" justifyContent="center" alignItems="center">
      <Image
        src="https://emflora.com.br/wp-content/uploads/2018/12/cropped-Logo-200x51.png"
        alt="loading logo"
        animation={imageAnimation}
        w="xs"
      />
    </Flex>
  )
}
