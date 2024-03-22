<template>
    <v-app>
      <v-main>
        <UserInfo />
      </v-main>
    </v-app>
  </template>
  
  <script>
  
  import UserInfo from '@/components/Profile/UserInfo.vue';

  export default {
    name: 'Profile',
  
    components: {
      UserInfo,
    },
  
    data: () => ({
      //
    }),
    mounted() {
      if(this.$store.state.user.curUser == ''){
        this.$router.push('/login')
      }
    }
  }
  </script>
  