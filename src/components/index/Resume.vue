<template>
  <v-card  class="mx-auto pa-5" outlined tiled>
    <v-flex row xs12 class="justify-center pa-3">
      <v-card>
        <v-btn color="primary">
        <v-icon left>mdi-play-circle</v-icon>Resume
      </v-btn>
      </v-card>
      
    </v-flex>
    <v-flex row xs12 class="justify-center pa-3">
      <v-card>
        <v-card-title class="headline mb-1">
         {{ this.title }}
        </v-card-title>
      </v-card>
    </v-flex>
      
  </v-card>
</template>

<script>
export default {
  props: {
    course: String,
    title: {
      type: String,
      default: 'Albert’s Influence: Rockin Blues: Lesson 2 - Demonstration'
  }
  }
};
</script>
