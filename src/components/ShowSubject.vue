<script setup lang="ts">
import { onMounted, ref, computed, watch } from 'vue';
import { type typeSubject } from '@/types/useTypes'
import { useSubjectStore } from '@/stores/subjects';
import Modal from '@/components/Modal.vue';

const emits = defineEmits(['showAlert']);

const { getSubject, setSubject, deleteSubject, addSubject } = useSubjectStore();

const subjectData = ref<typeSubject[]>([{ id: '', name: '', credit: '', grade: '' }]);
const subjectEdit = computed<typeSubject>(() => {
  if (selectIndex.value > -1) {
    return JSON.parse(JSON.stringify(subjectData.value[selectIndex.value]));
  }
  return { id: '', name: '', credit: '', grade: '' };
});

const show = ref<boolean>(false);

const createSubjectData = ref<typeSubject>({ id: '', name: '', credit: 'Credit', grade: 'Grade' });

const title = ref<string>('');
const closeModal = ref<boolean>(false);
const subTitle = computed(() => {
    if (title.value === 'เพิ่มรายวิชา') {
        return 'การเพิ่มรายวิชา โปรดกรอกข้อมูลให้ครบถ้วน';
    } else {
        return 'คุณสามารถลบรายวิชาได้ โดยการเลือก "Delete Subject"';
    }
})
const selectIndex = ref<number>(-1);
const selectDelete = ref<boolean>(false);

const handleAddSubject = async() => {
    if (createSubjectData.value.name === '' || createSubjectData.value.id === '' || createSubjectData.value.credit === 'Credit' || createSubjectData.value.grade === 'Grade') {
        emits('showAlert', { message: 'กรุณากรอกข้อมูลให้ครบถ้วน', type: 'alert-warning', time: 2000 });
        return;
    }

    if (subjectData.value.find(item => item.id === createSubjectData.value.id)) {
        emits('showAlert', { message: 'รหัสวิชาซ้ำโปรดแก้ไข', type: 'alert-warning', time: 2000 });
        return;
    }

    if (!Number(createSubjectData.value.id)) {
        emits('showAlert', { message: 'รหัสวิชาผิดฟอร์แมทโปรดแก้ไข', type: 'alert-warning', time: 2000 });
        return;
    }

    if (createSubjectData.value.id) {
        await addSubject(createSubjectData.value);

        await useHandleGetSubject();

        createSubjectData.value = { id: '', name: '', credit: 'Credit', grade: 'Grade' };
        emits('showAlert', { message: 'เพิ่มรายวิชาและบันทึกสำเร็จ', type: 'alert-success', time: 2000 });
    }
}

const handleDeleteSubject = async() => {
    await deleteSubject(subjectData.value[selectIndex.value].id);

    selectDelete.value = false;
    selectIndex.value = -1;
    emits('showAlert', { message: 'ลบรายวิชาและบันทึกสำเร็จ', type: 'alert-success', time: 2000 });
}

const handleEditSubject = async() => {
    if (JSON.stringify(subjectEdit.value) === JSON.stringify(subjectData.value[selectIndex.value])) {
        emits('showAlert', { message: 'ไม่มีการเปลื่ยนแปลงใดๆ', type: 'alert-info', time: 2000 });
        return;
    }

    if (!Number(subjectEdit.value.id)) {
        emits('showAlert', { message: 'รหัสวิชาผิดฟอร์แมทโปรดแก้ไข', type: 'alert-warning', time: 2000 });
        return;
    }

    await setSubject(subjectEdit.value,subjectData.value[selectIndex.value].id);

    emits('showAlert', { message: 'แก้ไขรายวิชาและบันทึกสำเร็จ', type: 'alert-success', time: 2000 });
}

const getData = async() => {
    if (title.value === 'เพิ่มรายวิชา') {
        await handleAddSubject();
    } else if (title.value === 'แก้ไขรายวิชา') {
        if (selectDelete.value) {
            await handleDeleteSubject();
        } else {
            await handleEditSubject();
        }

        await useHandleGetSubject();
    }
}

const useHandleGetSubject = async() => {
    const dataS = await getSubject();

    if (dataS) subjectData.value = dataS;
}

const clickEditSubject = async() => {
    await useHandleGetSubject();

    title.value = 'แก้ไขรายวิชา';
    selectIndex.value = 0;
}

onMounted(async () => {
    await useHandleGetSubject();

    setTimeout(() => {
        show.value = true;
    }, 2400);
});
</script>

