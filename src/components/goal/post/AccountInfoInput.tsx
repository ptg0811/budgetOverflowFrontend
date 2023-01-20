import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import ProgressBar from '../../common/elem/ProgressBar';
import InputBox from '../../common/elem/InputBox';
import ValidateMsg from '../../common/elem/ValidateMsg';
import TextButton from '../../common/elem/TextButton';
import Info from '../../common/alert/Info';

import useTxtInput from '../../../hooks/useTxtInput';
import { IValidateAccount } from '../../../interfaces/interfaces';
import { accountApi, bankAPI, goalApi } from '../../../apis/client';
import { useRecoilValue } from 'recoil';
import { accntInfo, banksInfo } from '../../../recoil/accntAtoms';
import { userInfo, userProfile } from '../../../recoil/userAtoms';
import { postGoal } from '../../../recoil/goalsAtoms';

interface AccountInfoInputProps {
  goalIdHandler: (goalId: number) => void;
}

function AccountInfoInput({ goalIdHandler }: AccountInfoInputProps) {
  const {
    value: accntPW,
    errMsg: accntPWErr,
    onChange: changeAccntPW,
    reset: resetAccntPW,
  } = useTxtInput({
    initValue: '',
    minLength: 4,
    maxLength: 4,
    type: '계좌 비밀번호',
    regExp: /^[0-9]{0,4}$/g,
  });
  const {
    value: bankUserId,
    errMsg: bankUserIdErr,
    onChange: changeBankUserId,
    reset: resetBankUserId,
  } = useTxtInput({
    initValue: '',
    minLength: 1,
    maxLength: 100,
    type: '인터넷 뱅킹 아이디',
    regExp: /^[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\s]*$/,
  });
  const {
    value: bankUserPW,
    errMsg: bankUserPWErr,
    onChange: changeBankUserPW,
    reset: resetBankUserPW,
  } = useTxtInput({
    initValue: '',
    minLength: 1,
    maxLength: 100,
    type: '인터넷 뱅킹 비밀번호',
    regExp: /(?=[\S]*[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣])(?=[\S]*[0-9])/g,
  });

  const [isValid, setIsValid] = useState<boolean>(false);
  useEffect(() => {
    if (accntPW.length === 0 || accntPWErr.length !== 0) return setIsValid(false);
    if (bankUserId.length === 0 || bankUserIdErr.length !== 0) return setIsValid(false);
    if (bankUserPW.length === 0 || bankUserPWErr.length !== 0) return setIsValid(false);

    setIsValid(true);
  }, [accntPWErr, bankUserIdErr, bankUserPWErr]);

  const savedAccntInfo = useRecoilValue(accntInfo);
  const [accnt, setAccnt] = useState<IValidateAccount>({
    bankCode: savedAccntInfo.bankCode,
    bankUserId: '',
    bankUserPw: '',
    accntNo: savedAccntInfo.accntNo,
    accntPw: '',
  });
  useEffect(() => {
    setAccnt((prev) => {
      return { ...prev, accntPw: accntPW, bankUserId: bankUserId, bankUserPw: bankUserPW };
    });
  }, [accntPW, bankUserId, bankUserPW]);

  const [isValidAccnt, setIsValidAccnt] = useState<boolean>(false);
  const handleAccntValidate = async () => {
    try {
      const { data } = await bankAPI.validateAccntInfo(accnt);
      console.log('accnt validation response:', data);
      setIsValidAccnt(true);
      await handlePostGoal();
    } catch (e) {
      alert(e);
      setIsValidAccnt(false);
    }
  };

  const { id } = useRecoilValue(userInfo);
  const banks = useRecoilValue(banksInfo);
  const getBankId = () => {
    const bank = banks.find((bank) => bank.bankCode === accnt.bankCode);
    if (!bank) return 0;
    return bank.bankId;
  };
  const [isPosted, setIsPosted] = useState<boolean>(false);
  const savedPostGoal = useRecoilValue(postGoal);
  const handlePostGoal = async () => {
    try {
      const accountId = await accountApi.createAutoAccount(id, { ...accnt, bankId: getBankId() });
      setTimeout(() => setIsPosted(true), 2000);
      const goalId = await goalApi.postGoal({ ...savedPostGoal, accountId: accountId });
      setTimeout(() => goalIdHandler(goalId), 3000);
    } catch (e) {
      alert(e);
      setIsPosted(false);
    }
  };

  const { nickname } = useRecoilValue(userProfile);

  if (!isValidAccnt && !isPosted)
    return (
      <Wrapper>
        <ContentWrapper>
          <TopContent>
            <ProgressBar percentage={100} height={4} borderRadius={0} />
            <StateTitle>
              계좌 인증을 위한
              <br /> 계좌 정보를 입력해 주세요.
            </StateTitle>
          </TopContent>
          <BottomContent>
            <ContentBox>
              <SubTitle>계좌 비밀번호</SubTitle>
              <InputWrapper>
                <InputBox
                  placeholder='계좌 비밀번호를 입력해주세요'
                  type='password'
                  value={accntPW}
                  onChangeHandler={changeAccntPW}
                />
              </InputWrapper>
              <ValidateMsg msg={accntPWErr} type='error' />
            </ContentBox>
            <ContentBox>
              <SubTitle>인터넷 뱅킹 아이디</SubTitle>
              <InputWrapper>
                <InputBox
                  placeholder='인터넷 뱅킹 아이디를 입력해주세요'
                  type='text'
                  value={bankUserId}
                  onChangeHandler={changeBankUserId}
                />
              </InputWrapper>
              <ValidateMsg msg={bankUserIdErr} type='error' />
            </ContentBox>
            <ContentBox>
              <SubTitle>인터넷 뱅킹 비밀번호</SubTitle>
              <InputWrapper>
                <InputBox
                  placeholder='인터넷 뱅킹 비밀번호를 입력해주세요'
                  type='password'
                  value={bankUserPW}
                  onChangeHandler={changeBankUserPW}
                />
              </InputWrapper>
              <ValidateMsg msg={bankUserPWErr} type='error' />
            </ContentBox>
          </BottomContent>
        </ContentWrapper>
        <TextButton text='계좌 연결하기' onClickHandler={handleAccntValidate} isDisabled={!isValid} />
      </Wrapper>
    );

  if (isValidAccnt && !isPosted)
    return (
      <Wrapper>
        <Info>
          {`${nickname}`}님의
          <br />
          계좌 연결이 완료되었습니다.
        </Info>
      </Wrapper>
    );

  if (isValidAccnt && isPosted)
    return (
      <Wrapper>
        <Info>목표 생성이 완료되었습니다.</Info>
      </Wrapper>
    );

  return (
    <Wrapper>
      <Info>
        목표 생성이 실패했습니다.
        <br />
        다시 시도해주세요.
        <TextButton text='재시도' onClickHandler={handlePostGoal} />
      </Info>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const TopContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const StateTitle = styled.div`
  width: 100%;
  text-align: left;
  font: ${(props) => props.theme.headingH2};
`;

const BottomContent = styled(TopContent)``;

const ContentBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;

const SubTitle = styled.div`
  font: ${(props) => props.theme.captionC1};
`;

const InputWrapper = styled.div`
  width: 100%;
  height: 30px;
`;

export default AccountInfoInput;
