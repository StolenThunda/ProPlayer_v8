<template>
  <v-list-item>
    <v-list-item-avatar>
      <v-icon dense large>mdi-email</v-icon>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title v-html="this.title"></v-list-item-title>
      <v-list-item-subtitle v-html="this.subtitle"></v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: "BaseListItem",
  data: () => ({
    show: false
  }),
  props: {
    data: Object,
    subtitle: String,
    title: String,
    id: Number
  },
  methods: {
    test() {
      console.log("base_item", this);
    }
  },
  computed: {
    itemURL: function() {
      const url = `https://randomuser.me/api/portraits/men/${this.id}.jpg`;
      console.log(url);
      return url;
    }
  }
};
</script>

<style lang="scss" scoped>
.v-icon {
  margin-right: 10px;
}
</style>
