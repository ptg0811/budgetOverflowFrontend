export interface IUserProfile {
  img: string;
  nickname: string;
  description: string;
}

export interface IGoals {
  goals: Array<IGoal>;
}

export interface IGoal {
  id: number;
  emoji: string;
  title: string;
  description: string;
  isPrivate: boolean;
  hashtag: Array<string>;
  amount: number;
  attainment: number;
  startDate: Date;
  endDate: Date;
  headCount: number;
}

export interface IBank {
  id: number;
  code: string;
  name: string;
}

export interface IPostAuthAccnt {
  oriSeqNo: string;
  authString: string;
}

export interface IPostGoal {
  emoji: string;
  title: string;
  description: string;
  amount: number;
  hashTag: Array<string>;
  startDate: Date;
  endDate: Date;
  headCount: number;
  isPrivate: boolean;
  isManual: boolean;
  accntId: number;
}

export interface IAccount {
  id: number;
  bankId: number;
  accntNo: string;
}

export interface IReqAuthAccout {
  bankCode: string;
  accntNo: string;
}

export interface IAuthAccount {
  oriSeqNo: string;
  authString: string;
}

export interface IValidateAccount {
  bankCode: string;
  bankUserId: string;
  bankUserPw: string;
  accntNo: string;
  accntPw: string;
}

export interface IPostAccount {
  bankId: number;
  bankUserId: string;
  bankUserPw: string;
  accntNo: string;
  accntPw: string;
}

export interface IBadge {
  title: string;
  description: string;
}

export interface IMembers {
  nickname: string;
  achieveRate: number;
}

export interface IGetGoalDetail {
  result: {
    goalId: number;
    userId: number;
    nickname: string;
    amount: number;
    curCount: number;
    headCount: number;
    startDate: Date;
    endDate: Date;
    title: string;
    hashtag: Array<string>;
    createdAt: Date;
    updatedAt: Date;
    members: Array<IMembers>;
  };
}

export interface IParticapantInfoProps {
  userId?: number;
  nickname: string;
  img?: string;
  achieveRate: number;
}

export interface MyToken {
  userId: number;
  tokenType: string;
  iat: number;
  exp: number;
}

export interface IUserInfo {
  id: number;
  isLogin: boolean;
  isAccessToken: boolean;
  isRefreshToken: boolean;
}
