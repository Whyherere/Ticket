<template>
    <v-app>
      <v-main>
        <LoginForm v-if="user == ''"/>
        <p v-else="">Вы уже в аккаунте</p>
      </v-main>
    </v-app>
  </template>
  
  <script>
  
  import LoginForm from '@/components/Login/LoginForm.vue'
  
  export default {
    name: 'Login',
  
    components: {
      LoginForm,
    },
    computed: {
      user() {
        return this.$store.state.user.curUser
      }
    },
  
    data: () => ({
      //
    }),
  }
  </script>
  