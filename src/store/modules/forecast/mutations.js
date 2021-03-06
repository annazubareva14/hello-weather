import mutationTypes from './mutationTypes';

const mutations = {
  [mutationTypes.SET_CURRENT_F0RECAST](state, data) {
    state.currentForecast = data;
  },
  [mutationTypes.SET_COORD](state) {
    state.coord = state.currentForecast.coord;
  },
  [mutationTypes.SET_WEEK_FORECAST](state, data) {
    state.weekForecast = data;
  },
  [mutationTypes.SET_SEARCH_STATUS](state, status) {
    state.searchStatus = status;
  },
  [mutationTypes.CLEAR_SEARCH_RESULTS](state) {
    state.currentForecast = null;
    state.weekForecast = null;
    state.coord = null;
  },
};

export default mutations;
