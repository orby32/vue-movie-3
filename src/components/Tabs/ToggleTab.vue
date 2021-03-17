<template>
  <div class="tab">
    <input
      type="radio"
      :id="label"
      name="category"
      @click="onChangeCategory($event)"
      :value="label"
      v-model="checked"
    />
    <label :for="label">
      {{ label | formattedText }}
    </label>
  </div>
</template>

<script>
export default {
  name: "tab-button",
  props: {
    label: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      checked: "top_rated",
    };
  },
  methods: {
    onChangeCategory(e) {
      this.checked = e.target.id;
      // change the state
      this.$store.commit("CHANGE_FETCHED_CATEGORY", e.target.id);
      // call to fetch actions with new category
      this.$store.dispatch("fetchData");
    },
  },
};
</script>

<style lang="scss">
.tab {
  text-transform: uppercase;
  border-bottom: 1px solid #fff;
  margin-right: 10px;

  label {
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }

  input {
    display: none;
  }

  input:checked + label {
    border-bottom: 1px solid goldenrod;
    z-index: 2;
  }
}
</style>



