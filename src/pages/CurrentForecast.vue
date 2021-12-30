<template>
  <div class="current">
    <div v-if="searchStatus === searchStates.SUCCESS">
      <HwLocation />
      <div class="current__forecast">
        <div class="forecast__pic-wrapper">
          <img :src="getImage" alt="weather">
        </div>
        <div class="forecast__temperature"> {{currentForecast.main.temp}} °C </div>
        <div class="forecast__description"> {{currentForecast.weather[0].main}} </div>
      </div>
    </div>
    <div v-if="searchStatus === searchStates.IDLE">
      <span>
        Enter the location to find out what the weather today is
      </span>
    </div>
    <div v-if="searchStatus === searchStates.FAILURE">
      <span>Your location is not found</span>
    </div>
  </div>
</template>
<script>
import HwLocation from 'Components/Location/Location.vue'
import { mapGetters } from 'vuex'
import { searchStates } from 'Constants'

export default {
  components: { HwLocation },
  name: 'HwCurrentForecast',
  data () {
    return {
      searchStates
    }
  },
  computed: {
    ...mapGetters('ForecastCallModule', ['currentForecast', 'searchStatus']),
    getImage () {
      return `http://openweathermap.org/img/wn/${this.currentForecast.weather[0].icon}@2x.png`
    }
  }
}
</script>

<style lang="scss" scoped>
.location__country {
  font-weight: bold;
}

.forecast__temperature {
  margin-bottom: 20px;
  font-size: 20px;
}

.forecast__description {
  font-size: 18px;
}
</style>
