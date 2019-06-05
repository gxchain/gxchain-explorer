import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    assetList: {},
    symbolsMap: {},
    keywords: ''
};

const mutations = {
    setAssetList (state, payload) {
        state.assetList = payload.assetList;
    },
    setSymbolsMap (state, payload) {
        state.symbolsMap = payload.symbolsMap;
    },
    setKeywords (state, payload) {
        state.keywords = payload.keywords;
    }
};

const actions = {
    setAssetList ({commit}, payload) {
        commit('setAssetList', payload);
    },
    setSymbolsMap ({commit}, payload) {
        commit('setSymbolsMap', payload);
    },
    setKeywords ({commit}, payload) {
        commit('setKeywords', payload);
    }
};

const getters = {
    assetList: state => state.assetList,
    symbolsMap: state => state.symbolsMap,
    keywords: state => state.keywords
};

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
});
