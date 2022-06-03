<template>
  <div>
    <h1>Editar id:</h1>
  </div>

  <form @submit.prevent="handleSubmit">
    <input type="text" placeholder="Ingrese URL" v-model="url"/>
    <button type="submit">Editar</button>
  </form>

</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useDatabaseStore } from "../stores/database";

const route = useRoute();
const databaseStore = useDatabaseStore();

const url = ref('');

const handleSubmit = () => {
    //validaciones del input
    databaseStore.actualizarUrl(route.params.id, url.value);
}

onMounted(async () => {
    url.value = await databaseStore.obtenerUrl(route.params.id);
})
</script>
