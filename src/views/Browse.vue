<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <SearchPanels />
    </v-navigation-drawer>

    <AppBar :drawer="drawer" />

    <v-content id="content" v-model="default_entries">
      <v-container
        v-for="default_entry in default_entries"
        :key="default_entry.id"
      >
        <ResultPanel v-bind="default_entry" />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
/* 
TODO - enable/disable favorites
*/
import AppBar from "@/components/browse/appBar";
import ResultPanel from "@/components/browse/resultPanel";
import SearchPanels from "@/components/browse/searchPanels";
import axios from "axios";

export default {
  name: "Browse",
  data: () => ({
    drawer: false,
    baseURL: "https://texasbluesalley.com/proplayer74-tony/",
    default_entries_slug: "--ajax-browser-default-entries",
    default_entries: null
  }),
  components: {
    AppBar,
    ResultPanel,
    SearchPanels
  },
  mounted() {
    this.getDefaults();
    this.$root.$on("navFilter", code => {
      return this.getFilteredByCode(code);
    });
  },
  methods: {
    getDefaults() {
      axios
        .get(`${this.baseURL}${this.default_entries_slug}`)
        .then(resp => this.parseHtml(resp.data));
    },
    getFilteredByCode(code) {
      axios
        .get(`${this.baseURL}--ajax-browser-filters/${code}`)
        .then(resp => this.parseHtml(resp.data));
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
          const pkg = this.getIdx(($(e)
                  .find(".browser-result-image a")
                  .attr("onclick")));
            const itm = {
              id: pkg.packageID,
              type: pkg.type,
              isFav: false,
              avatar:
                "http:" +
                $(e)
                  .find("img")
                  .attr("src"),
              title: $(e)
                .find(".browser-result-title a")
                .text(),
              subtitle: $(e)
                .find(".notification-body p")
                .text(),
              data: $(e)
                .find(".browser-result-meta")
                .html()
            };
            // console.log();
            collection.push({ ...itm });
          });
          break;
      }
      console.log("col", collection);
      return collection;
    },
    getIdx(clickString){
      clickString = clickString.replace(/'/g, '"');
      const pkg = JSON.parse(clickString.match(/\{([^}]+)\}/g));
      pkg.packageID = parseInt(pkg.packageID)
      return pkg;
    }
  }
};
</script>

<style scoped>
#content {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
}
</style>