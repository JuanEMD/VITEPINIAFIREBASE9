<script setup>
import { useUserStore } from '../stores/user';
const userStore = useUserStore();


</script>

<template>
<div>
  <h1>home</h1>
  <p>{{ userStore.userData?.email }}</p>
</div>
</template>
