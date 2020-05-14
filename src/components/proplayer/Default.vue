<template>
  <v-container grid-list-xs>
    <v-card>
      <v-card-actions>
        <v-btn @click="test">Console.log()</v-btn>
      </v-card-actions>
    </v-card>
    <v-card>
      <v-card-text v-model="this.currentCourse">
        <div>
          <pre>
                    {{ this.currentCourse }}
                </pre>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("watch");

export default {
  name: "VideoPlayer",
  data() {
    return {
      player: null
    };
  },

  computed: {
    ...mapState(["currentCourse"])
  },
  methods: {
    test() {
      console.log("CurrCourse", this.currentCourse);
    }
  }
};
</script>
