<template>
  <div class="pokemon-list container-fluid">
    <h1>Dominik's pokeIndex</h1>
    <div class="row">
      <div class="col-md-6">
        <div class="overflow-auto">
          <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            aria-controls="my-table"
          ></b-pagination>
          <p class="mt-3">Current Page: {{ currentPage }}</p>
        </div>
      </div>
      <div class="col-md-6">
        <b-form-group
          label="Filter"
          label-for="filter-input"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              id="filter-input"
              v-model="filter"
              type="search"
              placeholder="Type to Search"
            ></b-form-input>
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </div>
    </div>
    <div class="row" v-show="!loaded">
      <b-spinner variant="primary" label="Spinning"></b-spinner>
    </div>
    <div class="row" v-show="loaded">
      <div class="col-md-12">
        <b-table
          show-empty
          striped
          sort-icon-left
          id="my-table"
          :items="pokemonList"
          :filter="filter"
          :fields="fields"
          :per-page="perPage"
          :current-page="currentPage"
          @filtered="onFiltered"
        >
          <template #cell(index)="data">
            {{ (data.index + 1) + ((currentPage - 1) * perPage) }}
          </template>

          <template #cell(name)="data">
            <router-link :to="{ name: 'pokemonDetail', params: { pokemonName: data.value }}">{{
                data.value
              }}
            </router-link>
          </template>
        </b-table>
      </div>
    </div>

  </div>
</template>

<script>
import { pokeApiUrl } from '@/main'

export default {
  name: 'Pokemons',
  data () {
    return {
      perPage: 20,
      fields: [
        'index',
        {
          key: 'name',
          sortable: true
        }],
      currentPage: 1,
      pokemonList: [],
      totalRows: 1,
      filter: null,
      loaded: false
    }
  },
  methods: {
    onFiltered (filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    }
  },
  mounted () {
    fetch(`${pokeApiUrl}/pokemon?limit=10000/`)
      .then(response => response.json())
      .then(data => {
        this.pokemonList = data.results
        this.totalRows = data.results.length
        this.loaded = true
      })
  }
}
</script>

<style lang="scss" scoped>
.pokemon-list {
  text-align: left;
  width: 95%;
  margin: auto;
}
</style>
