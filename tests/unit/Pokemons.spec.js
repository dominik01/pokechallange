import { shallowMount } from '@vue/test-utils'
import Pokemons from '@/views/Pokemons.vue'

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ results: [{ name: 'Charmander', id: 1 }] })
  })
)

beforeEach(() => {
  fetch.mockClear()
})

describe('Pokemons.vue', () => {
  const wrapper = shallowMount(Pokemons)

  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  it('List of pokemon exists', () => {
    const msg = 'Dominik\'s pokeIndex'
    expect(wrapper.text()).toMatch(msg)
  })

  it('Table with pokemons is visible after mounted', async () => {
    expect(wrapper.find('#pokemon-table').isVisible()).toBe(true)
  })

  test('If data not loaded, table is hidden', async () => {
    await wrapper.setData({ loaded: false })
    expect(wrapper.find('#pokemon-table').isVisible()).toBe(false)
  })
})
