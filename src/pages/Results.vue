<template>
<div>
        <div class="search-bar">
            <div class="search-bar-content">
        <input type="text" v-model="term" @keyup.enter="fetchResults" placeholder="Type a movie">
    </div>
    </div>
        <MainView :movies="results"></MainView>

</div>

</template>

<script>
    import axios from 'axios'
    import MainView from '@/components/MainView.vue'

    export default {
    name: 'results',
    components: {
        MainView
    },
    data() {
        return {
            term: '',
            results: []
        }
    },
    computed: {
        unicodeUriTerm() {
            return encodeURI(this.term);
        }
    },
    methods: {
        fetchResults() {
            axios.get(`https://api.themoviedb.org/3/search/movie?api_key=d1a4edd7c25b0afc72e1f8debe620e61&language=en-US&page=1+2&include_adult=false&query=${this.unicodeUriTerm}`)
            // .then(response => response.json())
            .then (res => {
                this.results = res.data.results.filter(el => el.backdrop_path !== null && el.poster_path !== null);
            })
            .catch(e => console.log(e))
        }
    }
}
</script>

<style scoped lang="scss">
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