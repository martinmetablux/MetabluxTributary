import React, { useState } from 'react';
import { useGoogleOneTapLogin, GoogleOAuthProvider } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';

// Base URL for API requests
const API_BASE_URL = 'http://127.0.0.1:5001';

interface GoogleSignInButtonProps {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}

const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({ onSuccess, onError }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Use Google One Tap Login for better compatibility
  useGoogleOneTapLogin({
    onSuccess: async (credentialResponse) => {
      if (!credentialResponse.credential) {
        console.error('No credential received from Google');
        return;
      }
      
      setIsLoading(true);
      console.log('Google OAuth token received, sending to backend...');
      
      try {
        // First, check if backend is reachable
        try {
          const healthCheck = await axios.get('/api/health');
          console.log('Backend health check:', healthCheck.status, healthCheck.data);
        } catch (healthError) {
          console.error('Backend health check failed:', healthError);
          throw new Error('Backend server is not responding. Please ensure the backend server is running.');
        }

        // Send token to backend
        console.log('Sending token to backend...');
        const response = await axios.post('/api/auth/google', {
          token: credentialResponse.credential,
          provider: 'google'
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          withCredentials: true
        });

        console.log('Backend response:', response.status, response.data);

        // Call the success callback if provided
        if (onSuccess) {
          onSuccess(response.data);
        }

        // Redirect after successful login
        navigate('/dashboard');

      } catch (error) {
        console.error('Google login failed:', error);
        if (onError) {
          onError(error);
        }
      } finally {
        setIsLoading(false);
      }
    },
    onError: () => {
      const error = new Error('Google login failed. Please try again.');
      console.error('Google login error:', error);
      setIsLoading(false);
      if (onError) {
        onError(error);
      }
    },
    // One Tap specific options
    auto_select: false, // Don't auto-select the account
    cancel_on_tap_outside: true // Close the One Tap UI when clicking outside
  });

  return (
    <button 
      className="google-signin-button "
      type="button"
      disabled={isLoading}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        padding: '10px 16px',
        backgroundColor: 'white',
        border: '1px solid #e0e0e0',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: 500,
        marginTop: '20px',
        color: '#3c4043',
        boxShadow: '0 1px 2px 0 rgba(60, 64, 67, 0.3), 0 1px 3px 1px rgba(60, 64, 67, 0.15)',
        transition: 'background-color 0.2s, box-shadow 0.2s',
      }}
      onClick={() => {
        // One Tap UI will be shown automatically
        console.log('Google Sign-In button clicked');
      }}>
      {isLoading ? (
        <span>Signing in...</span>
      ) : (
        <>
          <FcGoogle style={{ marginRight: '10px', fontSize: '20px' }} />
          <span>Sign in with Google</span>
        </>
      )}
    </button>
  );
};

export default GoogleSignInButton;