import React from 'react';
import styled from 'styled-components';

import KakaoSignupButton from '../components/users/signup/KakaoSignupButton';
import NaverSignupButton from '../components/users/signup/NaverSignupButton';
import GoogleSignupButton from '../components/users/signup/GoogleSignupButton';

// TODO: media query 설정
const LoginPage = () => {
  return (
    <Wrapper>
      <KakaoSignupButton />
      <NaverSignupButton />
      <GoogleSignupButton />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

export default LoginPage;
