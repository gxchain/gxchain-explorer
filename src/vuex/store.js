import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    symbolsMap: {},
    keywords: ''
};

const mutations = {
    setSymbolsMap (state, payload) {
        state.symbolsMap = payload.symbolsMap;
    },
    setKeywords (state, payload) {
        state.keywords = payload.keywords;
    }
};

const actions = {
    setSymbolsMap ({commit}, payload) {
        commit('setSymbolsMap', payload);
    },
    setKeywords ({commit}, payload) {
        commit('setKeywords', payload);
    }
};

const getters = {
    symbolsMap: state => state.symbolsMap,
    keywords: state => state.keywords
};

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
});
