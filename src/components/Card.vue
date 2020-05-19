<template>
  <li class="actor-card">
    <slot></slot>
  </li>
</template>

<style lang="scss">
.actor-card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  max-width: 300px;
  margin: auto;
  text-align: center;
  transition: all .3s;

  img {
    width: 100%;
    height: auto;
    border-radius: 2px;
  }

  &:hover {
      transform: scale(1.05);
  }
}
</style>
