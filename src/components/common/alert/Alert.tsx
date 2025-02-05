import React from 'react';
import styled from 'styled-components';

interface AlertProps {
  height: number;
  showBgColor: boolean;
  children: React.ReactNode;
}

const Alert = ({ height, showBgColor, children }: AlertProps) => {
  return (
    <AlertWrapper height={`${height}px`}>
      <AlertBox showBgColor={showBgColor}>{children}</AlertBox>
    </AlertWrapper>
  );
};

const AlertWrapper = styled.div<{ height: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: ${(props) => props.height};
`;

const AlertBox = styled.div<{ showBgColor: boolean }>`
  padding: 20px 0;
  width: 100%;
  border-radius: 16px;
  background-color: ${(props) => (props.showBgColor ? props.theme.gray300 : 'transparent')};
`;

export default Alert;
