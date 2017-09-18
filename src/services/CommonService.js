import Vue from 'vue'
import filters from '@/filters'
const baseURL = location.host;

export const fetch_block = (block_height) => {
  return Vue.http.get(`//${baseURL}/api/block/${block_height}`, {
    responseType: 'json'
  })
}

export const fetch_transaction = (tx_id) => {
  return Vue.http.get(`//${baseURL}/api/transaction/${tx_id}`, {
    responseType: 'json'
  })
}

export const fetch_account = (id_or_name) => {
  return Vue.http.get(`//${baseURL}/api/account/${id_or_name}`, {
    responseType: 'json'
  })
}

export const fetch_account_balance = (id_or_name) => {
  return Vue.http.get(`//${baseURL}/api/account_balance/${id_or_name}`, {
    responseType: 'json'
  })
}

export const fetch_product = (product_id) => {
  return Vue.http.get(`//${baseURL}/api/product/${product_id}`, {
    responseType: 'json'
  })
}

export const formatted_asset = (asset_id,amount,decimalOffset) => {
  switch (asset_id){
    case '1.3.0':
      return filters.number((amount / 100000).toFixed(decimalOffset),5) + ' GXC';
      break;
    case '1.3.1':
      return filters.number((amount / 100000).toFixed(decimalOffset),5) + ' GXS';
      break;
    default:
      return amount;
  }
}

let fallbackStore = {};
export const set_item = (key, val) => {
  try {
    localStorage.setItem(key, val);
  }
  catch (ex) {
    console.log('fallback to memory store');
    fallbackStore[key] = val;
  }
}

export const get_item = (key) => {
  try {
    return localStorage.getItem(key);
  }
  catch (ex) {
    return fallbackStore[key];
  }

}
