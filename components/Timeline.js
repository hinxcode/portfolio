import { Box, Stack, Text, Flex, Circle, Heading } from '@chakra-ui/react'
import SlideUpWhenVisible from '../hook/SlideUpWhenVisible'

const TimelineItem = ({ year, role, company, description, isLast, side }) => {
  return (
    <Flex w="100%" minH="120px" position="relative">
      {/* Left side content */}
      <Box w="50%" pr={side === 'left' ? 8 : 0} display="flex" justifyContent="flex-end" alignItems="center">
        {side === 'left' && (
          <Box maxW="380px" textAlign="right">
            <Text color="displayColor" fontSize="xl" fontWeight="bold">
              {role}
            </Text>
            <Text color="button1" fontSize="md" fontWeight="medium">
              {company}
            </Text>
            <Text color="textSecondary" fontSize="md" mt={2}>
              {description}
            </Text>
          </Box>
        )}
      </Box>
      {/* Center timeline */}
      <Flex flexDir="column" alignItems="center" position="relative" zIndex={1}>
        <Circle size="40px" bg="button1" zIndex={2}>
          <Text color="white" fontSize="xs" fontWeight="800">{year}</Text>
        </Circle>
      </Flex>
      {/* Right side content */}
      <Box w="50%" pl={side === 'right' ? 8 : 0} display="flex" justifyContent="flex-start" alignItems="center">
        {side === 'right' && (
          <Box maxW="380px" textAlign="left">
            <Text color="displayColor" fontSize="xl" fontWeight="bold">
              {role}
            </Text>
            <Text color="button1" fontSize="md" fontWeight="medium">
              {company}
            </Text>
            <Text color="textSecondary" fontSize="md" mt={2}>
              {description}
            </Text>
          </Box>
        )}
      </Box>
    </Flex>
  )
}

export default function Timeline() {
  const experiences = [
    {
      year: "2018",
      role: "Sr. Software Engineer / Team Lead",
      company: "@SHOPLNIE",
      description: "After 5 years as a software engineer in eCommerce industry, my tech journey ignited a deeper curiosity about how structured information can really enhance intelligent search and discovery. This passion ultimately inspired me to pursue a new direction in information science."
    },
    {
      year: "2023",
      role: "Pursuing my MLIS degree",
      description: "My coursework included metadata design, data modeling, indexing languages, theory of classification, information retrieval, machine learning, providing me with rigorous training in both the theory and practice of library science."
    },
    {
      year: "2024",
      role: "Code4Lib Scholarship Recipient",
      description: "My commitment to advancing library technology was recognized with the Code4Lib 2024 Scholarship. This opportunity allowed me to connect with a vibrant community and stay at the forefront of open-source innovation in the field."
    },
    {
      year: "2024",
      role: "Linked Data Specialist",
      company: "@University of Washington Libraries",
      description: "I contributed to the MARC2RDA Mapping Project, developing XSLT and Java extensions to streamline bibliographic data conversion. I also implemented a local Wikibase Suite environment to test large-scale RDA-RDF ingestion, helping the team assess performance and scalability for handling hundreds of millions of entities. My work reduced manual metadata processes and improved data transformation accuracy, further deepening my expertise in RDF, OWL, and SPARQL."
    },
    {
      year: "2025",
      role: "Focusing on AI in Library Research",
      description: "My research focuses on leveraging deep learning to build an ontology-powered system — pushing the boundaries of AI-driven information retrieval."
    }
  ]

  return (
    <Stack spacing={8} w="100%" position="relative">
      <Heading fontFamily="Ubuntu" fontSize="2xl">
        🚀 My Journey
      </Heading>
      <Box position="absolute" left="50%" top={0} h="100%" w="2px" bg="button1" opacity={0.3} zIndex={0} />
      <Stack spacing={12} position="relative">
        {experiences.map((experience, index) => (
          <SlideUpWhenVisible key={experience.year}>
            <TimelineItem
              {...experience}
              isLast={index === experiences.length - 1}
              side={index % 2 === 0 ? 'left' : 'right'}
            />
          </SlideUpWhenVisible>
        ))}
      </Stack>
    </Stack>
  )
} 