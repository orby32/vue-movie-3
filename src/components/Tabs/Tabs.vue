<template>
<div class="tabs">
    <ToggleTab label="top_rated"></ToggleTab>
    <ToggleTab label="popular"></ToggleTab>
    <ToggleTab label="upcoming"></ToggleTab>
</div>
</template>

<script>
import ToggleTab from "./ToggleTab.vue";
export default {
    components: {
        ToggleTab
    }
}
</script>

<style scoped>
.tabs {
    display: flex;
    justify-content: center;
    margin-top: 50px;

}
</style>