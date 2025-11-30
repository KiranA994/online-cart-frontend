<template>
  <div class="page-wrapper flex justify-center items-center min-h-screen">
   <div class="container">
       <Vueform
       ref="form$"
       v-model="formData"
       :endpoint="false"
       :display-errors="false"
       class="p-6 rounded-xl shadow-md"
       @submit="handleSubmit"
       >
           <h2 class="text-xl font-inter mb-4 text-center text-orange-500">
          {{ isLogin ? 'Login' : 'Register' }}
           </h2>
         <div class="mb-4">
            <TextElement 
            v-if="!isLogin"
            name="username"
            label="Username"
            input-type="text"
            autocomplete="off"
            :floating="false"
            class="form-input"
            :rules="['required', 'min:5', 'max:8']"
            :messages="{ 
              required: 'Please enter the username',
              min: 'Username must be atleast 5 characters',
              max: 'Username cannot be more than 8 characters',
            }"
            />
         </div>

        <div class="my-4">
            <TextElement 
            name="email"
            label="Email"
            class="form-input"
            input-type="email"
            autocomplete="off"
            :floating="false"
            :rules="['required', 'email']"
            :messages="{ 
              required: 'Please enter the email',
              email: 'Please enter a valid email address'
            }"
            />
        </div>

       <div class="my-4">
            <TextElement 
            name="password"
            label="Password"
            input-type="password"
            autocomplete="off"
            :floating="false"
            class="form-input"
            :rules="['required', 'min:5', 'max:8']"
            :messages="{ 
              required: 'Please enter the password',
              min: 'Password must be atleast 5 characters',
              max: 'Password cannot be more than 8 characters',
            }"
            />
       </div>

          <div class="flex justify-center items-center bg-amber-500 p-3 rounded-lg hover:bg-black hover:text-white">
               <ButtonElement name="button" submits>
                {{ isLogin ? 'Login' : 'Register' }}
              </ButtonElement>
          </div>
          <p class="text-sm text-center mt-3">
                {{ isLogin ? "Don't have an account?" : "Already have an account?" }}
                <button type="button" class="text-blue-600 font-semibold" @click="toggleMode">
                  {{ isLogin ? 'Register' : 'Login' }}
                </button>
          </p>
       </Vueform>
   </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth'

const auth = useAuthStore();
const isLogin = ref(true);
const form$ = ref(null);
const formData = ref({});
const handleSubmit = async() => {
  await auth.login(formData.value);
  navigateTo('/dashboard');
}
const toggleMode = () => {
  isLogin.value = !isLogin.value
  formData.value = {};
}
</script>

<style lang="css" scoped>
.page-wrapper {
  background: url('../../assets/img/login.png');
  background-repeat: no-repeat;
  background-size: cover;
}
.container{
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  background-color: rgba(255, 255, 255, 0.75);
  border-radius: 12px;
  border: 1px solid rgba(209, 213, 219, 0.3);
  max-width: 400px;
}

::v-deep(.form-input .form-p-input){
  padding: 8px;
  margin-top: 8px;
  border-radius: 8px;
  width: 100%;
}
::v-deep(.form-input .form-color-danger){
  color: red;
}
::v-deep(.form-input .form-text){
  color: rebeccapurple;
}
</style>
