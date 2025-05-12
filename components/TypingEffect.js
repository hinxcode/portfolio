import { useState, useEffect } from 'react'
import { Box, keyframes } from '@chakra-ui/react'

const blinkAnimation = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
`

const TypingEffect = ({ words = [], typingSpeed = 150, deletingSpeed = 10, delayBetweenWords = 2000 }) => {
  const [text, setText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (!words.length) return

    let timer
    const currentWord = words[wordIndex]

    const tick = () => {
      if (isDeleting) {
        setText(prev => prev.slice(0, -1))
        if (text === '') {
          setIsDeleting(false)
          setWordIndex((prev) => (prev + 1) % words.length)
        }
      } else {
        if (text.length < currentWord.length) {
          setText(currentWord.slice(0, text.length + 1))
        } else if (text === currentWord) {
          timer = setTimeout(() => {
            setIsDeleting(true)
          }, delayBetweenWords)
          return
        }
      }

      const speed = isDeleting ? deletingSpeed : typingSpeed
      timer = setTimeout(tick, speed)
    }

    timer = setTimeout(tick, isDeleting ? deletingSpeed : typingSpeed)

    return () => clearTimeout(timer)
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, delayBetweenWords])

  return (
    <Box as="span">
      {text}
      <Box
        as="span"
        animation={`${blinkAnimation} 1s step-end infinite`}
      >
        |
      </Box>
    </Box>
  )
}

export default TypingEffect 