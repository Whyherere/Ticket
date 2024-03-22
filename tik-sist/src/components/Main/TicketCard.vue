<template>
  <div>
    <v-dialog max-width="500" v-model="dialog">
      <template v-slot:activator="{ props: activatorProps }">
        <div class="card-container">
          <v-card variant='outlined' width="250px"
            :color="ticket.priority == 'Высокая' ? 'red' : ticket.priority == 'Средняя' ? 'orange' : 'grey'">
            <v-card-item class="padding">
              <div>
                <div class="text-overline mb-1 ticket_content">
                  {{ ticket.from }}
                </div>
                <div class="text-h6 mb-1 ticket_content">
                  {{ ticket.summary }}
                </div>
                <div class="text-caption ticket_content ticket ticket_content">{{ ticket.content }}</div>
              </div>
            </v-card-item>
            <v-card-actions class="flex">
              <div>
                <v-btn class="mx-auto" @click="deleteTicket(ticket)">
                  УДАЛИТЬ
                </v-btn>
                <v-btn v-bind="activatorProps">
                  <p>Показать</p>
                </v-btn>
              </div>
            </v-card-actions>
          </v-card>
        </div>
      </template>
      <template v-slot:default="{ isActive }">
        <v-card title="Диалог">
          <v-card-text>
            <div>
              <div class="dialog-card">
                <p>{{ 'Тема: ' + ticket.summary }}</p>
                <p>{{ 'Содержание: ' + ticket.content }}</p>
                <p>Важность: <span
                    :style="{ 'color': ticket.priority == 'Высокий' ? 'red' : ticket.priority == 'Средний' ? 'orange' : 'grey' }">{{
                    ticket.priority
                    }}</span></p>
                <p>{{ 'Пользователь: ' + ticket.from }}</p>
                <p>Статус: <span :style="{ 'color': ticket.status == 'Done' ? 'green' : 'red' }">{{ticket.status
                    }}</span></p>
                <p>{{ 'Дата создания: ' + ticket.create_date }}</p>
                <hr class="hr" v-if="ticket.status == 'Done'">
                <p v-if="ticket.status == 'Done'">{{ 'Ответ: ' + ticket.answ }}</p>
                <p class="textareaP" v-else v-show="user.user_type == 'admin'">Ваш ответ...
                  <br>
                  <textarea v-model="answ" placeholder=""></textarea>
                <div class="box">
                  <div v-if="erContent.length" class="errorBox">
                    <br>
                    <span v-for="error in erContent" class="error">{{ error }}<br></span>
                  </div>
                  <div v-if="!erContent.length">
                    <div class="empty"></div>
                  </div>
                </div>
                </p>
                <p v-if="ticket.status == 'Done'">{{ 'Дата ответа: ' + ticket.update_date }}</p>
              </div>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text="Close Dialog" @click="isActive.value = false"></v-btn>
            <v-btn class="dialog-button"   text="Пометить как выполненное" @click="replyTicket()"
              v-show="user.user_type == 'admin' && ticket.status == 'Created'"></v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      answ: "",
      dialog: false,
      erContent: [],
      answ: '',
      
    }
  },
  props: {
    ticket: Object,
  },
  computed: {
    user() {
      return this.$store.state.user.curUser
    }
  },
  methods: {
    deleteTicket() {
      let id = this.ticket.id
      this.$store.dispatch('deleteTicket',id)
      // this.$store.commit("DELETE_TICKET", { id: this.ticket.id });
    },
    replyTicket() {
      this.erContent = []
      if (this.answ.length < 10) {
        this.erContent.push('Дайте полный ответ');
      }
      let payload = {
        answ: this.answ,
        status: "Done",
        id: this.ticket.id
      }
      //   this.$store.commit("REPLY_TICKET", payload)
      if (this.erContent.length === 0) {
        this.$store.dispatch('updateTicket', { id: this.ticket.id, ticketData: payload })
       
      }
    }
  }
}
</script>

<style>
.dialog-card {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  padding: 20px;
  
}
.ticket_content {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.dialog-button {
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  margin-right: 10px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s;
}

.textareaP {
  border: 1px solid #cccccc;
  border-radius: 4px;
  padding: 10px;
  height: 100px;
  margin-bottom: 17px;
}

textarea {
  width: 100%;

}

.flex {
  justify-content: space-around;
  margin: 5px;
}
</style>