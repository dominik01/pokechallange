<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Pokemons</router-link> |
      <router-link to="/my-collection">My pokemons</router-link> |
      <router-link to="/wishlist">Whishlist</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: cursive, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  h1{
    text-align: center;
    margin-bottom: 1.5em;
    color: #183d82;
    border-bottom: 1px solid #9a9a9a;
  }
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #3392d0;
    }
  }
}
</style>
