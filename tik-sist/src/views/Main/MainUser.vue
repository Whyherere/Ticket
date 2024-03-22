<template>
  <v-container>
    <v-row justify="center">
      <v-tabs v-model="tab" color="deep-purple-accent-4" align-tabs="center">
        <v-tab :value="1">Форма</v-tab>
        <v-tab :value="2">История тикетов</v-tab>
      </v-tabs>
    </v-row>
    <v-window v-model="tab">
      <v-window-item :value="1">
        <br>
        <v-container fluid>
          <v-row>
            <v-sheet width="300" class="mx-auto">
              <v-form @submit.prevent>
                <v-text-field v-model="summary" label="Тема тикета" class="mt-2" />
                <div class="box">
                  <div v-if="erSummary.length" class="errorBox">
                    <span v-for="error in erSummary" class="error">{{ error }}<br></span>
                  </div>
                  <div v-if="!erSummary.length">
                    <div class="empty"></div>
                  </div>
                </div>
                <v-textarea v-model="content" label="Описание проблемы" class="mt-2" />
                <div class="box">
                  <div v-if="erContent.length" class="errorBox">
                    <span v-for="error in erContent" class="error">{{ error }}<br></span>
                  </div>
                  <div v-if="!erContent.length">
                    <div class="empty"></div>
                  </div>
                </div>
                <v-select v-model="priority" label="Описание проблемы" :items="['Низкий', 'Средний', 'Высокий']"
                  class="mt-2" />
                <div class="box">
                  <div v-if="erPriority.length" class="errorBox">
                    <span v-for="error in erPriority" class="error">{{ error }}<br></span>
                  </div>
                  <div v-if="!erPriority.length">
                    <div class="empty"></div>
                  </div>
                </div>

                <v-btn @click="addTicket"  type="submit" block class="mt-2">Создать тикет</v-btn>
               
              </v-form>
            </v-sheet>
          </v-row>
        </v-container>
      </v-window-item>

      <v-window-item :value="2">
        <br>
        <v-container fluid>
          <v-row class="ticket-pos ">
            <div v-for="item in ticket" v-if="loading">
              <v-skeleton-loader class="border skeleton" width="250" height="250" type="article">
              </v-skeleton-loader>
            </div>
            <div v-for="item in ticket" v-if="!loading">
              <TicketCard :ticket="item" />
            </div>
          </v-row>
        </v-container>
      </v-window-item>
    </v-window>
  </v-container>
</template>

<script>
import TicketCard from '../../components/Main/TicketCard.vue';

export default {
  name: 'MainUser',
  components: {
    TicketCard,
  },
  async mounted() {
    this.loading = true
    const res = await this.$store.dispatch('getUserTickets', this.user.login)
    if (res) {
      setTimeout(() => this.loading = false, 1000);
    }
  },
  data: () => ({
    tab: 1,
    summary: '',
    content: '',
    priority: '',
    erSummary: [],
    erContent: [],
    erPriority: [],
    loading: false,
   
  }),
  computed: {
    ticket() {
      return this.$store.state.ticket.tickets.toReversed();
    },
    user() {
      return this.$store.state.user.curUser;
    },
  },
  methods: {
    async addTicket() {
      this.erSummary = [];
      this.erContent = [];
      this.erPriority = [];
      if (this.summary.includes('0') || this.summary.includes('1') || this.summary.includes('2') || this.summary.includes('3') || this.summary.includes('4') || this.summary.includes('5') || this.summary.includes('6') || this.summary.includes('7') || this.summary.includes('8') || this.summary.includes('9')) {
        setTimeout(() =>  false);
        this.erSummary.push('Название не должно содержать цифры');
      }
      if (this.summary.length < 3) {
        setTimeout(() =>  false);
        this.erSummary.push('Название должно быть больше 3 символов');
      }

      if (this.content.length < 15) {
        setTimeout(() =>  false);
        this.erContent.push('Ваша проблема должна быть более подробной');
      }

      if (this.priority.length == 0) {
        setTimeout(() =>  false);
        this.erPriority.push('Выберите значимость вашей проблемы');
      }

      if (this.erSummary.length === 0 && this.erContent.length === 0 && this.erPriority.length === 0) {
        const newTicket = {
          summary: this.summary,
          content: this.content,
          priority: this.priority,
          from: this.user.login
        };
        let res = await this.$store.dispatch('addTicket', newTicket)
        if (res) {
          setTimeout(() =>  false);
        }
      }
      this.summary = '';
      this.content = '';
      this.priority = '';
    }
  }
}
</script>

<style>
.ticket-pos {
  display: flex;
  gap: 16px;
  width: 100%;
}

.ticket {
  margin: 10px 0 10px 0;
  padding: 10px;
}

.hr {
  width: 100%;
}
</style>