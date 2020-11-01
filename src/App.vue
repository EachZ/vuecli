<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">资源负载图</router-link> |
<!--      <router-link to="/about">About</router-link> |-->
      <router-link to="/page1">订单甘特图</router-link> |
      <router-link to="/page2">资源甘特图</router-link> |
      <router-link to="/page3">增删改查</router-link>
      <router-link to="/page4"> | page4</router-link>

    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
