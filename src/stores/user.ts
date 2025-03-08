import { ref } from 'vue';
import { defineStore } from 'pinia';
import { type typeUser } from '@/types/useTypes';

export const useUserStore = defineStore('user', () => {
  const user = ref<typeUser>();

  const setUser = async(data: typeUser) => {
    try {
      const response = await fetch('http://localhost:3000/student/', {
        method: 'PUT', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!response.ok) throw ('ไม่สามารถแก้ไขข้อมูลตัวตนได้ โปรดตรวจสอบ');
    } catch (error) {
      alert(error);
    }
  }

  const getUser = async() => {
    try {
      const response = await fetch('http://localhost:3000/student');

      if (!response.ok) throw ('ไม่สามารถดึงข้อมูลตัวตนได้ โปรดตรวจสอบ');

      user.value = await response.json();

      return user.value;
    } catch (error) {
      alert(error);
    }
  }

  return { setUser, getUser };
})
