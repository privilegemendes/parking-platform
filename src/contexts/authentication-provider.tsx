import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useAndRequireContext } from '~/hooks/use-and-require-context';
import { wait } from '~/lib/utils';

interface Props {
  children: ReactNode;
}

export type AuthContext = {
  isAuthenticated: boolean;
  authToken: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
};

export type AuthResponse = {
  data: {
    user: {
      id: string;
      email: string;
    };
    auth: {
      accessToken: string;
      expiresIn: number;
    };
  };
};

const ContextRef = createContext<AuthContext | undefined>(undefined);

function getAuthToken() {
  const token = localStorage.getItem('token');
  const expiration = localStorage.getItem('token_expiration');
  if (token && expiration && Date.now() < Number(expiration)) {
    return token;
  }
  return null;
}

function storeAuthToken(token: string | null, expiresIn: number | null) {
  if (token && expiresIn) {
    const expirationTime = Date.now() + expiresIn * 1000; // expiresIn is in seconds
    localStorage.setItem('token', token);
    localStorage.setItem('token_expiration', expirationTime.toString());
  } else {
    localStorage.removeItem('token');
    localStorage.removeItem('token_expiration');
  }
}

export const AuthenticationProvider: FC<Props> = ({ children }) => {
  const [authToken, setAuthToken] = useState<string | null>(getAuthToken());
  const isAuthenticated = !!authToken;

  // Initialize authToken from localStorage on mount
  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      setAuthToken(token);
    }
  }, []);

  useEffect(() => {
    if (authToken) {
      const expiration = localStorage.getItem('token_expiration');
      const timeLeft = expiration ? Number(expiration) - Date.now() : 0;

      if (timeLeft > 0) {
        const timeout = setTimeout(() => {
          setAuthToken(null);
          storeAuthToken(null, null);
        }, timeLeft);

        return () => clearTimeout(timeout);
      } else {
        setAuthToken(null);
        storeAuthToken(null, null);
      }
    }
  }, [authToken]);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const response: Response = await fetch('/v1/auth/password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data: AuthResponse = await response.json();
        const { accessToken, expiresIn } = data.data.auth;

        await wait(500).then(() => {
          setAuthToken(accessToken);
          storeAuthToken(accessToken, expiresIn);
        });
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  }, []);

  const logout = useCallback(async () => {
    await wait(250).then(() => {
      setAuthToken(null);
      storeAuthToken(null, null);
    });
  }, []);

  return (
    <ContextRef.Provider value={{ isAuthenticated, authToken, login, logout }}>
      {children}
    </ContextRef.Provider>
  );
};

export const useAuth = () => {
  return useAndRequireContext(ContextRef);
};
