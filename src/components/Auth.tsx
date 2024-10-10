import React from 'react';
import { Box, Button, VStack, Text, useColorModeValue } from '@chakra-ui/react';
import { FaGoogle, FaFacebook } from 'react-icons/fa';

interface AuthProps {
  onLogin: () => void;
}

export const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const handleGoogleSignIn = () => {
    // Implement actual Google sign-in logic here
    onLogin();
  };

  const handleFacebookSignIn = () => {
    // Implement actual Facebook sign-in logic here
    onLogin();
  };

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <Box maxWidth="100%" margin="auto" padding={4}>
      <VStack spacing={6} align="stretch">
        <Text fontSize="xl" fontWeight="bold" textAlign="center">Sign In to View Results</Text>
        <Box bg={bgColor} borderRadius="md" borderWidth={1} borderColor={borderColor} p={6} boxShadow="md">
          <VStack spacing={4}>
            <Button 
              onClick={handleGoogleSignIn} 
              width="100%" 
              size="lg" 
              colorScheme="red" 
              leftIcon={<FaGoogle />}
            >
              Sign in with Google
            </Button>
            <Button 
              onClick={handleFacebookSignIn} 
              width="100%" 
              size="lg" 
              colorScheme="facebook" 
              leftIcon={<FaFacebook />}
            >
              Sign in with Facebook
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
};