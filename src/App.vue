<script setup>
import { RouterLink, RouterView } from "vue-router";
import { useUserStore } from "./stores/user";

const userStore = useUserStore();
</script>

<template>
  <header>
    <div class="wrapper" v-if="!userStore.loadingSession">
      <nav>
        <RouterLink to="/" v-if="userStore.userData">Home |</RouterLink>
        <RouterLink to="/login" v-if="!userStore.userData">Login |</RouterLink> 
        <RouterLink to="/register" v-if="!userStore.userData">Register |</RouterLink> 
        <button @click="userStore.logOutUser" v-if="userStore.userData">LogOut</button>
      </nav>
    </div>
    <div v-else>
      Loading user...
    </div>
  </header>

  <RouterView />
</template>

<style></style>
