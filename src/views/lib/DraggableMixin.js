/*
 *   Purpose: enables a draggable sidebar
 *   Requirements: a vue sidebar control with a v
 *
 */

const Draggable = {
  data: () => ({
    navCfg: null,
    defaults: {
      width: 350,
      borderSize: 3
    }
  }),
  mounted() {
    this.$root.$on("toggleSidebar", () => {
      this.toggleSidebar();
    });
    this.init();
  },
  methods: {
    init() {
      this.setBorderWidth();
      this.setEvents();
    },
    toggleSidebar() {
      this.drawer = !this.drawer;
    },
    drawerContent: name => {
      return (this[name] = this.$route.name === name);
    },
    setBorderWidth() {
      let i = this.$refs.drawer.$el.querySelector(
        ".v-navigation-drawer__border"
      );
      i.style.width = this.navCfg
        ? this.navCfg.borderSize
        : this.defaults.borderSize + "px";
      i.style.cursor = "ew-resize";
      i.style.backgroundColor = "grey";
    },
    setEvents() {
      const minSize = this.navCfg
        ? this.navCfg.borderSize
        : this.defaults.borderSize;
      const el = this.$refs.drawer.$el;
      const drawerBorder = el.querySelector(".v-navigation-drawer__border");
      const direction = el.classList.contains("v-navigation-drawer--right")
        ? "right"
        : "left";

      function resize(e) {
        document.body.style.cursor = "ew-resize";
        let f =
          direction === "right"
            ? document.body.scrollWidth - e.clientX
            : e.clientX;
        el.style.width = f + "px";
      }

      drawerBorder.addEventListener(
        "mousedown",
        e => {
          if (e.offsetX < minSize) {
            el.style.transition = "initial";
            document.addEventListener("mousemove", resize, false);
          }
        },
        false
      );

      document.addEventListener(
        "mouseup",
        () => {
          el.style.transition = "";
          if (this.navCfg) this.navCfg.width = el.style.width;
          this.defaults.width = el.style.width;
          document.body.style.cursor = "";
          document.removeEventListener("mousemove", resize, false);
        },
        false
      );
    }
  }
};
export default Draggable;
