export const storageMixin = {
  mounted () {
    this.pokemonStorage = this.getPokemonCollection()
    this.pokemonCollection = this.pokemonStorage.collection
    this.pokemonWishList = this.pokemonStorage.wishlist
  },
  data () {
    return {
      pokemonStorage: {},
      pokemonCollection: {},
      pokemonWishList: {}
    }
  },
  methods: {
    getPokemonCollection () {
      let pokemonStorage = window.localStorage.getItem('pokemons')
      if (pokemonStorage === null) {
        window.localStorage.setItem('pokemons', JSON.stringify({ collection: [], wishlist: [] }))
        pokemonStorage = window.localStorage.getItem('pokemons')
      }
      try {
        pokemonStorage = JSON.parse(pokemonStorage)
      } catch (e) {
        console.log('Unexpected values in pokemon storage')
      }
      return pokemonStorage
    }
  }
}
