<template>
  <v-container grid-list-xs>
    <v-card class="mx-auto" outlined v-model="currentCourse">
      <v-list-item three-line>
        <v-list-item-content>
          <div class="overline mb-4">
            <span :v-html="currentCourse.packageDescription"></span>
          </div>
          <v-list-item-title class="headline mb-1">
            <span :v-html="currentCourse.packageDescription"></span>
          </v-list-item-title>
          <v-list-item-subtitle
            :v-html="currentCourse.packageOverview"
          ></v-list-item-subtitle>
          <v-expand-transition>
            <v-card v-show="expand" class="mx-auto">
              <pre>
                    {{ this.currentCourse }}
                </pre
              >
              <v-card-actions></v-card-actions>
            </v-card>
          </v-expand-transition>
        </v-list-item-content>

        <v-list-item-avatar tile size="200">
          <v-img :src="currentCourse.packageImage" contain></v-img>
        </v-list-item-avatar>
      </v-list-item>

      <v-card-actions>
        <v-btn @click="test">
          Tree View (console.log)
        </v-btn>
        <v-btn class="ma-2" color="primary" @click="expand = !expand"
          >Expand Transition</v-btn
        >
      </v-card-actions>
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
      expand: false,
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
