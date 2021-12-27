<template>
    <div>
        <router-link class="weather-btn" to="/current-forecast">{{text}}</router-link>
    </div>
</template>
<script>
export default {
  name: 'HWButton',
  props: {
    text: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
