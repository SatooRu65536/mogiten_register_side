import { atom } from 'jotai';
import { OrderItem } from '../types';

export const orderAtom = atom<OrderItem[]>([]);
