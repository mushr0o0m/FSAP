<template>
  <div class="v-main-wrapper">
    <header class="mb-5">
      <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <div class="container-fluid">
      <a class="navbar-brand" href="https://fakestoreapi.com/">Fake Api Store</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Переключить навигацию">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <form class="d-flex me-auto my-3 my-md-0">
          <input class="form-control me-2" type="search" placeholder="Поиск" aria-label="Поиск">
          <button class="btn btn-outline-success" type="submit">Поиск</button>
        </form>
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="#">
              <i class="bi bi-house nav-icon"></i>
            </a>
          </li>
          <li class="nav-item">
            
            <a class="nav-link position-relative" href="#">
              <i class="bi bi-cart4 nav-icon "></i>
              <span class="position-absolute translate-middle badge rounded-pill bg-danger">
                
              </span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <i class="bi bi-star nav-icon"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
    </nav>
    </header>
    <main class="py-5">
      <div class="container">
        <catalog />
      </div>
    </main>
  </div>
</template>
  
<script>
import Catalog from '@/components/Catalog.vue'

export default {
  name: 'v-main-wrapper',
  components: {
    Catalog
  },
}
</script>
<style>
  .nav-icon{
    margin: auto;
    font-size: 26px;
  }
</style>