import { atom } from 'jotai';
import { OrderItem } from '../types';

export const userIdAtom = atom<number>();
export const orderAtom = atom<OrderItem[]>([]);
