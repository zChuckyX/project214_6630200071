<template>
    <div id="alert" class="alert d-sticky position-fixed bottom-0 translate-middle-x w-75 start-50 fade" role="alert" style="max-width:600px; width:100%">
        {{ errorMessage }}
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const errorMessage = ref('');

const setAlert = (message: string, type: string, time: number) => {
    const alert = document.getElementById('alert');

    if (alert) {
        errorMessage.value = message;
        alert.classList.add(type);
        alert.classList.add('show');
        
        setTimeout(() => {
            alert.classList.remove('show');
            setTimeout(() => {
                alert.classList.remove(type);
                errorMessage.value = '';
            }, 100)
        }, time)
    }
}

defineExpose({
  setAlert
});
</script>

<style scoped>
#alert {
    transition: opacity 0.5s ease;
}
</style>
