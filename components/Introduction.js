import {
  Link,
  Text,
  Stack,
  Heading,
  Box,
  Button,
  SlideFade,
  Image,
} from '@chakra-ui/react'
import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa'
import useMediaQuery from '../hook/useMediaQuery'
import ReactGA from 'react-ga4'
import TypingEffect from './TypingEffect'

export default function Introduction({ introduction }) {
  const isLargerThan800 = useMediaQuery(800)
  const handleClick = (event) => {
    ReactGA.event({
      category: 'click',
      action: event,
    })
  }

  const roles = [
    "Programmer.",
    "Linked Data Specialist.",
    "Software Engineer.",
    "Researcher.",
    "Frontend Engineer.",
  ]

  return (
    <Stack
      alignItems="flex-start"
      justifyContent="flex-start"
      w="100%"
      spacing={{ base: 8, md: 10 }}
    >
      <SlideFade
        direction="top"
        transition={{ enter: { duration: 0.4, delay: 0.7 } }}
        in={true}
      >
        <Box pos="relative">
          <Image
            pos="absolute"
            zIndex={0}
            top={{ base: '0', md: '-15' }}
            left={{ base: '-4', md: '-10' }}
            w={{ base: '70px', md: '150px' }}
            alt=""
            filter="invert(0.1)"
            src="https://svgsilh.com/svg/26432.svg"
          ></Image>
          <Text
            pos="relative"
            zIndex={1}
            color="button1"
            fontSize="display2"
            fontWeight="medium"
          >
            Hi there!, I'm
          </Text>
        </Box>
        <Heading
          pos="relative"
          zIndex={1}
          color="displayColor"
          fontSize="display"
          lineHeight={'95%'}
          letterSpacing={{ sm: '-1.2px', md: '-1.8px' }}
        >
          Ying Hsiang<br />Huang.
        </Heading>
      </SlideFade>

      <SlideFade
        direction="top"
        transition={{ enter: { duration: 0.4, delay: 0.8 } }}
        in={true}
      >
        <Heading
          color="textSecondary"
          fontSize="display2"
          fontWeight="medium"
          letterSpacing="-1.6px"
          whiteSpace="pre-wrap"
        >
          <Box as="span" color="displayColor">
            <TypingEffect 
              words={roles}
              typingSpeed={70}
              deletingSpeed={50}
              delayBetweenWords={1800}
            />
          </Box>
          <br />
          Driving better information retrieval and search experiences
          {' '}
          {isLargerThan800
            ? '\nwith hands-on AI expertise.'
            : 'with hands-on AI expertise.'}
        </Heading>
      </SlideFade>

      <SlideFade
        direction="top"
        transition={{ enter: { duration: 0.4, delay: 0.9 } }}
        in={true}
      >
        <Text color="textPrimary" fontSize="display3">
          <Stack isInline spacing={1}>
            <Box>🎓</Box>
            <Box>
              Master's in Library and Information Science at UW
            </Box>
          </Stack>
          <Stack isInline spacing={1}>
            <Box>📚</Box>
            <Box>
              Linked Data Specialist at UW Libraries
            </Box>
          </Stack>
          <Stack isInline spacing={1}>
            <Box>🔬</Box>
            <Box>
              Research Assistant at UW eScience Institute
            </Box>
          </Stack>
        </Text>
      </SlideFade>
      <SlideFade
        direction="top"
        transition={{ enter: { duration: 0.4, delay: 1.0 } }}
        in={true}
      >
        <Stack isInline spacing={4}>
          <Link href="https://github.com/hinxcode" isExternal>
            <Button
              pos="static"
              color="white"
              leftIcon={<FaGithub color="#3CCF91" />}
              onClick={() => handleClick('introduction_github')}
              size={isLargerThan800 ? 'md' : 'sm'}
            >
              Github
            </Button>
          </Link>
          <Link href="https://linkedin.com/in/ying-hsiang-huang" isExternal>
            <Button
              pos="static"
              color="white"
              leftIcon={<FaLinkedin color="#3CCF91" />}
              onClick={() => handleClick('introduction_linkedin')}
              size={isLargerThan800 ? 'md' : 'sm'}
            >
              LinkedIn
            </Button>
          </Link>
          <Link href="mailto:hinxcode@gmail.com" isExternal>
            <Button
              pos="static"
              color="white"
              transition="0.3s"
              leftIcon={<FaEnvelope fill="#3CCF91" />}
              onClick={() => handleClick('introduction_email')}
              size={isLargerThan800 ? 'md' : 'sm'}
            >
              Email
            </Button>
          </Link>
        </Stack>
      </SlideFade>
    </Stack>
  )
}
