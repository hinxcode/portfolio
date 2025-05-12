import {
  SimpleGrid,
  Text,
  Stack,
  Heading,
  Image,
  Flex,
  Box,
  chakra,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
} from '@chakra-ui/react'

import useMediaQuery from '../hook/useMediaQuery'
import SlideUpWhenVisible from '../hook/SlideUpWhenVisible'
import ReactGA from 'react-ga4'

export default function AboutMe() {
  const isLargerThan800 = useMediaQuery(800)
  const handleHover = (event) => {
    ReactGA.event({
      category: 'hover',
      action: event,
    })
  }
  const MoreInfo = ({ text, content }) => {
    return (
      <>
        {' '}
        {isLargerThan800 ? (
          <Popover isLazy placement="right" trigger="hover">
            <PopoverTrigger>
              <chakra.span
                color="button1"
                cursor="help"
                onMouseOver={() => handleHover(`about_${text}`)}
              >
                {text}
              </chakra.span>
            </PopoverTrigger>
            <PopoverContent color="white" bg="secondary" borderColor="button1">
              <PopoverArrow bg="button1" />
              <PopoverBody color="textPrimary" fontSize="sm">
                {content}
              </PopoverBody>
            </PopoverContent>
          </Popover>
        ) : (
          <Text as="span" color="button1">
            {text}
          </Text>
        )}{' '}
      </>
    )
  }

  return (
    <>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
        <SlideUpWhenVisible>
          <Stack spacing={4}>
            <Heading fontFamily="Ubuntu" fontSize="2xl">
              ⚡ About Me
            </Heading>
            <Text
              color="textSecondary"
              fontSize={{ base: '14px', md: '16px' }}
              whiteSpace="pre-line"
            >
              Hey! I'm Ying Hsiang, an AI-driven ontologist with a strong foundation in software engineering and a passion for building knowledge-based solutions that drive real-world impact.
              <br />
              <br />
              My journey began as a
              <MoreInfo
                text="software engineer"
                content="My years of hands-on development experience enable me to bridge technical and business needs with ease."
              />
              in eCommerce industry, where I developed robust technical & leadership skills by building scalable eCommerce systems and leading a team of 15+ engineers.
              <br />
              <br />
              At the University of Washington, I integrated my MLIS background with practical
              <MoreInfo
                text="machine learning"
                content={
                  <>
                    Leveraged machine learning and deep learning in projects such as CRM-RFM analysis, BERT-based sentiment classification, and generative AI model evaluation.
                  </>
                }
              />
              skills, enabling me to design and implement intelligent, data-driven solutions.
              <br />
              <br />
              As a
              <MoreInfo
                text="linked data specialist"
                content={
                  <>
                    <b>MARC2RDA:</b> Developed ontology-based mappings to convert MARC21 bibliographic data into RDF/OWL, implemented SPARQL validation, and aligned metadata with schema.org and BIBFRAME standards.
                    <br />
                    <br />
                    <b>Wikibase Suite:</b> Established a linked data environment, developed custom SPARQL queries, and evaluated data modeling strategies for complex ontology alignment and knowledge representation.
                  </>
                }
              />
              at the UW Libraries, I focused on knowledge representation, data modeling, and large-scale data transformation.
              <br />
              <br />
              My current research leveraging multimodal embeddings for semantic search across large-scale digital collections,
              and developing RAG pipelines for LLMs at the UW eScience Institute.
              <br />
              <br />
              I thrive in collaborative, cross-functional environments, and am committed to advancing ontology best practices!
            </Text>
          </Stack>
        </SlideUpWhenVisible>
        <SlideUpWhenVisible>
          <Flex align="center" justify="center">
            <Box
              pos="relative"
              maxW={{ base: '300px', lg: '350px' }}
              maxH={{ base: '300px', lg: '350px' }}
            >
              <Image
                pos="absolute"
                zIndex={3}
                top="0px"
                right={{ base: '-32px', lg: '-64px' }}
                w={{ base: '100px', lg: '150px' }}
                alt=""
                filter="invert(0.1)"
                src="https://svgsilh.com/svg/26432.svg"
              />
              <Image
                w={{ base: '300px', lg: '350px' }}
                h={{ base: '300px', lg: '350px' }}
                objectFit="cover"
                borderRadius="50%"
                alt=""
                src="https://i.imgur.com/y9NnIRI.png"
              />
            </Box>
          </Flex>
        </SlideUpWhenVisible>
      </SimpleGrid>
    </>
  )
}
