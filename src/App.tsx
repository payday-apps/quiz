import { useState } from 'react';
import { ChakraProvider, Box, Heading, VStack } from '@chakra-ui/react';
import { Quiz } from './components/Quiz';
import { Auth } from './components/Auth';
import { Results } from './components/Results';
import { LoadingScreen } from './components/LoadingScreen';
import theme from './theme';

function App() {
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [answers, setAnswers] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleQuizComplete = (quizAnswers: string[]) => {
    setAnswers(quizAnswers);
    setQuizCompleted(true);
  };

  const handleLogin = () => {
    setLoading(true);
    // Simulate a delay for the loading screen
    setTimeout(() => {
      setAuthenticated(true);
      setLoading(false);
    }, 2000);
  };

  return (
    <ChakraProvider theme={theme}>
      <Box minHeight="100vh" bg="gray.50" p={4}>
        <VStack spacing={6} align="stretch" maxWidth="600px" margin="auto">
          <Heading as="h1" size="xl" textAlign="center" color="brand.600">Payday - Lawsuit Matcher</Heading>
          {!quizCompleted && <Quiz onComplete={handleQuizComplete} />}
          {quizCompleted && !authenticated && <Auth onLogin={handleLogin} />}
          {loading && <LoadingScreen />}
          {authenticated && <Results answers={answers} />}
        </VStack>
      </Box>
    </ChakraProvider>
  );
}

export default App;