import { OrderItem } from '../../types';
import { supabase } from './init';
import { ofetch } from 'ofetch';
import { joinURL } from 'ufo';

const KEY_URL = import.meta.env.VITE_KEY_URL;

export async function addOrder(order: OrderItem[], key: string) {
  const res = await ofetch(joinURL(KEY_URL, key), {
    parseResponse: JSON.parse,
  });

  const { id } = res;

  await supabase.from('order').insert({
    order: order.map((item) => ({ ...item })),
    user_id: id,
  });
}
