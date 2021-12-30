<template>
  <div class="current__location">
    <h2 class="location__city"> {{currentForecast.name}} </h2>
    <span class="location__country"> {{getFullCountyName}} </span>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { convertCountryCode } from 'Utils'

export default {
  name: 'HwLocation',
  computed: {
    ...mapGetters('ForecastCallModule', ['currentForecast']),
    getFullCountyName () {
      return convertCountryCode(this.currentForecast.sys.country)
    }
  }
}
</script>
<style lang="scss" scoped>
.location__country {
  font-weight: bold;
}
</style>
