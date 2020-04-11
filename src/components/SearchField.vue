<template>
    <div class="search-bar">
        <div class="search-bar-content">
            <input type="text" placeholder="Search..." v-model="searchTerm">
        </div>
    </div>
</template>

<script>
export default {
    computed: {
      searchTerm: {
      get() {
        return this.$store.state.searchTerm;
      },
      set(value) {
        this.$store.commit('UPDATE_SEARCH_TERM', value)
      }
    } 
    }
}
</script>

<style lang="scss">
.search-bar {
    width: 100%;
    height: 105px;
    background: #1c1c1c;
    position: relative;
    padding: 25px 20px 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #fff;
}
.search-bar-content {
    max-width: 1280px;
    width: 100%;
    height: 55px;
    background: #353535;
    margin: 0 auto;
    border-radius: 40px;
    position: relative;
    color: #fff;

    input {
    font-size: 38px;
    position: absolute;
    left: 70px;
    top: 7px;
    border: 0;
    background: transparent;
    height: 40px;
    width: 88%;
    color: #fff;
    }
}
</style>