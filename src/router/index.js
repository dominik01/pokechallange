import Vue from 'vue'
import VueRouter from 'vue-router'
import Pokemons from '@/views/Pokemons'
import PokemonDetail from '@/views/PokemonDetail'
import PokemonCollection from '@/views/PokemonCollection'
import PokemonWishList from '@/views/PokemonWishList'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Pokemons',
    component: Pokemons
  },
  {
    path: '/my-collection',
    name: 'PokemonCollection',
    component: PokemonCollection
  },
  {
    path: '/wishlist',
    name: 'PokemonDetail',
    component: PokemonWishList
  },
  {
    path: '/pokemon/:pokemonName',
    component: PokemonDetail,
    name: 'pokemonDetail',
    props: true
  }
]

const router = new VueRouter({
  routes
})

export default router
