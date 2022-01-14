import { axios } from 'Services';
import { API_KEY } from 'Constants';
import mutationTypes from './mutationTypes';

const actions = {
  async getCurrentForecast({ commit }, cityName) {
    try {
      const { data } = await axios.get('/weather', { params:
        { q: cityName,
          units: 'metric',
          appid: API_KEY },
      });

      commit(mutationTypes.SET_CURRENT_F0RECAST, data);
      commit(mutationTypes.SET_COORD);
      commit(mutationTypes.SET_SEARCH_STATUS, 'success');
    } catch (err) {
      commit(mutationTypes.SET_SEARCH_STATUS, 'failure');
      commit(mutationTypes.CLEAR_SEARCH_RESULTS);
    }
  },

  async getWeekForecast({ commit, state }) {
    const { lat, lon } = state.coord;

    try {
      const { data } = await axios.get('/onecall', { params:
        { lat,
          lon,
          exclude: 'alerts',
          units: 'metric',
          appid: API_KEY },
      });

      commit(mutationTypes.SET_WEEK_FORECAST, data);
      commit(mutationTypes.SET_SEARCH_STATUS, 'success');
    } catch (err) {
      commit(mutationTypes.SET_SEARCH_STATUS, 'failure');
      commit(mutationTypes.CLEAR_SEARCH_RESULTS);
    }
  },

  clearSearchResults({ commit }) {
    commit(mutationTypes.CLEAR_SEARCH_RESULTS);
    commit(mutationTypes.SET_SEARCH_STATUS, 'idle');
  },
};

export default actions;
