import { axios } from 'Services'
import mutationTypes from './mutationTypes'

const actions = {
  async getCurrentForecast ({ commit }, { cityName }) {
    try {
      const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=b6e9df68f337738ffa21d34dbbc17f20`)

      commit(mutationTypes.SET_CURRENT_F0RECAST, data)
      commit(mutationTypes.SET_COORD)
      commit(mutationTypes.SET_SEARCH_STATUS, 'success')
    } catch (err) {
      commit(mutationTypes.SET_SEARCH_STATUS, 'failure')
    }
  },

  async getWeekForecast ({ commit, state }) {
    const { lat, lon } = state.coord

    try {
      const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=alerts&units=metric&appid=b6e9df68f337738ffa21d34dbbc17f20`)

      commit(mutationTypes.SET_WEEK_FORECAST, data)
      commit(mutationTypes.SET_SEARCH_STATUS, 'success')
    } catch (err) {
      commit(mutationTypes.SET_SEARCH_STATUS, 'failure')
    }
  }
}

export default actions
