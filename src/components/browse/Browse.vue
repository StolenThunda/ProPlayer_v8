<template>
  <v-sheet 
    class="mx-auto"
    max-width="75vw"
    outlined
    v-model="default_entries">
    <v-list id="content"
      dense
      v-for="default_entry in default_entries"
      :key="default_entry.id"
    >
      <ResultPanel v-bind="default_entry" />
    </v-list>
  </v-sheet>
</template>

<script>
/* 
TODO - enable/disable favorites
*/
import ResultPanel from "@/components/browse/resultPanel";
import axios from "axios";

export default {
  name: "Browser",
  data: () => ({
    drawer: false,
    baseURL: "https://texasbluesalley.com/proplayer74-tony/",
    default_entries_slug: "--ajax-browser-default-entries",
    default_entries: null,
  }),
  components: {
    ResultPanel,
  },
  mounted() {
    // console.dir(this.$route);
    this.getDefaults();
    this.$root.$on("navFilter", (code) => {
      return this.getFilteredByCode(code);
    });
  },
  methods: {
    getDefaults() {
      axios
        .get(`${this.baseURL}${this.default_entries_slug}`)
        .then((resp) => this.parseHtml(resp.data));
    },
    getFilteredByCode(code) {
      axios
        .get(`${this.baseURL}--ajax-browser-filters/${code}`)
        .then((resp) => this.parseHtml(resp.data));
    },
    async parseHtml(html, mode) {
      mode = typeof mode === "undefined" ? "default" : mode;
      const cheerio = require("cheerio");
      const $ = cheerio.load(html);
      await this.$nextTick();
      this.default_entries = this.getInfo(
        $,
        $("div[id^=browserResultItem]"),
        mode
      );
      // console.log(html);
      // console.dir()
    },
    getInfo($, group, mode) {
      let collection = [];
      switch (mode) {
        case " ":
          break;

        default:
          group.each((idx, e) => {
            const pkg = this.getIdx(
              $(e).find(".browser-result-image a").attr("onclick")
            );
            const itm = {
              id: pkg.packageID,
              type: pkg.type,
              isFav: false,
              avatar: "http:" + $(e).find("img").attr("src"),
              title: $(e).find(".browser-result-title a").text(),
              subtitle: $(e).find(".notification-body p").text(),
              data: $(e).find(".browser-result-meta").html(),
            };
            // console.log();
            collection.push({ ...itm });
          });
          break;
      }
      // console.log("col", collection);
      return collection;
    },
    getIdx(clickString) {
      clickString = clickString.replace(/'/g, '"');
      const pkg = JSON.parse(clickString.match(/\{([^}]+)\}/g));
      pkg.packageID = parseInt(pkg.packageID);
      return pkg;
    },
  },
};
</script>

<style>
#content {
  display: flex;
  flex-direction: column;
  align-content: space-around;
  justify-content: center;
}
</style>
