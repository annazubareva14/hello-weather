<template>
      <div class="day__forecast">
        <div class="pic-wrapper">
          <img :src="getImage" alt="weather">
        </div>
        <div class="forecast__temperature">
            <span>Avg Temp:</span>
            <div class="forecast__grad"> {{dayForecast.temp.day}} °C </div>
        </div>
        <div class="forecast__description"> {{dayForecast.weather[0].description}} </div>
        <div class="forecast__date">{{getFormatDate}}</div>
      </div>
</template>

<script>
import { getDate } from 'Utils'
// const transform = dayForecast => ({
//   temperature: dayForecast.
// })

export default {
  name: 'HwDayForecast',

  props: {
    dayForecast: {
      type: Object,
      default: () => ({
        dt: 0,
        temp: {
          day: 0
        },
        weather: [{
          description: '',
          icon: ''
        }]
      })
    }
  },
  computed: {
  //   // day () {
  //   //   return iretateArray(days)
  //   // },
  //   weather () {
  //     return {
  //       temperature: this.complexObject.a.b,
  //     },
  //   // },
  //   day () {
  //     return Object.values(this.dayForecast)
  //   },

    getImage () {
      return `http://openweathermap.org/img/wn/${this.dayForecast.weather[0].icon}@2x.png`
    },
    getFormatDate () {
      return getDate()
    }
  }
}
</script>
<style lang="scss" scoped>
.forecast__temperature {
  margin-bottom: 10px;
}

.forecast__grad {
  font-size: 18px;
}

.forecast__description {
  font-size: 16px;
  margin-bottom: 10px;
}

.forecast__date {
  color: #8796a7;
}
</style>
