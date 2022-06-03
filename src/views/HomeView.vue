<script setup>
import { useUserStore } from "../stores/user";
import { useDatabaseStore } from "../stores/database";
import { ref } from "vue";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const databaseStore = useDatabaseStore();
const router = useRouter()

databaseStore.obtenerUrls();

const url = ref('');

const handleSubmit = () => {
  //validaciones de la url
  databaseStore.AgregarUrl(url.value)
}

</script>

<template>
  <div>
    <h1>home</h1>
    <p>{{ userStore.userData?.email }}</p>

    <form @submit.prevent="handleSubmit">
      <input type="text" placeholder="Ingrese URL"  v-model="url">
      <button type="submit">Agregar</button>
    </form>

    <p v-if="databaseStore.loadingDoc"> Loading...</p>
    <ul v-else>
      <li v-for="item in databaseStore.documents" :key="item.id">
        {{ item.id }} - {{ item.name }}
        <button @click="databaseStore.borrarUrl(item.id)">Eliminar</button>
        <button @click="router.push(`/editar/${item.id}`)">Editar</button>
      </li>
    </ul>
  </div>
</template>
