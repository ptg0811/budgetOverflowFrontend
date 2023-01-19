import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

import { IPostGoal } from '../interfaces/interfaces';

const { persistAtom } = recoilPersist();

export const postGoalType = atom({
  key: 'postGoalType',
  default: {
    isGroup: false,
  },
  effects_UNSTABLE: [persistAtom],
});

export const postGoal = atom<IPostGoal>({
  key: 'postGoal',
  default: {
    emoji: '26f0-fe0f',
    title: '',
    description: '',
    hashTag: [''],
    amount: 1000,
    startDate: new Date(),
    endDate: new Date(),
    headCount: 1,
    isPrivate: false,
    isManual: false,
    accntId: 0,
  },
  effects_UNSTABLE: [persistAtom],
});

export const goalId = atom({
  key: 'goalId',
  default: {
    id: 1,
  },
});

export const goalDetail = atom({
  key: 'goalDetail',
  default: {
    goalId: 0,
    userId: 0,
    nickname: '',
    amount: 0,
    curCount: 0,
    headCount: 0,
    startDate: new Date(),
    endDate: new Date(),
    title: '',
    hashtag: [''],
    createdAt: new Date(),
    updatedAt: new Date(),
    members: [{ nickname: '', achieveRate: 0 }],
  },
});

export const groupGoals = atom({
  key: 'groupGoals',
  default: [
    {
      id: 0,
      emoji: '',
      title: '',
      description: '',
      isPrivate: false,
      hashtag: [''],
      amount: 0,
      attainment: 0,
      startDate: new Date(),
      endDate: new Date(),
      headCount: 0,
    },
  ],
});
