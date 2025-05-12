import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import Head from 'next/head'
import { Stack, Heading, Text, SimpleGrid, Divider } from '@chakra-ui/react'
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input'
import { GithubBlog } from '@rena.to/github-blog'
import Cards from '../../components/Card'
import Container from '../../components/Container'

export default function Projects({ projects }) {
  const [query, setQuery] = useState('')
  const handleChange = (e) => {
    setQuery(e.target.value)
  }

  return (
    <>
      <Container>
        <Head>
        <title>YH Huang's Portfolio</title>
        </Head>
        <Stack
          justifyContent="center"
          my={{ base: '15vh', md: '16vh' }}
          spacing={10}
        >
          <Stack spacing={5}>
            {' '}
            <Heading color="displayColor" fontSize={{ base: '4xl', md: '6xl' }}>
              Projects
            </Heading>
            <InputGroup maxW="400px">
              <InputRightElement pointerEvents="none">
                <FaSearch />
              </InputRightElement>
              <Input
                placeholder="Search projects"
                type="text"
                value={query}
                onChange={handleChange}
              />
            </InputGroup>
            <Divider />
          </Stack>
          <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={8}>
            {projects
              .filter((e) =>
                e.title.toLowerCase().includes(query.toLowerCase()),
              )
              .map((project) => (
                <Cards
                  key={project.title}
                  desc={project.frontmatter.summary}
                  imageURL={project.frontmatter.image}
                  title={project.title}
                  slug={project.labels.slug[0]}
                />
              ))}
          </SimpleGrid>
        </Stack>
      </Container>
    </>
  )
}

export async function getStaticProps() {
  const blog = new GithubBlog({
    repo: 'hinxcode/portfolio',
    token: process.env.GITHUB_TOKEN,
  })
  const projects = await blog.getPosts({
    query: {
      author: 'hinxcode',
      type: 'project',
      state: 'published',
    },
    pager: { limit: 10, offset: 0 },
  })

  return {
    props: {
      projects: projects.edges
        .sort(
          (a, b) =>
            Date.parse(b.post.frontmatter.date) -
            Date.parse(a.post.frontmatter.date),
        )
        .map((e) => e.post),
    },
  }
}
