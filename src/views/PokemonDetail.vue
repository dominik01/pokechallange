<template>
  <div class="pokemon-detail container">
    <div class="row" v-show="!loaded">
      <b-spinner variant="primary" label="Spinning"></b-spinner>
    </div>
    <div v-if="!errorMsg && loaded">
      <div class="row mb-3">
        <div class="col"><h1>{{ pokemonName | capitalize }}</h1></div>
      </div>
      <div class="row mb-3">
        <table class="intro">
          <tr>
            <td>Weight: {{pokemonAttributes.weight}}</td>
            <td>Height: {{pokemonAttributes.height}}</td>
            <td>Type: {{pokemonAttributes.types[0].type.name | capitalize}}</td>
          </tr>
        </table>
      </div>
      <div class="row mb-3">
        <div class="col-md-12">
          <img v-show="pokemonAttributes.sprites.front_default" :src="pokemonAttributes.sprites.front_default"
               alt="pokemon-front" class="pokemon-image"/>
          <img v-show="pokemonAttributes.sprites.front_shiny" :src="pokemonAttributes.sprites.front_shiny"
               alt="pokemon-front" class="pokemon-image"/>
          <img v-show="pokemonAttributes.sprites.back_default" :src="pokemonAttributes.sprites.back_default"
               alt="pokemon-back" class="pokemon-image"/>
          <img v-show="pokemonAttributes.sprites.back_shiny" :src="pokemonAttributes.sprites.back_shiny"
               alt="pokemon-back" class="pokemon-image"/>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <b-tabs content-class="mt-3" fill>
            <b-tab title="Basic stats" active>
              <table>
                <tr>
                  <th>Base</th>
                  <th>Stats</th>
                </tr>
                <tr v-for="(pokemonStat, key) in pokemonAttributes.stats" :key="key">
                  <td>{{ pokemonStat.stat.name | capitalize }}</td>
                  <td>{{ pokemonStat.base_stat }}</td>
                </tr>
              </table>

            </b-tab>
            <b-tab title="Moves">
              <ul class="moves">
                <li v-for="(pokemonStat, key) in pokemonAttributes.moves" :key="key">{{ pokemonStat.move.name }}
                </li>
              </ul>
            </b-tab>
            <b-tab title="Held items">
              <p v-if="pokemonAttributes.held_items.length === 0">This pokemon doesn't hold any items</p>
              <div v-else>
                <ul>
                  <li v-for="(item, key) in pokemonAttributes.held_items" :key="key">{{item.item.name}}</li>
                </ul>
              </div>
            </b-tab>
          </b-tabs>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col">
          <b-alert
            dismissible
            v-model = pokemonAdded
            :variant= alertType
            fade
          >
            {{ actionMsg }}
          </b-alert>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="text-center">
            <b-button class="m-1" size="lg" variant="success" id="tp-1" @click="saveToCollection()">
              <b-icon-globe2/>
              Catch!
            </b-button>
            <b-tooltip target="tp-1" triggers="hover">
              Add <b>{{ pokemonName }}</b> to your collection
            </b-tooltip>
            <b-button class="m-1" size="lg" variant="outline-primary" @click="saveToWishlist()">
              <b-icon-heart/>
              Add to wishlist
            </b-button>
          </div>
        </div>
      </div>

    </div>
    <h3 class="text-center" v-else>{{ errorMsg }}</h3>
  </div>
</template>

<script>
import { storageMixin } from '@/mixins/storageMixin'
import { capitalize } from '@/filters/capitalize'
import { pokeApiUrl } from '@/main'

export default {
  name: 'PokemonDetail',
  props: {
    pokemonName: String
  },
  data () {
    return {
      loaded: false,
      pokemonAdded: false,
      errorMsg: '',
      actionMsg: '',
      alertType: 'success',
      pokemonAttributes: {},
      pokemonImageUrl: ''
    }
  },
  mixins: [storageMixin],
  filters: {
    capitalize
  },
  created () {
    this.loadPokemon()
  },
  methods: {
    loadPokemon () {
      fetch(`${pokeApiUrl}/pokemon/${this.pokemonName}`)
        .then(response => {
          if (response.status === 404) {
            this.errorMsg = 'Error, pokemon not found'
            return
          }
          return response.json()
        })
        .then(data => {
          this.pokemonAttributes = data
          this.loaded = true
        })
        .catch((error) => {
          console.error('Error:', error)
        })
    },
    saveToCollection () {
      this.pokemonCollection.push({
        id: this.pokemonAttributes.id,
        name: this.pokemonName
      })
      this.pokemonAdded = true
      this.alertType = 'success'
      this.actionMsg = 'Pokemon added to your collection'
      window.localStorage.setItem('pokemons', JSON.stringify(this.pokemonStorage))
    },
    saveToWishlist () {
      if (this.pokemonWishList.some(pokemon => pokemon.id === this.pokemonAttributes.id)) {
        this.actionMsg = 'This pokemon is already in wishlist'
        this.alertType = 'danger'
      } else {
        this.pokemonWishList.push({
          id: this.pokemonAttributes.id,
          name: this.pokemonName,
          customName: ''
        })
        this.actionMsg = `${this.pokemonName} added to wishlist.`
        this.alertType = 'success'
        window.localStorage.setItem('pokemons', JSON.stringify(this.pokemonStorage))
      }
      this.pokemonAdded = true
    }
  },
  watch: {
    $route (detail) {
      this.loadPokemon()
    }
  }
}
</script>

<style scoped lang="scss">

.pokemon-detail {
  ul {
    list-style: none;
  }
  ul.moves{
    column-count: 4;
  }
  .pokemon-image {
    width: 200px;
  }
  table {
    border-collapse: collapse;
    width: 100%;
    td,
    th {
      text-align: left;
      padding: 8px;
    }
    tr:nth-child(even) {
      background-color: #ff9994;
    }
  }
  table.intro{
    td{
      text-align: center;
    }
    td:nth-child(even) {
      background-color: #ff9994;;
    }
    td:nth-child(odd) {
      background-color: cornsilk;
    }
  }
}
</style>
