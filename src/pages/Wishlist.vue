<template>
<div>
     <!-- <button  v-if="!favoritesIsEmpty" @click="resetFavorites" class="clear-wishlist">Clear Whishlit</button> -->
   <MainView :movies="favorites"></MainView>
   <h2 v-if="favoritesIsEmpty">You didn't pick any movie</h2>
</div>
</template>

<script>
const MainView = () => import ('@/components/MainView.vue');
export default {
    components: {
        MainView
    },
    computed: {
    favorites() {
            return this.$store.getters.getUserFavorites;
    },
    favoritesIsEmpty() {
        return this.favorites.length < 1;
    }
    }
}
</script>

<style lang="scss" scoped>
    h1 {
       font-size: 34px;
        margin: 15px 0; 
    }
</style>