<script setup lang="ts">
const emits = defineEmits(['click']);

const props = defineProps({
    title: String,
    subTitle: String
})
</script>

<template>
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content" style="background-color: rgba(0, 0, 0, 0.1); backdrop-filter: blur(10px);">
            <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">{{ props.title }}</h5>
                <button type="button" class="btn-close bg-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <small class="text-danger fw-bold">{{ props.subTitle }}</small>
                <slot></slot>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary border-2 fw-bold" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-outline-primary border-2 fw-bold" data-bs-dismiss="modal" @click="emits('click')">Save Changes</button>
            </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.btn-outline-secondary { --btn-color:#6c757d }
.btn-outline-primary { --btn-color:#0d6efd }

.btn-outline-primary, .btn-outline-secondary {
    animation: neonBorder 1.5s infinite alternate;
}

</style>