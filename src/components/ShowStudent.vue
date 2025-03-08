<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { type typeUser } from '@/types/useTypes';
import { useUserStore } from '@/stores/user';
import img1 from '@/assets/images/img1.webp';
import img2 from '@/assets/images/img2.webp';

const { setUser, getUser } = useUserStore();
const emits = defineEmits(['showAlert']);

const imageSrc = ref(img1);
const userData = ref<typeUser>({ fullname: '', id: '', major_id: '', major: '', old_school: '' });
const images = ref<boolean>(true);
const editUser = ref<{ text: string, status: boolean}>({ text: "Edit User", status: true });

const show = ref(false);
const isActive = ref(false);

const handleEditUser = async() => {
    isActive.value = true;

    if (editUser.value.status) {
        editUser.value.text = "Save User";
        editUser.value.status = false;

        setTimeout(() => {
            isActive.value = false;
        }, 1000);
    } else {
        if (!Number(userData.value.id)) {
            emits('showAlert', { message: 'รหัสวิชาผิดฟอร์แมทโปรดแก้ไข', type: 'alert-warning', time: 2000 });
            isActive.value = false;
            return;
        }

        const data = await getUser();

        if (JSON.stringify(userData.value) === JSON.stringify(data)) {
            emits('showAlert', { message: 'ไม่มีการเปลื่ยนแปลงค่าใดๆ', type: 'alert-info', time: 2000 });
        } else {
            await setUser(userData.value);
            emits('showAlert', { message: 'แก้ไขข้อมูลตัวตนและบันทึกสำเร็จ', type: 'alert-success', time: 2000 });
        }

        editUser.value.text = "Edit User";
        editUser.value.status = true;
    }

    setTimeout(() => {
        isActive.value = false;
    }, 1000);
}

onMounted(async () => {
    setInterval(() => {
        if (images.value) {
            imageSrc.value = img1
        } else {
            imageSrc.value = img2
        }
        images.value = !images.value;
    }, 3000);

    const data = await getUser();

    if (data) userData.value = data;

    setTimeout(() => {
        show.value = true;
    }, 2000);
});
</script>

<template>
    <div v-if="show" class="container pt-3">
        <div class="d-flex justify-content-center">
            <div v-if="userData.fullname" class="d-flex flex-column flex-md-row align-items-center p-4 rounded-3" style="background-color: rgba(0, 0, 0, 0.2); backdrop-filter: blur(10px); max-width: 700px; width: 100%;">
                <button class="btn p-2 rounded-3 mb-3 mb-md-0 me-md-4" style="width: fit-content; background-color: rgba(0, 0, 0, 0.05); backdrop-filter: blur(10px);">
                    <img :src="imageSrc" alt="Image 1" style="max-width: 300px; max-height: 300px;">
                </button>
                <div class="fw-normal fs-5 text-white w-100">
                    <div style="display: inline-block;">
                        <div class="typed-out">ประวัตินิสิต</div>
                    </div>
                    <div class="form-floating mb-3 mt-3">
                        <input type="text" class="form-control text-white border-0 rounded-3" placeholder="Fullname" title="Fullname" v-model="userData.fullname" :disabled="editUser.status">
                        <label class="fs-6 text-white">Fullname</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control text-white border-0 rounded-3" placeholder="Student ID" title="Student ID" v-model="userData.id" :disabled="editUser.status">
                        <label class="fs-6 text-white">Student ID</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control text-white border-0 rounded-3" placeholder="Student ID" title="Major ID" v-model="userData.major_id" :disabled="editUser.status">
                        <label class="fs-6 text-white">Major ID</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control text-dark text-white border-0 rounded-3" placeholder="Student ID" title="Major" v-model="userData.major" :disabled="editUser.status">
                        <label class="fs-6 text-white">Major</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control text-white border-0 rounded-3" placeholder="Student ID" title="High School" v-model="userData.old_school" :disabled="editUser.status">
                        <label class="fs-6 text-white">High School</label>
                    </div>
                    <div class="d-flex">
                        <button :class="editUser.status ? 'btn-outline-danger btnDanger':'btn-outline-success btnSuccess'" class="btn border-2 fw-bold ms-auto" @click="handleEditUser" :disabled="isActive">{{ editUser.text }}</button>
                    </div>
                </div>
            </div>
            <div v-else>
                <p class="fw-bolder fs-5 pt-5 text-white">ไม่พบข้อมูลตัวตน โปรดตรวจสอบ <span class="fw-normal fs-6 text-decoration-underline">data/db.json</span></p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.btnDanger { --btn-color: #dc3545 }
.btnSuccess { --btn-color: #198754 }

.container {
    animation: dropDown 2s ease-in-out;
}

.typed-out {
    overflow: hidden;
    border-right: 3px solid orange;
    white-space: nowrap;
    font-size: 1.2rem;
    width: 0%;
    animation: typing 2s steps(8, end) forwards, blinking 0.6s infinite;
    animation-delay: 3s;
}

.btnDanger, .btnSuccess {
    animation: neonBorder 1.5s infinite alternate;
}

.btnDanger:hover, .btnSuccess:hover {
    color: white;
    transition: scale 0.3s;
    scale: 1.05;
}

label::after {
    background: none !important;
}

input:not(:disabled) {
  background-color: rgba(255, 255, 255, 0.2);
}

input:disabled {
  background-color: rgba(255, 255, 255, 0.1); 
}

button:focus, button:active {
    outline: none;
    box-shadow: none;
}

@media (max-width: 768px) {
    .btn img {
        max-width: 150px;
        max-height: 150px;
    }

    .form-floating input {
        max-width: 90%;
    }
}
</style>