<template>
  <div class="preloader" v-if="!isloaded">
    <img
      src="https://cdn.hackernoon.com/images/0*QdX-f4eHiimvQZoZ.gif"
      alt=""
    />
  </div>
</template>

<script>
export default {
  name: "preloader",
  data() {
    return {
      isloaded: false,
    };
  },
  mounted() {
    document.onreadystatechange = () => {
      if (document.readyState == "complete") {
        this.isloaded = true;
      }
    };
  },
};
</script>

<style lang="scss" scoped>
.preloader {
  position: fixed;
  top: 0%;
  left: 0%;

  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  background: black;

  z-index: 999;
}
</style>
