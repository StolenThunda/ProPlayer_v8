<template>
  <v-layout justify-center>
    <v-card>
      <v-tabs id="site-updates" v-model="tab" centered dark icons-and-text>
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

      <v-tabs-items v-model="tab" ou>
        <v-tab-item
          id="announcements"
          v-for="item in announcements"
          :key="'a_' + item.id"
        >
          <NotificationItem v-bind="item" />
        </v-tab-item>
        <v-tab-item
          id="updates"
          v-for="item in updates"
          :key="'u_' + item.id"
          outlined
        >
          <NotificationItem v-bind="item" />
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-layout>
</template>

<script>
import NotificationItem from "@/components/base/NotificationItem";
export default {
  data() {
    return {
      tab: null,
      show: false,
      announcements: null,
      updates: null,
    };
  },
  components: {
    NotificationItem,
  },
  created() {
    this.getNotifications();
  },
  methods: {
    async getNotifications() {
      const notifications = await this.$store.dispatch("fetchNotifications");
      //  console.log(notifications);
      this.announcements = notifications.announcements;
      this.updates = notifications.updates;
    },
  },
};
</script>

<style lang="scss" scoped>
// #site-updates {
// }
</style>
