import { shallowMount, createLocalVue } from '@vue/test-utils'
import { BootstrapVue } from 'bootstrap-vue'
import PokemonCollection from '@/views/PokemonCollection.vue'

const localVue = createLocalVue()
localVue.use(BootstrapVue)

const pokemonCollection = [{ id: 25, name: 'pikachu', customName: 'pikachu' }]

describe('PokemonCollection.vue', () => {
  const wrapper = shallowMount(PokemonCollection, { localVue })

  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  it('List of pokemon exists', () => {
    const msg = 'My pokemon\'s collection'
    expect(wrapper.text()).toMatch(msg)
  })

  it('Pikachu is in list of Pokemons', async () => {
    await wrapper.setData({ pokemonCollection: pokemonCollection })
    expect(wrapper.find('.pokemons-raw-data').text()).toContain('pikachu')
  })

  it('Bulbasuar is not in list of Pokemons', async () => {
    await wrapper.setData({ pokemonCollection: pokemonCollection })
    expect(wrapper.find('.pokemons-raw-data').text()).not.toBe('bulbasaur')
  })
})
