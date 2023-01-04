import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

type Msg = {
  msgId: number;
  userId: number;
  content: string;
};

const Chat = () => {
  const [socket, setSocket] = useState<WebSocket>();
  const [msgList, setMsgList] = useState<Msg[]>([]);
  const [msg, setMsg] = useState<string>('');
  const [msgId, setMsgId] = useState<number>(0);
  const [userId, setUserId] = useState<number>(1);

  useEffect(() => {
    console.log('create socket');
    setSocket(new WebSocket('ws://localhost:3000'));

    return socket?.close();
  }, []);

  useEffect(() => {
    console.log('set socket');
    setMsgList([]);
    socket?.addEventListener('open', () => {
      console.log('connected to Server');
    });

    socket?.addEventListener('message', async (message) => {
      const msg = JSON.parse(message.data);
      console.log('got message:', msg);
      setMsgList((prev) => [...prev, msg]);
    });

    socket?.addEventListener('close', () => {
      console.log('closed channel');
    });
  }, [socket]);

  const handleMsgChange = (e: React.FormEvent<HTMLInputElement>) => {
    setMsg(e.currentTarget.value);
  };

  const handleMsgSubmit = () => {
    console.log('send message');
    console.log('ws ready state: ', socket?.readyState);
    const message = JSON.stringify({
      msgId: msgId,
      userId: userId,
      content: msg,
    });
    socket?.send(message);
    setMsgId(msgId + 1);
    setMsg('');
  };

  // TODO: disconnect socket on component unmount lifecycle
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    console.log('msgList: ', msgList);
    if (!ref.current) return;
    ref.current.scrollIntoView({ behavior: 'smooth' });
  }, [msgList]);
  return (
    <Wrapper>
      <Title>Chat</Title>
      <Contents>
        {msgList.map((msg, idx) => {
          if (msg.userId === userId) {
            return (
              <MsgRow key={msg.msgId}>
                <MyMsgBox>{msg.content}</MyMsgBox>
              </MsgRow>
            );
          }

          if (idx === msgList.length - 1) {
            <MsgRow key={msg.msgId} ref={ref}>
              <MyMsgBox>{msg.content}</MyMsgBox>
            </MsgRow>;
          }
          return (
            <MsgRow key={msg.msgId}>
              <UserInfo>
                <UserImg />
              </UserInfo>
              <MsgBox>
                {msg.userId} : {msg.content}
              </MsgBox>
            </MsgRow>
          );
        })}
      </Contents>
      <InputWrapper>
        <Input
          value={msg}
          onChange={handleMsgChange}
          type='text'
          placeholder='메세지를 입력해주세요'
        />
        <Btn onClick={handleMsgSubmit}>전송</Btn>
      </InputWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
`;

const Title = styled.h1``;

const Contents = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background-color: #e4f7ea;
  overflow-y: auto;
`;

const MsgRow = styled.div`
  padding: 20px;
  display: flex;
  justify-content: row;
  gap: 10px;
`;

const UserInfo = styled.div``;

const UserImg = styled.img`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  border: 1px solid black;
`;

const MsgBox = styled.div`
  float: left;
  padding: 20px;
  width: auto;
  background-color: #2bc470;
  border-radius: 25px 25px 25px 0;
  font-size: 16px;
`;

const MyMsgBox = styled(MsgBox)``;

const InputWrapper = styled.div`
  padding: 20px 0;
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

const Input = styled.input`
  width: 95%;
  height: 50px;
  text-indent: 10px;
`;

const Btn = styled.button`
  height: 50px;
  padding: 5px 20px;
  background-color: #2bc470;
  border: none;
  :hover {
    cursor: pointer;
    background-color: #e4f7ea;
  }
`;

export default Chat;