<template>
    <div v-if="show" class="container pt-3">
        <div class="d-flex justify-content-center">
            <div class="flex-md-row align-items-center p-4 rounded-3" style="background-color: rgba(0, 0, 0, 0.2); backdrop-filter: blur(10px); max-width: 1100px; width: 90%;">
                <div class="d-flex">
                    <div class="d-flex align-items-center" style="display: inline-block;">
                        <div class="typed-out">รายวิชา จำนวน {{ subjectData.length }} วิชา</div>
                    </div>
                    <div class="ms-auto">
                        <button class="btn btn-outline-primary border-2 fw-bold mb-2 btnAdd" data-bs-toggle="modal" data-bs-target="#staticBackdrop" @click="title = 'เพิ่มรายวิชา'">Add Subject</button>
                        <button class="btn btn-outline-danger border-2 fw-bold mb-2 ms-2 btnEdit" data-bs-toggle="modal" data-bs-target="#staticBackdrop" @click="clickEditSubject">Edit Subject</button>
                    </div>
                </div>
                <div v-if="subjectData.length > 0" class="accordion" id="accordionExample">
                    <div v-for="(item, index) in subjectData" :key="index" class="accordion-item rounded-3 mb-2" style="background-color: rgba(0, 0, 0, 0.1); backdrop-filter: blur(10px);">
                        <h2 class="accordion-header" :id="'heading' + index">
                            <button class="accordion-button text-white fs-6" type="button" data-bs-toggle="collapse" :data-bs-target="'#collapse' + index" aria-expanded="false" :aria-controls="'collapse' + index" style="background-color: rgba(0, 0, 0, 0.1); backdrop-filter: blur(10px);">
                                {{ item.name }}
                            </button>
                        </h2>
                        <div :id="'collapse' + index" class="accordion-collapse collapse rounded-3" :aria-labelledby="'heading' + index">
                            <div class="accordion-body fw-bold text-white" style="background-color: rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px);">
                                <p>ชื่อวิชา: {{ item.name }}</p>
                                <p>รหัสวิชา: {{ item.id }}</p>
                                <p>หน่วยกิต: {{ item.credit }}</p>
                                <p>เกรด: {{ item.grade }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <p class="fw-bolder fs-5 pt-5 text-white">ไม่พบข้อมูลวิชา</p>
                </div>
            </div>
        </div>
    </div>
    <Modal :title="title" :subTitle="subTitle" :close="closeModal" @click="getData">
        <div v-if="title === 'เพิ่มรายวิชา'">
            <form class="form-floating">
                <div class="form-floating mb-3">
                    <input required type="text" class="form-control text-white border-0 rounded-3" placeholder="Subject ID" title="Subject ID" v-model="createSubjectData.id">
                    <label class="fs-6 text-white">Subject ID</label>
                </div>
                <div class="form-floating mb-3">
                    <input required type="text" class="form-control text-white border-0 rounded-3" placeholder="Subject Name" title="Subject Name" v-model="createSubjectData.name">
                    <label class="fs-6 text-white">Subject Name</label>
                </div>
                <select required class="form-select text-white mb-3" aria-label="Credit" v-model="createSubjectData.credit">
                    <option selected>Credit</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <select required class="form-select text-white mb-3" aria-label="Grade" v-model="createSubjectData.grade">
                    <option selected>Grade</option>
                    <option value="A">A</option>
                    <option value="B+">B+</option>
                    <option value="B">B</option>
                    <option value="C+">C+</option>
                    <option value="C">C</option>
                    <option value="D+">D+</option>
                    <option value="D">D</option>
                    <option value="F">F</option>
                </select>
            </form>
        </div>
        <div v-if="title === 'แก้ไขรายวิชา'">
            <form v-if="subjectData.length > 0" class="form-floating">
                <select required class="form-select text-white mb-3" aria-label="Grade" v-model="selectIndex" :disabled="selectDelete">
                    <option v-for="(item, index) in subjectData" :key="index" :value=index>{{ item.name }}</option>
                </select>
                <div class="form-floating mb-3">
                    <input required type="text" class="form-control text-white border-0 rounded-3" placeholder="Subject ID" title="Subject ID" v-model="subjectEdit.id" :disabled="selectDelete">
                    <label class="fs-6 text-white">Subject ID</label>
                </div>
                <div class="form-floating mb-3">
                    <input required type="text" class="form-control text-white border-0 rounded-3" placeholder="Subject Name" title="Subject Name" v-model="subjectEdit.name" :disabled="selectDelete">
                    <label class="fs-6 text-white">Subject Name</label>
                </div>
                <select required class="form-select text-white mb-3" aria-label="Credit" v-model="subjectEdit.credit" :disabled="selectDelete">
                    <option selected>Credit</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <select required class="form-select text-white mb-3" aria-label="Grade" v-model="subjectEdit.grade" :disabled="selectDelete">
                    <option selected>Grade</option>
                    <option value="A">A</option>
                    <option value="B+">B+</option>
                    <option value="B">B</option>
                    <option value="C+">C+</option>
                    <option value="C">C</option>
                    <option value="D+">D+</option>
                    <option value="D">D</option>
                    <option value="F">F</option>
                </select>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" v-model="selectDelete" id="flexCheckDefault">
                    <label class="form-check-label" for="flexCheckDefault">
                        Delete Subject
                    </label>
                </div>
                <small v-if="selectDelete" class="text-danger">คุณกำลังเลือกลบวิชา {{ subjectData[selectIndex].name }}</small>
            </form>
            <div v-else>
                <p class="text-danger">โปรดเพิ่มรายวิชาก่อน</p>
            </div>
        </div>
    </Modal>
</template>

<style scoped>
.btnAdd { --btn-color: #0d6efd }
.btnEdit { --btn-color: #dc3545 }

.container {
    animation: dropDown 2s ease-in-out;
}

.accordion-button::after {
    filter: invert(1);
}

.btnAdd, .btnEdit {
    animation: neonBorder 1.5s infinite alternate;
}

.btnAdd:hover, .btnEdit:hover {
    color: white;
    transition: scale 0.3s;
    scale: 1.05;
}

input:not(:disabled), select:not(:disabled) {
  background-color: rgba(255, 255, 255, 0.1);
}

input:disabled, select:disabled {
  background-color: rgba(255, 255, 255, 0.5);
}

label::after {
    background: none !important;
}

button:focus, button:active {
    outline: none;
    box-shadow: none;
}

.form-select {
    border: none;
    outline: none;
    box-shadow: none;
}

select:focus, 
select:active {
    background-color: rgba(255, 255, 255, 0.3);
}

input:focus, 
input:active {
    background-color: rgba(255, 255, 255, 0.3);
    outline: none;
    box-shadow: none;
}

.form-select option {
    background-color: black;
}

.typed-out {
    overflow: hidden;
    border-right: 3px solid orange;
    white-space: nowrap;
    font-size: 1.0rem;
    width: 0%;
    animation: typing 2s steps(22, end) forwards, blinking 0.6s infinite;
    animation-delay: 4s;
}
</style>

