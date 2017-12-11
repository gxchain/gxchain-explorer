import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    keywords: ''
};

const mutations = {
    setKeywords (state, payload) {
        state.keywords = payload.keywords;
    }
};

const actions = {
    setKeywords ({commit}, payload) {
        commit('setKeywords', payload);
    }
};

const getters = {
    keywords: state => state.keywords
};

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
});
