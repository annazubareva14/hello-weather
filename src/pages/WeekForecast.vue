<template>
  <div class="week__forecast">
    <div v-if="searchStatus === searchStates.SUCCESS">
      <HwLocation />
    <div class="week__forecast--wrapper">
      <div
        v-for="(day, idx) in daily"
        :key="idx"
        class="day__forecast"
      >
        <HwDayForecast :dayForecast="day"/>
      </div>
    </div>
    </div>
    <div v-if="searchStatus === searchStates.IDLE">
      <span>
        Enter the location to find out what the weather for the next week is
      </span>
    </div>
     <div v-if="searchStatus === searchStates.FAILURE">
      <span>Your location is not found</span>
    </div>
  </div>
</template>
<script>
import HwDayForecast from 'Components/DayForecast/DayForecast.vue'
import HwLocation from 'Components/Location/Location.vue'
import { mapGetters } from 'vuex'
import { searchStates } from 'Constants'
import { addDay, formatDate } from 'Utils'

export default {
  components: { HwDayForecast, HwLocation },
  name: 'HwWeekForecast',
  data () {
    return {
      searchStates
    }
  },
  computed: {
    ...mapGetters('ForecastCallModule', ['currentForecast', 'weekForecast', 'searchStatus']),
    daily () {
      return this.weekForecast
        ? this.weekForecast.daily.map((day, index) => ({
          ...day,
          date: formatDate(addDay(new Date(), index))
        })).slice(1)
        : []
    }
    // forecast () {
    //   return apiResponse.daily.map((day) => ({
    //       temperature: day.temp.day,

    //   }));
    // }
  }
}
</script>
<style lang="scss" scoped>
.location__country {
  font-weight: bold;
}

.week__forecast--wrapper {
    display: flex;
    flex-flow: wrap;
    justify-content: center;
}
.day__forecast {
  margin-right: 20px;
  font-size: 14px;
  &:last-child {
    margin-right: 0;
  }
}
</style>
