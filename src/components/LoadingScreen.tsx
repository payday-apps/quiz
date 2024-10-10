import { Box, VStack, Text, Spinner } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box as any);

export const LoadingScreen: React.FC = () => {
  return (
    <Box height="100vh" display="flex" alignItems="center" justifyContent="center">
      <VStack spacing={8}>
        <MotionBox
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Spinner size="xl" thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" />
        </MotionBox>
        <MotionBox
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Text 
            fontSize="2xl" 
            fontWeight="bold" 
            color="blue.600"
            textAlign="center"
          >
            Finding your Payday matches...
          </Text>
        </MotionBox>
      </VStack>
    </Box>
  );
};