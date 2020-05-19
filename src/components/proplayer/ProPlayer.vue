<template>
  <v-container grid-list-xs>
    <v-card>
      <video ref="videoPlayer" class="video-js"></video>
      <v-card-actions>
        <v-btn @click="test">
          Console.log()
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
// import videojs from 'video.js';
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("watch");

export default {
  name: "VideoPlayer",
  data() {
    return {
      player: null
    };
  },
  mounted() {
    // this.player = videojs(this.$refs.videoPlayer, this.options, function onPlayerReady() {
    //     // console.log('onPlayerReady', this.player());
    // })
  },
  computed: {
    display(objCourse) {
      return JSON.stringify(objCourse, null, 4);
    },
    ...mapState(["currentCourse"])
  },
  methods: {
    test() {
      console.log("CurrCourse", this.currentCourse);
    }
  },
  beforeDestroy() {
    // if (this.player) {
    //     this.player.dispose()
    // }
  }
};
</script>

<style lang="scss" scoped>
// @import "//unpkg.com/video.js@7/dist/video-js.min.css";
@import "//vjs.zencdn.net/7.7.5/video-js.css";
/* City */
@import "//unpkg.com/@videojs/themes@1/dist/city/index.css";
</style>
