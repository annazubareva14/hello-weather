<template>
  <div>
    <form
      class="search-form"
      @submit.prevent="onSearch"
    >
      <input
        v-model.trim="cityName"
        placeholder="Search"
        class="search-input"
      />
      <button
        type="submit"
        class="search-button"
      >
        <img
          src="@/assets/search.svg"
          alt="search"
        />
      </button>
    </form>
  </div>
</template>

<script>
  import { debounce } from 'Utils';

  const debouncedEmit = debounce(() => {
    this.$emit('inputQuery', this.cityName);
  }, 3000);

  export default {
    name: 'HwSearch',

    props: {
      searchQuery: {
        type: String,
        default: '',
      },
      hasDebounce: {
        type: Boolean,
        default: false,
      },
    },

    data() {
      return {
        cityName: this.searchQuery,
      };
    },

    methods: {
      onSearch() {
        this.$emit('search', this.cityName);
        if (this.hasDebounce) {
          debouncedEmit(this.cityName);
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
.search-form {
  position: relative;
  top: 50%;
  left: 50%;
  width: 500px;
  height: 40px;
  box-shadow: 0 6px 4px rgba(0, 0, 0, 0.15);
  transform: translate(-50%, -50%);
  background: #fff;
  transition: all 0.3s ease;

  &.focus {
    box-shadow: 0 3px 4px rgba(0, 0, 0, 0.15);
  }
}

.search-input {
  position: absolute;
  top: 10px;
  left: 15px;
  font-size: 14px;
  background: none;
  color: #5a6674;
  width: 440px;
  height: 20px;
  border: none;
  appearance: none;
  outline: none;

  &::-webkit-search-cancel-button {
    appearance: none;
  }
}

.search-button {
  position: absolute;
  top: 10px;
  right: 15px;
  height: 20px;
  width: 20px;
  padding: 0;
  margin: 0;
  border: none;
  background: none;
  outline: none!important;
  cursor: pointer;

  & img {
    width: 20px;
    height: 20px;
    fill: #5a6674;
  }
}
</style>
