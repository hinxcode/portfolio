import Head from 'next/head'
import { Stack } from '@chakra-ui/react'
import { GithubBlog } from '@rena.to/github-blog'
import Container from '../components/Container'
import Introduction from '../components/Introduction'
import FeaturedProjects from '../components/FeaturedProjects'
import AboutMe from '../components/AboutMe'
import ContactMe from '../components/ContactMe'
import Timeline from '../components/Timeline'


export default function Index({ introduction, projects, articles, contactMe }) {
  return (
    <>
      <Container enableTransition={true}>
        <Head>
          <title>YH Huang's Portfolio</title>
        </Head>
        <Stack
          as="main"
          alignItems="flex-start"
          justifyContent="center"
          mt={{ base: '15vh', md: '20vh' }}
          pb="144px"
          spacing={{ base: '100px', md: '144px' }}
        >
          <Introduction introduction={introduction} />
          <AboutMe />
          <Timeline />
          <FeaturedProjects projects={projects} />
          <ContactMe contactMe={contactMe} />
        </Stack>
      </Container>
    </>
  )
}

export async function getStaticProps() {
  const projects = new GithubBlog({
    repo: 'hinxcode/portfolio',
    token: process.env.GITHUB_TOKEN,
  })

  let data = await projects.getPosts({
    query: {
      author: 'hinxcode',
      type: 'project',
      state: 'published',
    },
    pager: { limit: 10, offset: 0 },
  })

  return {
    props: {
      projects: data.edges
        .sort(
          (a, b) =>
            Date.parse(b.post.frontmatter.date) -
            Date.parse(a.post.frontmatter.date),
        )
        .map((edge) => edge.post)
        .slice(0, 4),
    },
  }
}
