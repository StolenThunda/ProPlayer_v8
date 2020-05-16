<template>
  <v-container>
    <v-layout row justify="center" align="center">
      <v-flex xs10 md4 class="offset-md-2">
        <div class="greeting">
          <H2>
            Welcome
            <span v-if="user">{{ user }}</span>
            <span v-else>, please LOGIN</span>
          </H2>
        </div>
      </v-flex>
      <v-flex xs10 md4 class="offset-md-2">
        <v-container>
          <v-row class="justify-space-between" >
            <v-btn id='orientation' color="success">
              <v-icon left>mdi-play-circle-outline</v-icon>Orientation
            </v-btn><v-spacer></v-spacer>
            <v-btn id='showFav' color="primary" @click="$root.$emit('toggleSidebar')">
              <v-icon left>mdi-heart</v-icon>Favorites
            </v-btn><v-spacer></v-spacer>
            <v-btn id='browse' color="primary" to="browser">
              <v-icon left>mdi-magnify</v-icon>Browse
            </v-btn>
          </v-row>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: {
    user: String
  }
};
</script>


