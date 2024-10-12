import { itemList } from '../../const/items';
import { OrderItem } from '../../types';
import { supabase } from './init';
// import { ofetch } from 'ofetch';
// import { joinURL } from 'ufo';

const KEY_URL = import.meta.env.VITE_KEY_URL;

export async function addOrder(order: OrderItem[], key: string) {
  // console.log('key:', key);
  // const res = await ofetch(joinURL(KEY_URL, key), {
  //   parseResponse: JSON.parse,
  // });

  await supabase.from('order').insert({
    order: { order: order.map((item) => ({ ...item })), itmes: itemList },
    user_id: 0,
  });
}
