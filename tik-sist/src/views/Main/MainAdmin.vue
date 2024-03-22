<template>
  <v-container>
    <v-row justify="center">
      <v-tabs v-model="tab" color="deep-purple-accent-4" align-tabs="center">
        <v-tab :value="1">Активные тикеты</v-tab>
        <v-tab :value="2">Выполненые тикеты</v-tab>
      </v-tabs>
    </v-row>
    <v-window v-model="tab">
      <v-window-item :value="1">
        <br> <br>
        <v-container>
          <v-row class="ticket-pos" v-if="!loadind">
            <div v-for=" item in tickets" v-show="item.status == 'Created' ">
              <TicketCard :ticket="item" class="ticket-card"/>
            </div>
          </v-row>
          <v-row class="ticket-pos" v-if="loadind">
            <div v-for=" item in tickets" v-show="item.status == 'Created' ">
              <v-skeleton-loader
          class="mx-auto border skeleton-ticket"
          type=" article, actions"
        ></v-skeleton-loader>
             
            </div>
          </v-row>
        </v-container>
      </v-window-item>
      <v-window-item :value="2">
        <br>
        <v-container>
          <v-row class="ticket-pos" v-if="!loadind">
            <div v-for="item in tickets"  v-show="item.status == 'Done'">
              <TicketCard :ticket="item" class="ticket-card"/>
            </div>
          </v-row>
          <v-row class="ticket-pos" v-if="loadind">
            <div v-for="item in 10" v-show="item.status == 'Done'">
              <v-skeleton-loader
          class="mx-auto border skeleton-ticket"
          type=" article, actions"
        ></v-skeleton-loader>
            </div>

          </v-row>
          
        </v-container>
      </v-window-item>
    </v-window>
  </v-container>
</template>

<script>
import TicketCard from '../../components/Main/TicketCard.vue'

export default {
  name: 'MainAdmin',
  props: {
    ticket: Object
  },
  components: {
    TicketCard,
  },
  async mounted(){
    this.loadind = true;
   const res = await this.$store.dispatch("getAllTickets");
   if(res) this.loadind = false;
  },

  computed: {
    tickets() {
      return this.$store.state.ticket.tickets.toReversed();;
    },

  },

  data: () => ({
    tab: 1,
    loadind: false,
  }),
}
</script >
<style scoped>
.skeleton-ticket {
  width: 250px;
  border-radius: 20px;
  padding: 10px;
}

.ticket-pos {
  display: flex;
  align-items: center;
  justify-content: start;
}
.ticket-card {
height: 220px;
margin:5px; 
 
}

</style>