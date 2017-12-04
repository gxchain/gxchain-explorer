import Vue from 'vue'
const baseURL = location.host;

export const get_rank = (typeid) => {
  return Vue.http.get(`//${baseURL}/api/holdrank/${typeid}`, {
    responseType: 'json'
  })
}
