<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <h1>My pokemon's collection</h1>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="pokemons-raw-data">
          {{pokemonCollection}}
        </div>
        <b-table striped hover :fields="fields" :items="this.pokemonStorage.collection">
          <template #cell(name)="data">
            <router-link :to="{ name: 'pokemonDetail', params: { pokemonName: data.value }}">{{
                data.value
              }}
            </router-link>
          </template>
          <template #cell(customName)="data">
            <div>{{data.value}}</div>
          </template>
          <template #cell(action)="data">
            <b-button variant="outline-primary m-2" @click="removeFromCollection(data.index)">Remove</b-button>
            <b-button variant="outline-primary m-2" @click="renamePokemon(data.index)">Set custom name</b-button>
          </template>
        </b-table>
      </div>
    </div>
    <div class="row actions" v-show="editingName" ref="pokemonEdit">
      <div class="col-sm-5">
        <b-form-input v-model="customPokemonName" placeholder="Enter your name"></b-form-input>
      </div>
      <div class="col-sm-5 buttons">
        <b-button variant="success" @click="saveEdit(editingIndex)">Save</b-button>
        <b-button variant="danger" @click="cancelEdit()">Cancel</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import { storageMixin } from '@/mixins/storageMixin'

export default {
  name: 'PokemonCollection',
  mixins: [storageMixin],
  data () {
    return {
      fields: ['id', 'name', 'customName', 'action'],
      editingName: false,
      customPokemonName: '',
      editingIndex: null
    }
  },
  methods: {
    removeFromCollection (id) {
      this.pokemonCollection.splice(id, 1)
      window.localStorage.setItem('pokemons', JSON.stringify(this.pokemonStorage))
    },
    renamePokemon (id) {
      this.editingName = true
      this.customPokemonName = this.pokemonCollection[id].customName
      this.editingIndex = id
      this.$nextTick(() => {
        this.$refs.pokemonEdit.scrollIntoView(false)
      })
    },
    saveEdit (id) {
      this.editingName = false
      this.$set(this.pokemonCollection[id], 'customName', this.customPokemonName)
      window.localStorage.setItem('pokemons', JSON.stringify(this.pokemonStorage))
    },
    cancelEdit () {
      this.editingName = false
    }
  }
}
</script>

<style scoped lang="scss">
.pokemons-raw-data{
  display: none;
}
div.actions{
  margin-bottom: 2em;
  div{
    text-align: left;
  }
  div input{
    margin-top: 1em;
  }
  div.buttons button{
    margin-top: 1em;
    margin-right: 1em;
  }
}
</style>
