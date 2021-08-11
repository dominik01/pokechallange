<template>
  <div class="container-fluid"><h1>My pokemon wishlist</h1>
    <div class="row">
      <div class="col">
        <b-table striped hover :fields="fields" :items="this.pokemonStorage.wishlist">
          <template #cell(name)="data">
            <router-link :to="{ name: 'pokemonDetail', params: { pokemonName: data.value }}">{{
                data.value
              }}
            </router-link>
          </template>
          <template #cell(action)="data">
            <b-button variant="outline-primary" @click="removeFromWhislist(data.index)">Remove</b-button>
          </template>
        </b-table>
      </div>
    </div>
  </div>

</template>

<script>
import { BTable, BButton } from 'bootstrap-vue'
import { storageMixin } from '@/mixins/storageMixin'

export default {
  name: 'PokemonWishList',
  components: { BTable, BButton },
  mixins: [storageMixin],
  data () {
    return {
      fields: ['id', 'name', 'action']
    }
  },
  methods: {
    removeFromWhislist (id) {
      this.pokemonWishList.splice(id, 1)
      window.localStorage.setItem('pokemons', JSON.stringify(this.pokemonStorage))
    }
  }

}
</script>

<style scoped>

</style>
