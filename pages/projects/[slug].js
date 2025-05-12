import {
  Box,
  Divider,
  HStack,
  Heading,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { FaGithub, FaLink } from 'react-icons/fa'
import ReactGA from 'react-ga4'
import mdxPrism from 'mdx-prism'
import readingTime from 'reading-time'
import { GithubBlog } from '@rena.to/github-blog'
import Container from '../../components/Container'
import MDXComponents from '../../components/MDXComponents'
import ProjectContainer from '../../components/ProjectContainer'

export default function Post({ metadata, publishedDate, source, toc }) {
  const router = useRouter()
  const [activeId, setActiveId] = useState()

  useEffect(() => {
    const handleScroll = () => {
      let currentId
      for (const heading of toc) {
        const element = document.getElementById(heading.title)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top < window.innerHeight / 2) {
            currentId = heading.title
          } else {
            break
          }
        }
      }
      setActiveId(currentId)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [toc])

  const handleClick = (event) => {
    ReactGA.event({
      category: 'click',
      action: event,
    })
  }

  return (
    <>
      <Container>
        <Stack>
          <Stack
            mx="auto"
            mt="73px"
            border="1px"
            borderColor={{ base: '#333', md: 'borderColor' }}
            borderRadius="10px"
          >
            <Image
              width={1366}
              height={768}
              objectFit="cover"
              style={{
                borderRadius: '10px',
              }}
              alt=""
              priority
              src={metadata.frontmatter.image}
              blurDataURL={metadata.frontmatter.image}
            />
          </Stack>

          <Stack pt={4}>
            <Heading
              as="h1"
              color="displayColor"
              fontSize={['3xl', '3xl', '5xl', '5xl']}
            >
              {metadata.title}
            </Heading>
            <Text color="textPrimary" fontSize={['xs', 'xs', 'sm', 'sm']}>
              {metadata.frontmatter.summary}
            </Text>
            <HStack spacing={2}>
              {metadata.frontmatter.githubLink && (
                <HStack alignItems="center">
                  <FaGithub fontSize="20px" />
                  <Link
                    fontSize={['xs', 'xs', 'sm', 'sm']}
                    href={metadata.frontmatter.githubLink}
                    isExternal
                    onClick={() => handleClick(`${metadata.title}_github`)}
                  >
                    Github
                  </Link>
                </HStack>
              )}

              {metadata.frontmatter.deployLink && (
                <>
                  <Text>-</Text>
                  <HStack>
                    <FaLink fontSize="18px" />
                    <Link
                      fontSize={['xs', 'xs', 'sm', 'sm']}
                      href={metadata.frontmatter.deployLink}
                      isExternal
                      onClick={() => handleClick(`${metadata.title}_livesite`)}
                    >
                      Live Site
                    </Link>
                  </HStack>
                </>
              )}
            </HStack>
          </Stack>

          <Divider h="0.5px" my={4} bg="textSecondary" />
        </Stack>

        <HStack alignItems="start" pt="23px" spacing="36px">
          <Stack w={{ base: '100%', md: '50rem' }}>
            <ProjectContainer>
              <MDXRemote {...source} components={MDXComponents} />
            </ProjectContainer>
          </Stack>

          <Stack
            pos="sticky"
            top="6rem"
            display={{ base: 'none', md: 'flex' }}
            w="250px"
            h="500px"
          >
            <Text color="displayColor" fontSize="xl" fontWeight="semibold">
              Table of Contents
            </Text>

            {toc.map((heading) => (
              <Box key={heading.title} pl={`${heading.level * 1}rem`}>
                <Text
                  key={heading.id}
                  color={
                    heading.title === activeId ? 'activeColor' : 'textSecondary'
                  }
                  fontSize={['sm', 'sm', 'md', 'md']}
                  fontWeight={
                    heading.title === activeId ? 'semibold' : 'normal'
                  }
                >
                  <a href={`#${heading.title}`}>{heading.title}</a>
                </Text>
              </Box>
            ))}
          </Stack>
        </HStack>
      </Container>
    </>
  )
}

export async function getStaticPaths() {
  const projects = new GithubBlog({
    repo: 'hinxcode/portfolio',
    token: process.env.GITHUB_TOKEN,
  })

  const data = await projects.getPosts({
    query: {
      author: 'hinxcode',
      type: 'project',
      state: 'published',
    },
    pager: { limit: 10, offset: 0 },
  })

  return {
    paths: data.edges.map(({ post }) => ({
      params: { slug: post.frontmatter.slug },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const projects = new GithubBlog({
    repo: 'hinxcode/portfolio',
    token: process.env.GITHUB_TOKEN,
  })
  const data = await projects.getPost({
    query: {
      author: 'hinxcode',
      type: 'project',
      search: params.slug,
    },
  })

  if (!data.post) {
    return {
      notFound: true,
    }
  }

  const article = data.post
  const source = article.body

  article.readingTime = readingTime(source).text

  const mdxSource = await serialize(source, {
    mdxOptions: {
      rehypePlugins: [mdxPrism],
    },
  })

  const headings = source.match(/#{2,4} .+/g)
  const toc = headings.map((heading) => {
    const level = heading.match(/#/g).length - 2
    const title = heading.replace(/#{2,4} /, '')
    return { title, level }
  })

  return {
    props: {
      metadata: article,
      publishedDate: new Date(article.frontmatter.date).toISOString(),
      source: mdxSource,
      toc: toc,
    },
    revalidate: 30,
  }
}
