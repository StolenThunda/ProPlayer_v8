<template>
  <v-container fluid>
    <v-banner
      @toggleCourseInfo.stop="show = !show"
    >
      <course-info />
    </v-banner>
    <!-- <pro-player /> -->
  </v-container>
</template>

<script>
// import Player from "@/components/proplayer/Player";
import CourseInfo from "@/components/proplayer/CourseInfo";
export default {
  name: "VideoPlayerLayout",
  data: () => ({
    show: false,
    player: null
  }),
  components: {
    // "pro-player": Player,
    "course-info": CourseInfo
  },
  mounted() {
    this.$root.$on("toggleCourseInfo", () => {
      this.show = !this.show;
    });
  },
  computed: {
    display(objCourse) {
      return JSON.stringify(objCourse, null, 4);
    }
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "//unpkg.com/video.js@7/dist/video-js.min.css";
// @import "//vjs.zencdn.net/7.7.5/video-js.css";
/* City */
@import "//unpkg.com/@videojs/themes@1/dist/city/index.css";
</style>
