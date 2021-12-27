<template>
  <div id="app" class="wrapper">
    <HwSearch @searchInput="onSearchInput" :searchQuery="cityName"/>
    <div id="nav" class="weather-btns">
      <router-link :to="{ path: '/current-forecast', query: { q: cityName } }">
        <button
        class="weather-btn"
        @click="isCurrent = true"
        >
          current
        </button>
      </router-link>
      <router-link :to="{ path: '/week-forecast', query: { q: cityName } }">
        <button
        class="weather-btn"
        @click="isCurrent = false"
        >
          7 day forecast
        </button>
      </router-link>
    </div>
    <div>
      <HwCurrentForecast v-if="isCurrent" />
      <HwWeekForecast v-else />
    </div>
     <!-- <div v-if="searchStatus === searchStates.FAILURE">
      <span>Something went wrong. Please refresh the page and try again.</span>
    </div> -->
  </div>
</template>
<script>
import HwSearch from 'Components/Search/HWSearch.vue'
import { debounce } from 'Utils'
import { mapActions, mapGetters } from 'vuex'
import HwCurrentForecast from 'Pages/CurrentForecast.vue'
import HwWeekForecast from 'Pages/WeekForecast.vue'
import { searchStates } from 'Constants'

const debouncedSearch = debounce(async function () {
  const { cityName, isCurrent, getCurrentForecast, getWeekForecast, $router } = this

  if (cityName.length > 2) {
    if (isCurrent) {
      await getCurrentForecast({ cityName })
      getWeekForecast()
    } else {
      getWeekForecast()
    }
  }
  $router.push({
    query: { q: cityName }
  })
}, 300)

export default {
  name: 'HWApp',
  components: { HwSearch, HwCurrentForecast, HwWeekForecast },
  data () {
    return {
      cityName: '',
      isCurrent: true,
      searchStates
    }
  },
  // async mounted () {
  //   const { q } = this.$route.query

  //   if (q) {
  //     this.cityName = q
  //     debouncedSearch.call(this)
  //   }
  // },
  methods: {
    ...mapActions('ForecastCallModule', ['getCurrentForecast', 'getWeekForecast']),
    onSearchInput (cityName) {
      this.cityName = cityName
      debouncedSearch.call(this)
    }
  },
  computed: {
    ...mapGetters('ForecastCallModule', ['searchStatus'])
  }
}
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
