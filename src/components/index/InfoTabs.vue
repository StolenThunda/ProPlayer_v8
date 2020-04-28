<template>
  <v-container>
    <v-tabs v-model="tab" centered dark icons-and-text>
      <v-tabs-slider></v-tabs-slider>

      <v-tab href="#announcements">
        Announcements
        <v-icon>mdi-bell-alert</v-icon>
      </v-tab>

      <v-tab href="#updates">
        Course Updates
        <v-icon>mdi-calendar-multiple-check</v-icon>
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item
        id="announcements"
        v-for="item in announcements"
        :key="'a_' + item.id"
      >
        <ListItem v-bind="item" />
      </v-tab-item>
      <v-tab-item id="updates" v-for="item in updates" :key="'u_' + item.id">
        <ListItem v-bind="item" />
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
import axios from "axios";
import ListItem from "@/components/base/ListItem";
export default {
  data() {
    return {
      tab: null,
      show: false,
      announcements: null,
      updates: null
    };
  },
  components: {
    ListItem
  },
  created() {
    this.getNotifications();
  },
  mounted() {
    // console.log("notif", this.notifications);
  },
  computed: {
    hasAnnouncements: () => {
      return this.announcements.length > 0;
    }
  },
  methods: {
    getNotifications() {
      axios
        .get(
          "https://texasbluesalley.com/proplayer74-tony/--ajax-load-default-page"
        )
        .then(resp => this.parseHtml(resp.data));
    },
    async parseHtml(html) {
      const cheerio = require("cheerio");
      const $ = cheerio.load(html);
      await this.$nextTick();
      this.announcements = this.getInfo($, $("#announcements li.notification"));
      this.updates = this.getInfo($, $("#course-updates li.notification"));
    },
    getInfo($, group) {
      // console.log(group)
      let collection = [];
      group.each((idx, e) => {
        const itm = {
          id: idx,
          title: $(e)
            .find(".notification-title span")
            .text(),
          subtitle: $(e)
            .find(".notification-body p")
            .text()
        };
        // console.log();
        collection.push({ ...itm });
      });
      // console.log("col", collection);
      return collection;
    }
  }
};
</script>

<style lang="scss" scoped></style>
