<template>
  <header class="header">
    <div class="header__content">
      <a href="/" class="app-logo">Vue Movie</a>
      <a href="https://www.themoviedb.org/" target="_blank">
        <img src="../assets/tmdb_logo.png" alt="" class="powered-by-logo" />
      </a>
    </div>
  </header>
</template>

<script>
export default {};
</script>

<style lang="scss">
.header {
  height: auto;
  width: 100%;
  background-color: #1c1c1c;
  padding: 0 20px;
  box-sizing: border-box;

  &__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1530px;
    min-height: 120px;
    padding: 20px 0;
    margin: 0 auto;
    overflow: hidden;

    .app-logo {
      text-decoration: none;
      font-size: 60px;
      color: #fff;
      font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
    }
    .header-link {
      color: #fff;
      font-size: 20px;
      text-decoration: none;
      transition: opacity .3s;

      &:hover {
        opacity: .8;
      }
    }
  }
}
</style>
