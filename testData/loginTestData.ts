export type AuthType = 'http' | 'form';

export interface LoginTestCase {
  name: string;
  path: string;
  authType: AuthType;
  username: string;
  password: string;
  expectedMessage: string;
  isSuccess: boolean;
  skipFirefox?: boolean; // For that specific Digest Auth edge case
}

export const loginTestData: LoginTestCase[] = [
  {
    name: 'Login(BasicAuth)_EnterCorrectCred_LoginSuccess',
    path: '/basic_auth',
    authType: 'http',
    username: 'admin',
    password: 'admin',
    expectedMessage: 'Congratulations!',
    isSuccess: true,
  },
  {
    name: 'Login(DigestAuth)_EnterCorrectCred_LoginSuccess',
    path: '/digest_auth',
    authType: 'http',
    username: 'admin',
    password: 'admin',
    expectedMessage: 'Congratulations!',
    isSuccess: true,
  },
    {
    name: 'Login(FormAuth)_EnterCorrectCred_LoginSuccess',
    path: '/login',
    authType: 'form',
    username: 'tomsmith',
    password: 'SuperSecretPassword!',
    expectedMessage: 'You logged into a secure area!',
    isSuccess: true,
  },
  {
    name: 'Login(BasicAuth)_EnterWrongCred_LoginFailed',
    path: '/basic_auth',
    authType: 'http',
    username: 'admin',
    password: 'wrong',
    expectedMessage: 'Congratulations!',
    isSuccess: false,
  },
  {
    name: 'Login(DigestAuth)_EnterWrongCred_LoginFailed',
    path: '/digest_auth',
    authType: 'http',
    username: 'admin',
    password: 'wrong',
    expectedMessage: 'Congratulations!',
    isSuccess: false,
    skipFirefox: true,
  },
  {
    name: 'Login(FormAuth)_EnterWrongUsername_LoginFailed',
    path: '/login',
    authType: 'form',
    username: 'willsmith',
    password: 'SuperSecretPassword!',
    expectedMessage: 'Your username is invalid!',
    isSuccess: false,
  },
  {
    name: 'Login(FormAuth)_EnterWrongPass_LoginFailed',
    path: '/login',
    authType: 'form',
    username: 'tomsmith',
    password: 'wrongpassword',
    expectedMessage: 'Your password is invalid!',
    isSuccess: false,
  }
];