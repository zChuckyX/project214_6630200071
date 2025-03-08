<script setup lang="ts">
import { ref } from 'vue';
import Navbar from '@/components/Header.vue'
import ShowStudent from '@/components/ShowStudent.vue';
import ShowSubject from '@/components/ShowSubject.vue';
import Alert from '@/components/ShowAlert.vue';

const alert = ref({message: '', type: '', timeout: 0,
  setAlert(message: string, type: string, timeout: number) {
    this.message = message;
    this.type = type;
    this.timeout = timeout;
  }
});

const getAlert = (data = { message: '0', type: '0', time: 0}) => {
  alert.value.setAlert(data.message, data.type, data.time);
};
</script>

<template>
  <div>
    <Navbar style="backdrop-filter: blur(30px);" />
    <ShowStudent @showAlert="getAlert" id="#" style="margin-top: 60px;" />
    <ShowSubject @showAlert="getAlert" id="#subject"/>
    <Alert ref="alert" style="z-index: 999;"/>
  </div>
</template>