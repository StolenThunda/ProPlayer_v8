<template>
  <v-list-item :to="{name: 'proplayer', params: { packageID: this.id}}">
    <v-btn class="mx-2" dark icon color="error" :disabled="this.isFav">
      <v-icon>fa fa-inverse fa-heart fa-stack-1x</v-icon>
    </v-btn>
    <v-img
      max-height="150"
      max-width="75"
      class="ma-5 "
      :src="this.avatar"
      v-if="this.avatar"
      contain
    />
    
    <v-list-item-content>
      <v-list-item-title v-html="this.title"></v-list-item-title>
      <v-list-item-subtitle v-html="this.subtitle"></v-list-item-subtitle>
      <v-container v-if="this.data" v-html="this.data"></v-container>
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
    isFav: Boolean,
    avatar: String,
    data: String,
    subtitle: String,
    title: String,
    id: Number
  },
  computed:{
 goto(id){
      return `/proplayer/${id}`;
    }
  },
  methods:{
    toggleFavoriteInBrowser(){},
   
  }
};
</script>

<style>
/* .v-icon {
  margin-right: 10px;
} */
.browser-result-meta {
  font-size: 0.7em;
  font-weight: 700;
  color: #aaa;
  margin-top: 0.25em;
}

.meta-key {
  text-transform: uppercase;
  color: white;
  font-weight: 900;
  margin-right: 0.25em;
}

.meta-wrapper {
  white-space: nowrap;
  margin-right: 0.5em;
}
</style>
