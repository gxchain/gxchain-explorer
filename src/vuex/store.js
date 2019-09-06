import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    assetList: {},
    symbolsMap: {},
    keywords: '',
    gscatter: null,
    gxc: null,
    contractInfoMap: {}
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
    },
    setPlugin (state, payload) {
        state.gscatter = payload.gscatter;
        state.gxc = payload.gxc;
    },
    setContractInfoMap (state, payload) {
        state.contractInfoMap[payload.key] = payload.content;
    }
};

const actions = {
    setAssetList ({
        commit
    }, payload) {
        commit('setAssetList', payload);
    },
    setSymbolsMap ({
        commit
    }, payload) {
        commit('setSymbolsMap', payload);
    },
    setKeywords ({
        commit
    }, payload) {
        commit('setKeywords', payload);
    },
    setPlugin ({
        commit
    }, payload) {
        commit('setPlugin', payload);
    },
    setContractInfoMap ({
        commit
    }, payload) {
        commit('setContractInfoMap', payload);
    }
};

const getters = {
    assetList: state => state.assetList,
    symbolsMap: state => state.symbolsMap,
    keywords: state => state.keywords,
    gscatter: state => state.gscatter,
    gxc: state => state.gxc,
    contractInfoMap: state => state.contractInfoMap
};

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
});
