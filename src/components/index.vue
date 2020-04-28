<template>
  <v-container fluid>
    <Welcome />
    <Resume />
    <Info>
      <InfoTabs />
    </Info>
  </v-container>
</template>

<script>
import Welcome from "@/components/index/Welcome";
import Resume from "@/components/index/Resume";
import Info from "@/components/index/Info";
import InfoTabs from "@/components/index/InfoTabs";
import { mapState } from "vuex";
export default {
  name: "Default",
  components: {
    Welcome,
    Resume,
    Info,
    InfoTabs
  },
  computed: {
    ...mapState(["showSpinner"])
  },
  methods: {
    spinner: () => {
      if (this.showSpinner) {
        this.$vs.loading({
          background: this.backgroundLoading,
          color: this.colorLoading,
          container: this.refs.contentArea,
          scale: 0.45
        });
        setTimeout(() => {
          this.$vs.loading.close(this.refs.contentArea);
        }, 3000);
      } else {
        this.$vs.loading.close();
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
