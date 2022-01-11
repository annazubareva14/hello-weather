<template>
  <div
    id="app"
    class="wrapper"
  >
    <HwSearch
      :searchQuery="cityName"
      @search="onSearch"
      @inputQuery="onQueryInput"
    />
    <div
      id="nav"
      class="weather-btns"
    >
      <router-link :to="{ path: '/current-forecast', query: { q: cityName } }">
        <button
          class="weather-btn"
          @click="changeCurrentToTrue"
        >
          current
        </button>
      </router-link>
      <router-link :to="{ path: '/week-forecast', query: { q: cityName } }">
        <button
          class="weather-btn"
          @click="changeCurrentToFalse"
        >
          7 day forecast
        </button>
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
  import { debounce } from 'Utils';
  import { mapActions, mapGetters } from 'vuex';
  import HwCurrentForecast from 'Pages/CurrentForecast.vue';
  import HwWeekForecast from 'Pages/WeekForecast.vue';
  import { searchStates } from 'Constants';

  const debouncedQuery = debounce(function () {
    const { cityName, $router } = this;

    $router.push({
      query: { q: cityName },
    });
  }, 0);

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

      async changeCurrentToTrue() {
        this.isCurrent = true;
        await this.onSearch(this.cityName);
      },

      async changeCurrentToFalse() {
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

      onQueryWatch(cityName) {
        this.cityName = cityName;
        debouncedQuery.call(this);
      },
    },
  };
</script>

<style lang="scss" scoped>
.wrapper {
  margin-top: 50px;
}

.weather-btns {
  display: flex;
  align-items: center;
  justify-content: center;
}

.weather-btn {
  display: block;
  text-decoration: none;
  background: rgba(223, 231, 235, 0);
  padding: 10px;
  width: 180px;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  text-transform: uppercase;
  cursor: pointer;
  border: none;
  font-weight: bold;
  color: inherit;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    text-decoration: none;
    color: #8796a7;

      &.router-link-exact-active {
      color: #2c3d4f;
      background-color: #dfe7eb;
      box-shadow: 0 3px 0 #4ba8cc;
      }
  }
}
</style>
