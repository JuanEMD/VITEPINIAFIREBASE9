<template>
  <div>
    <h1>login</h1>
    <form @submit.prevent="handleSubmit">
      <input type="email" placeholder="Email address" v-model.trim="email" />
      <input type="password" placeholder="Password" v-model.trim="password" />
      <button type="submit" :disabled="userStore.loadingUser">Acceder</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/user";
// import { useRouter } from 'vue-router'

const userStore = useUserStore();
// const router = useRouter()

const email = ref("juan@gmail.com");
const password = ref("123123");

const handleSubmit = async () => {
  if (!email.value || password.value.length < 6) {
    return alert("Llena los campos palomo");
  }
  await userStore.loginUser(email.value, password.value);
//   router.push('/')
  
};
</script>

<style scoped></style>
