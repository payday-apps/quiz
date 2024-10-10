import React from 'react';
import { Box, VStack, Text, List, ListItem, useColorModeValue } from '@chakra-ui/react';

interface ResultsProps {
  answers: string[];
}

export const Results: React.FC<ResultsProps> = ({ answers }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  // Placeholder for matched lawsuits
  const matchedLawsuits = [
    { id: '1', title: 'Sample Lawsuit 1', description: 'Description for lawsuit 1' },
    { id: '2', title: 'Sample Lawsuit 2', description: 'Description for lawsuit 2' },
  ];

  return (
    <Box maxWidth="100%" margin="auto" padding={4}>
      <VStack spacing={6} align="stretch">
        <Text fontSize="xl" fontWeight="bold" textAlign="center">Your Matched Lawsuits</Text>
        {matchedLawsuits.map((lawsuit) => (
          <Box
            key={lawsuit.id}
            bg={bgColor}
            borderWidth={1}
            borderColor={borderColor}
            borderRadius="md"
            p={4}
            boxShadow="md"
          >
            <Text fontWeight="bold">{lawsuit.title}</Text>
            <Text>{lawsuit.description}</Text>
          </Box>
        ))}
        <Text fontSize="lg" fontWeight="bold" mt={4} textAlign="center">Your Answers:</Text>
        <List spacing={2}>
          {answers.map((answer, index) => (
            <ListItem key={index} bg={bgColor} borderWidth={1} borderColor={borderColor} borderRadius="md" p={3}>
              <Text fontWeight="bold">Question {index + 1}:</Text> {answer}
            </ListItem>
          ))}
        </List>
      </VStack>
    </Box>
  );
};