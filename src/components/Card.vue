<template>
  <li class="actor-card">
    <slot></slot>
  </li>
</template>

<script>
export default {};
</script>

<style lang="scss">
.actor-card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  max-width: 300px;
  margin: auto;
  text-align: center;

  img {
    width: 100%;
  }
}
</style>
