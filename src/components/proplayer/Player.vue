<template>
  <v-sheet height="75%" max-width="100%">
    <v-row class="mb-0" justify="space-between">
      <v-col class="text-left">
        <v-card class="player_container" v-model="options">
          <div class="c-video" >
            <video
              ref="videoPlayer"
              class="video-js video fill-height"
              v-for="sources in this.options.sources"
              :key="sources.src"
            >
              <source :src="sources" />
            </video>
        </div>
          </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-slider track-color="grey" always-dirty min="40" max="218">
          <template v-slot:prepend>
            <span class="subheading font-weight-light mr-1">00:00:00</span>
          </template>
          <template v-slot:append>
            <span class="subheading font-weight-light mr-1">00:00:00</span>
          </template>
        </v-slider>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="mb-0" align="center" justify="center">
        <v-btn depressed fab @click="toggle">
          <v-icon large>
            {{ isPlaying ? "mdi-pause" : "mdi-play" }}
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script>
  import videojs from "video.js";
  export default {
    name: "VideoPlayer",
    data: () => ({
      isPlaying: true,
      segmentData: null,
      options: {
        autoplay: true,
        controls: true,
        sources: [
          {
            src: "//vjs.zencdn.net/v/oceans.mp4",
            type: "video/mp4",
          },
        ],
      },
    }),
    mounted() {
      // this.options = this.mergeVideoOptions();
      this.initPlayer();
    },
    methods: {
      toggle: () => {
        this.isPlaying = !this.isPlaying;
      },
      initPlayer: () => {
        this.player = videojs(
          this.$refs.videoPlayer,
          this.options,
          function onPlayerReady() {
            console.log("onPlayerReady", this.player());
          }
        );
      },
      mergeVideoOptions: () => {
        var courseOptions = {};
        if (this.segmentData) {
          courseOptions = Object(courseOptions, {
            poster: this.segmentData.packageImage,
            sources: [],
          });
        }
        return Object.assign({}, this.options, courseOptions);
      },
      test() {
        console.log("CurrCourse", this.segmentData);
      },
    },
  };
</script>

<style lang="scss" scoped>
  .player_container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 85vh;
    width: 100%;
  }
  .controls {
    display: flex;
    position: absolute;
    bottom: 0;
    width: 100%;
    flex-wrap: wrap;
    background: rgba(0, 0, 0, 0.7);
  }

  .video {
    width: 100%;
  }

  .c-video {
    height: 100%;
    width: 100%;
    max-width: 90vw;
    position: relative;
  }
</style>
