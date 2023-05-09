import Button from '@mui/material/Button';
import { useAuth0 } from '@auth0/auth0-react';

function LoginButton() {
  const { loginWithRedirect } = useAuth0();
  return (
    <Button
      onClick={() => loginWithRedirect()}
      variant="contained"
    >
      Continue
    </Button>
  );
}

export default LoginButton;
