// user
export interface IUserProfile {
  image: string;
  nickname: string;
  description: string;
}

// token
export interface MyToken {
  userId: number;
  tokenType: string;
  iat: number;
  exp: number;
}

// goal
export interface IGoals {
  result: Array<IGoal>;
}

export interface IGoal {
  userId: number;
  goalId: number;
  nickname: string;
  amount: number;
  attainment: number;
  curCount: number;
  headCount: number;
  startDate: Date;
  endDate: Date;
  title: string;
  hashtag: Array<string>;
  emoji: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  isPrivate: boolean;
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
  accountId: number;
}

export interface ISearchGoal {
  userId: number;
  goalId: number;
  nickname: string;
  amount: number;
  curCount: number;
  headCount: number;
  startDate: Date;
  endDate: Date;
  title: string;
  hashTag: Array<string>;
  emoji: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IGoalDetail {
  createdUserId: number;
  id: number;
  title: string;
  emoji: string;
  description: string;
  isPrivate: boolean;
  hashTag: Array<string>;
  amount: number;
  attainment: number;
  startDate: Date;
  endDate: Date;
  curCount: number;
  headCount: number;
  members: Array<IMemeberInfo>;
}

export interface IMemeberInfo {
  userId: number;
  nickname: string;
  img: string;
  attainment: number;
}

// account
export interface IBank {
  bankId: number;
  bankCode: string;
  bankName: string;
}

export interface IPostAuthAccnt {
  oriSeqNo: string;
  authString: string;
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

// badge
export interface IBadge {
  title: string;
  description: string;
}
