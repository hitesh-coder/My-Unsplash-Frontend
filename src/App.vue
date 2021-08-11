<template>
    <div>
        <preloader />
        <home />
        <credits />
    </div>
</template>

<script>
import Credits from "./components/credits.vue";
import Home from "./components/home.vue";
import Preloader from "./components/preloader.vue";

export default {
    name: "App",
    components: {
        Home,
        Credits,
        Preloader,
    },
};
</script>

<style lang="scss">
#app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    // margin-top: 60px;
}
</style>
