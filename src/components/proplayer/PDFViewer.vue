<template>
<v-sheet>
    
  <v-card outlined>
    <h1>PDF VIEWR</h1>
    <v-card-text :v-text="test">
    </v-card-text>
    <v-card-actions>
      <v-btn @click="test">test</v-btn>
    </v-card-actions>
  </v-card>
  <v-card outlined>
    <iframe width="1000" height="800" :src="frameSrc" frameborder="0" allowfullscreen></iframe>
  </v-card>
</v-sheet>
</template>

<script>
export default {
  data: () => ({
    frameSrc: ""
  }),
  methods: {
    src() {
      this.frameSrc = `https://texasbluesalley.com/includes/pdfjs/web/viewer.html?file=/assets/pdfs/${this.$route.params.file}`;
    },
    test() {
      console.log(this.$route.params);
      return this.$route.params;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>