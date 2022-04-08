<template>
  <div
    id="app"
    class="wrapper"
  >
    <HwSearch
      :searchQuery="cityName"
      hasDebounce
      @search="onSearch"
    />
    <div
      id="nav"
      class="weather-btns"
    >
      <router-link
        :to="{ path: '/current-forecast', query: { q: cityName } }"
        class="weather-btn"
        @click="getCurrentForecastTab"
      >
        current
      </router-link>
      <router-link
        :to="{ path: '/week-forecast', query: { q: cityName } }"
        class="weather-btn"
        @click="getWeekForecastTab"
      >
        7 day forecast
      </router-link>
    </div>
    <div>
      <HwCurrentForecast v-if="isCurrent" />
      <HwWeekForecast v-else />
    </div>
  </div>
</template>
<script>
  import HwSearch from 'Components/Search/HWSearch.vue';
  import { mapActions, mapGetters } from 'vuex';
  import HwCurrentForecast from 'Pages/CurrentForecast.vue';
  import HwWeekForecast from 'Pages/WeekForecast.vue';
  import { searchStates } from 'Constants';

  export default {
    name: 'HWApp',

    components: { HwSearch, HwCurrentForecast, HwWeekForecast },

    data() {
      return {
        cityName: '',
        isCurrent: true,
        searchStates,
      };
    },

    computed: {
      ...mapGetters('ForecastModule', ['searchStatus']),
    },

    async destroyed() {
      await this.clearSearchResults();
    },

    methods: {
      ...mapActions('ForecastModule', ['getCurrentForecast', 'getWeekForecast', 'clearSearchResults']),

      async getCurrentForecastTab() {
        this.isCurrent = true;
        await this.onSearch(this.cityName);
      },

      async getWeekForecastTab() {
        this.isCurrent = false;
        await this.onSearch(this.cityName);
      },

      async onSearch(cityName) {
        this.cityName = cityName;
        if (cityName.length > 2) {
          if (this.isCurrent) {
            await this.getCurrentForecast(cityName);
          } else {
            await this.getCurrentForecast(cityName);
            await this.getWeekForecast(cityName);
          }
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.wrapper {
  margin-top: 50px;
}

.weather-btns {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px 0;
}

.weather-btn {
  display: block;
  padding: 10px;
  width: 180px;
  font-size: 14px;
  text-transform: uppercase;
  font-weight: bold;
  text-decoration: none;
  color: #8796a7;

    &.router-link-exact-active {
      color: #2c3d4f;
      background-color: #dfe7eb;
      box-shadow: 0 3px 0 #4ba8cc;
      }

}
</style>
