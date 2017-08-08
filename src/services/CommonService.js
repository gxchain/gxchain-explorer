import Vue from 'vue'

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
