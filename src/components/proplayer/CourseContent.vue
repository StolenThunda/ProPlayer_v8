<template>
  <div>
    <h1>Course COntent</h1>
  </div>
</template>

<script>
export default {
  props: {
    packageID: Number
  },
  computed: {
    playerContent() {
      return this.$store.commit("fetchCourse", this.packageID);
    }
  }
};
</script>

<style lang="scss" scoped></style>
