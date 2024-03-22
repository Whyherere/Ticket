<template>
  <v-app>
    <v-main>
      <div class="container">
        <div v-if="this.user != ''">
          <img class="img"
            src="https://sun1-20.userapi.com/s/v1/ig2/QMbUxDekZdcFqMtVg66ieGV15hgouRDJ9GGYfr-h2myeHUEdRl7tmQMZ6MJpMfOpeBVPuNCWsNlCaIPCfx4w7rOX.jpg?size=2400x2400&quality=95&crop=0,0,2400,2400&ava=1">
          <div class="fl">
            <div>Имя:</div>
            <div v-if="!isEdit">{{ this.user.full_name }}</div>
            <div v-else>
              <input placeholder="Введите имя" type="text" v-model="name">
              <div class="box">
                <div v-if="erName.length">
                  <span v-for="error in erName" class="errors">{{ error }}<br></span>
                </div>
                <div v-if="!erName.length"></div>

              </div>
            </div>
          </div>

          <div class="fl">
            <div>Пароль: </div>
            <div v-if="!isEdit">{{ this.user.password }}</div>
            <div v-else>
              <input placeholder="Введите пароль" type="text" v-model="pass">
              <div class="box">
                <div v-if="erPassword.length">
                  <span v-for="error in erPassword" class="errors">{{ error }}<br></span>
                </div>
                <div v-if="!erPassword.length">
                  <div class="empty"></div>
                </div>
              </div>
            </div>
          </div>

          <div class="fl" v-if="!isEdit">
            <div>Логин: </div>
            <div>{{ this.user.login }} <div class="empty"></div>
            </div>
            <div class="empty"></div>
          </div>

          <div class="fl">
            <div>e-mail: </div>
            <div v-if="!isEdit">{{ this.user.email }}</div>
            <div v-else>
              <input placeholder="Введите email" type="text" v-model="email">
              <div class="box">
                <div v-if="erEmail.length">
                  <span v-for="error in erEmail" class="errors">{{ error }}<br></span>
                </div>
                <div v-if="!erEmail.length">
                  <div class="empty"></div>
                </div>
              </div>
            </div>
          </div>

          <div class="fl" v-if="!isEdit">
            <div>роль:</div>
            <div>{{ this.user.user_type }}</div>
          </div>
        </div>



        <v-btn @click="logOut" class="but" block v-if="!isEdit">
          выйти с аккаунта
        </v-btn>

        <v-btn @click="saveEdit" class="but" v-else>
          <p>Сохранить</p>
        </v-btn>

        <v-btn @click="Edit" class="but" block v-if="!isEdit">
          <p>Редактировать</p>
        </v-btn>

        <v-btn @click="cancel" class="but1" v-else>
          <p>Отменить </p>
        </v-btn>
      </div>
    </v-main>
  </v-app>
</template>
<script>
export default {
  name: 'UserInfo',
  components: {
  },
  data: () => ({
    isEdit: false,
    email: '',
    pass: '',
    name: '',
    erName: [],
    erPassword: [],
    erEmail: [],
  }),
  computed: {
    user() {
      return this.$store.state.user.curUser
    }
  },
  async mounted(){
      await this.$store.dispatch('getUser', { id: this.user.id})
    },
  methods: {
    logOut() {
      this.$store.commit('LOGOUT')
      this.$router.push('/login')
    },
    Edit() {
      this.isEdit = !this.isEdit
    },
    cancel() {
      this.isEdit = !this.isEdit
    },
    saveEdit() {
      this.erName = []
      this.erPassword = []
      this.erEmail = []
      while (this.name.length < 1 || this.pass.length < 1 || this.email.length < 1) {
        if (this.name.length < 1) {
          this.erName.push('Напишите имя!');
        }
        if (this.pass.length < 1) {
          this.erPassword.push('Напишите пароль!');
        }
        if (this.email.length < 1) {
          this.erEmail.push('Напишите email!');
        }
        return
      }
      const payload = {
        email: this.email,
        password: this.pass,
        full_name: this.name,
        id: this.user.id
      }
      
      this.$store.dispatch('editProfile', { id: this.user.id, userData: payload })
      this.isEdit = !this.isEdit
      this.email = ''
      this.pass = ''
      this.name = ''
    }
  }
}
</script>

<style>
.img {
  height: 100px;
  width: 100px;
  border-radius: 50%;
  border: 2px solid #e0e0e0;
  object-fit: cover;
}

.fl {
  display: flex;
  justify-content: center;
  
}

.but1 {
  display: block;
  margin: 1rem auto;

  border: none;
  background-color: #920e0e;
  color: white;
  font-weight: bold;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.but {
  display: block;
  margin: 1rem auto;

  border: none;
  background-color: #42b983;
  color: white;
  font-weight: bold;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.but:hover {
  background-color: #333;
}

.container {
  max-width: 300px;
  margin: 2rem auto;
  padding: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;

}
</style>