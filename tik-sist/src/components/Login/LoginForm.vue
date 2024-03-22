<template>
  <br>

  <v-sheet width="300" class="mx-auto">
    <v-form @submit.prevent>
      <v-text-field v-model="login" label="Логин" />
      <div class="box">
        <div v-if="errorsLogin.length" class="errorBox">
          <span v-for="error in errorsLogin" class="error">{{ error }}<br></span>
        </div>
        <div v-if="!errorsLogin.length">
          <div class="empty"></div>
        </div>
      </div>
      <v-text-field type="password" v-model="password" label="Пароль" class="input" />
      <div class="box">
        <div v-if="errorsPassword.length" class="errorBox">
          <span v-for="error in errorsPassword" class="error">{{ error }}<br></span>
        </div>
        <div v-if="!errorsPassword.length">
          <div class="empty"></div>
        </div>
      </div>
      <v-btn v-if="!loading" @click="checkData" type="submit" block class="mt-2">Войти</v-btn>
      <v-btn v-if="loading" disabled type="submit" block class="mt-2"><v-progress-circular color="primary"
          indeterminate="disable-shrink" size="16" width="2"></v-progress-circular></v-btn>
    </v-form>
  </v-sheet>
</template>
<script>
export default {
  name: 'LoginForm',

  data: () => ({
    login: '',
    password: '',
    errorsLogin: [],
    errorsPassword: [],
    loading: false,

  }),
  methods: {
    async checkData() {
      this.loading = true
      this.errorsPassword = [];
      this.errorsLogin = [];

      if (this.password.length < 3) {
        this.errorsPassword.push('Пароль должеть быть больше 3 символов');
        this.loading = false
      }

      if (this.login.length < 3) {
        this.errorsLogin.push('Логин должеть быть больше 3 символов');
        this.loading = false
      }
      const userData = {
        login: this.login,
        password: this.password,
      }
      // this.$store.commit('LOGIN', userData)
      let res = await this.$store.dispatch("login", userData)
      if (res) {
        this.loading = false
      }
      if (this.$store.state.user.curUser != '') {
        this.$router.push('/')
      }
      this.loading = false
    }
  }
}
</script>
<style>
.errors {
  color: rgb(150, 28, 28);
  font-size: 12px;
}

.empty {
  height: 24px;
}

.box {
  margin-top: -15px;
}
</style>