<template>
  <div>
    <v-card>
      <v-avatar color="secondary" icon="mail_outline" />
      <div slot="header">
        <h3>{{ this.title }}</h3>
      </div>
      <div>
        <span>{{ this.data }}</span>
      </div>
      <!-- <div slot="footer">
            <v-row v-justify="flex-end">
            <v-btn type="gradient" color="danger" icon="favorite"></v-btn>
            <v-btn color="primary" icon="turned_in_not"></v-btn>
            <v-btn color="rgb(230,230,230)" color-text="rgb(50,50,50)" icon="settings"></v-btn>
          </v-row>
      </div>-->
    </v-card>
  </div>
</template>
<script>
import mapGetters from "vuex";
export default {
  props: {
    title: String,
    data: String,
    id: Number
  },
  mounted() {
    console.log("slice", this.getSliceBacon);
  },
  methods: {
    ...mapGetters["getSliceBacon"]
  }
};
</script>
<style>
.cardx {
  margin: 15px;
}
</style>
