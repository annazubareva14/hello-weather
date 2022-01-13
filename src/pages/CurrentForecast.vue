<template>
  <div class="current">
    <div v-if="searchStatus === searchStates.SUCCESS">
      <HwLocation />
      <div class="current__forecast">
        <div class="pic-wrapper">
          <img
            :src="getImage"
            alt="weather"
          />
        </div>
        <div class="temperature">
          {{ currentForecast.main.temp }} °C
        </div>
        <div class="description">
          {{ currentForecast.weather[0].main }}
        </div>
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
  import HwLocation from 'Components/Location/Location.vue';
  import { mapGetters } from 'vuex';
  import { searchStates } from 'Constants';

  export default {
    name: 'HwCurrentForecast',

    components: { HwLocation },

    data() {
      return {
        searchStates,
      };
    },

    computed: {
      ...mapGetters('ForecastModule', ['currentForecast', 'searchStatus']),
      getImage() {
        return `http://openweathermap.org/img/wn/${this.currentForecast.weather[0].icon}@2x.png`;
      },
    },
  };
</script>

<style scoped>
.temperature {
  margin-bottom: 20px;
  font-size: 20px;
}

.description {
  font-size: 18px;
}
</style>
