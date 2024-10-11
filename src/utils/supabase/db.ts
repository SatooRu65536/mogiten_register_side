import { OrderItem } from '../../types';
import { supabase } from './init';

export async function addOrder(order: OrderItem[], userId: number) {
  await supabase.from('order').insert({
    order: order.map((item) => ({ ...item })),
    user_id: userId,
  });
}
