import { useState } from 'react';
import {
  Box,
  VStack,
  Progress,
  useColorModeValue,
  Input,
  Button,
  Heading,
  Checkbox,
  CheckboxGroup,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';

interface QuizProps {
  onComplete: (answers: string[]) => void;
}

interface Question {
  question: string;
  options: string[];
  type: 'radio' | 'input' | 'checkbox';
}

const questions: Question[] = [
  {
    question: "Have you been exposed to harmful chemicals at work?",
    options: ["Yes", "No", "Not sure"],
    type: "radio"
  },
  {
    question: "What is your ZIP code?",
    options: [],
    type: "input"
  },
  {
    question: "Which of the following symptoms have you experienced? (Select all that apply)",
    options: ["Headaches", "Nausea", "Dizziness", "Skin irritation", "Respiratory issues", "None of the above"],
    type: "checkbox"
  },
  {
    question: "How long have you been working at your current job?",
    options: ["Less than 1 year", "1-5 years", "6-10 years", "More than 10 years"],
    type: "radio"
  },
  {
    question: "Have you been diagnosed with any health conditions related to chemical exposure?",
    options: ["Yes", "No", "Not sure"],
    type: "radio"
  },
  {
    question: "Are you currently receiving medical treatment for any symptoms?",
    options: ["Yes", "No"],
    type: "radio"
  },
  {
    question: "Have you reported your concerns to your employer?",
    options: ["Yes", "No", "I'm not comfortable answering"],
    type: "radio"
  },
  {
    question: "What is your preferred method of contact?",
    options: ["Phone", "Email", "Text message"],
    type: "radio"
  }
];

const MotionBox = motion(Box as any);

export const Quiz: React.FC<QuizProps> = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>(new Array(questions.length).fill(''));

  const handleAnswer = (answer: string | string[]) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = Array.isArray(answer) ? answer.join(', ') : answer;
    setAnswers(newAnswers);

    if (currentQuestionData.type === 'radio') {
      handleNext();
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      onComplete(answers);
    }
  };

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const isLastQuestion = currentQuestion === questions.length - 1;
  const currentQuestionData = questions[currentQuestion];

  const renderQuestionInput = () => {
    switch (currentQuestionData.type) {
      case 'radio':
        return (
          <VStack align="stretch" spacing={4} width="100%">
            {currentQuestionData.options.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleAnswer(option)}
                size="lg"
                variant={answers[currentQuestion] === option ? "solid" : "outline"}
                colorScheme="brand"
                width="100%"
              >
                {option}
              </Button>
            ))}
          </VStack>
        );
      case 'checkbox':
        return (
          <VStack align="stretch" spacing={4} width="100%">
            <CheckboxGroup
              colorScheme="brand"
              value={answers[currentQuestion] ? answers[currentQuestion].split(', ') : []}
              onChange={(values) => handleAnswer(values as string[])}
            >
              <VStack align="stretch" spacing={4} width="100%">
                {currentQuestionData.options.map((option, index) => (
                  <Checkbox key={index} value={option} size="lg">
                    {option}
                  </Checkbox>
                ))}
              </VStack>
            </CheckboxGroup>
            <Button
              onClick={handleNext}
              colorScheme="brand"
              isDisabled={!answers[currentQuestion]}
              size="lg"
              width="100%"
            >
              {isLastQuestion ? 'Finish' : 'Next'}
            </Button>
          </VStack>
        );
      case 'input':
        return (
          <VStack align="stretch" spacing={4} width="100%">
            <Input
              placeholder="Enter ZIP code"
              value={answers[currentQuestion] || ''}
              onChange={(e) => handleAnswer(e.target.value)}
              size="lg"
              focusBorderColor="brand.500"
            />
            <Button
              onClick={handleNext}
              colorScheme="brand"
              isDisabled={!answers[currentQuestion]}
              size="lg"
              width="100%"
            >
              Next
            </Button>
          </VStack>
        );
      default:
        return null;
    }
  };

  return (
    <Box>
      <Progress value={(currentQuestion + 1) / questions.length * 100} size="sm" colorScheme="brand" mb={6} />
      <AnimatePresence mode="wait">
        <MotionBox
          key={currentQuestion}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <VStack spacing={6} align="stretch">
            <Heading as="h2" size="lg" color="brand.600" textAlign="center">{currentQuestionData.question}</Heading>
            <Box bg={bgColor} borderRadius="md" borderWidth={1} borderColor={borderColor} p={6} boxShadow="md">
              {renderQuestionInput()}
            </Box>
            {currentQuestion > 0 && (
              <Button 
                onClick={() => setCurrentQuestion(currentQuestion - 1)} 
                size="lg"
                variant="outline"
                colorScheme="brand"
                width="100%"
              >
                Back
              </Button>
            )}
          </VStack>
        </MotionBox>
      </AnimatePresence>
    </Box>
  );
};