<template>
      <v-card  flat tile>
      <v-expansion-panels v-if="sections"  popout>
        <v-expansion-panel v-for="section in sections" :key="section.sectionID">
          <v-expansion-panel-header>{{section.sectionTitle}}</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-list dense nav rounded subheader>
              <v-list-item
                v-for="seg in section.segments"
                :key="seg.segmentID"
                :to="getSegInfo(seg).to"
                color="getSegInfo(seg).color"
                link
                ripple
              >
                <v-list-item-icon>
                  <v-icon>{{getSegInfo(seg).icon}}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-subtitle>{{ seg.segmentFullTitle }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      </v-card>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("watch");
export default {
  name: "SegmentTabContent",
  computed: {
    ...mapState(["sections","currentCourse"])
  },
  methods: {
    getSegInfo(seg) {
      var ico = { icon: "mdi-music", color: "blue", to: null };
      ico.to = (seg.segmentSoundsliceCode !== "") ? seg.segmentSoundsliceCode : null
      if (seg.segmentMP3Filename !== "")
        ico = {
          icon: "mdi-volume-high",
          color: "green",
          to: `pdf/${seg.segmentMP3Filename}`
        };
      if (seg.segmentPDFCode !== "")
        ico = {
          icon: "mdi-file-pdf",
          color: "yellow",
          to: `${this.$route.params.packageID}/pdf/${seg.segmentPDFCode}`
        };
      if (seg.segmentVimeoCode !== "")
        ico = {
          icon: "mdi-video",
          color: "red",
          to: `play/${seg.segmentVimeoCode}`
        };
      if (seg.segmentYouTubeCode !== "")
        ico = { icon: "mdi-youtube", color: "red", to: "" };
      return ico;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>