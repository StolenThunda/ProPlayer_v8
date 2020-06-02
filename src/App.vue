<template>
  <div id="app">
      <component :is="layout">
        <router-view :key="$route.path" />
      </component>
  </div>
</template>

<script>
  export default {
    computed: {
      layout() {
        return (this.$route.meta.layout || "default") + "-layout";
      }
    }
  };
</script>

<style>
  .page {
    width: 100%;
    padding: 0px;
    box-sizing: border-box;
  }

</style>
