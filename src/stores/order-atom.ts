import { atom } from 'jotai';
import { OrderItem } from '../types';

export const userIdAtom = atom<string>();
export const orderAtom = atom<OrderItem[]>([]);
