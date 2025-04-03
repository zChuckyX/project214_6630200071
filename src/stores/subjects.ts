import { ref } from 'vue';
import { defineStore } from 'pinia';
import { type typeSubject } from '@/types/useTypes';

export const useSubjectStore = defineStore('subject', () => {
  const subjects = ref<typeSubject[]>();

  const setSubject = async(data: typeSubject, subject_id: string) => {
    try {
        if (data.id === subject_id) {
            const response = await fetch(`http://localhost:3000/subjects/${subject_id}`, {
                method: 'PUT', 
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (!response.ok) throw ('ไม่สามารถแก้ไขวิชาเรียนได้ โปรดตรวจสอบ');
        } else {
            await deleteSubject(subject_id); 
            await new Promise(res => setTimeout(res, 100)); 
            await addSubject(data); 
        }
    } catch (error) {
        alert(error);
    }
  }

  const deleteSubject = async(subject_id: string) => {
    try {
        const response = await fetch(`http://localhost:3000/subjects/${subject_id}`, {
            method: 'DELETE', 
            headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) throw ('ไม่สามารถลบวิชาเรียนได้ โปรดตรวจสอบ');
    } catch (error) {
        alert(error);
    }
  }

  const addSubject = async(data: typeSubject) => {
    try {
        const response = await fetch('http://localhost:3000/subjects', {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (!response.ok) throw ('ไม่สามารถเพิ่มวิชาเรียนได้ โปรดตรวจสอบ');
    } catch (error) {
        alert(error);
    }
  }

  const getSubject = async() => {
    try {
        const response = await fetch('http://localhost:3000/subjects/');

        if (!response.ok) throw ('ไม่สามารถดึงข้อมูลวิชาเรียนได้ โปรดตรวจสอบ');

        subjects.value = await response.json();

        return subjects.value;
    } catch (error) {
        alert(error);
    }
  }

  return { setSubject, getSubject, deleteSubject, addSubject };
})
