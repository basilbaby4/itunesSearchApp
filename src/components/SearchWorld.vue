<template>
  <div class="font-monospace">
    <div class="row">
      <div class="col-3 searchNav vh-100">
        <label class="m-3">iTunes Search</label>

        <form @submit.prevent="submitted" class="p-2">
          <div class="form-group">
            <vue-bootstrap-typeahead
              :data="artistList"
              v-model="artistName"
              size="lg"
              class="searchInput"
              placeholder="Type an Artist Name..."
              @hit="val = $event"
            />
          </div>

          <label
            class="mt-1 noartist"
            v-if="artistName != '' && artistList.length == 0"
            >No artist found.</label
          >

          <button
            :disabled="artistList.length == 0"
            class="btn btn-success searchBtn m-3"
          >
            <b-icon icon="search"></b-icon>
            Search
          </button>
        </form>
      </div>

      <div class="col-9 results m-3" v-if="list.length > 0">
        <label class="albums"> {{list[0].artistName}} : Albums</label>

        <div class="float-end">
          <div class="input-group">
            <div class="form-outline">
              <input
                type="search"
                v-model="search"
                placeholder="Serach Album..."
                id="form1"
                class="form-control h-40"
              />
            </div>
            <button type="button" class="btn btn-primary">
              <b-icon icon="search"></b-icon>
            </button>
          </div>
        </div>

        <div class="clearfix"></div>

        <div class="row mt-3">
          <div class="" v-if="filteredList.length == 0">
            No results for "{{ search }}"
          </div>
          <div v-if="error">erorr!! {{ error }}</div>
          <div v-if="fetching">Fetching Data!</div>

          <div
            class="col-4"
            v-for="album in filteredList"
            :key="album.artistId"
          >
            <figure class="figure">
              <img
                v-bind:src="album.artworkUrl100"
                class="figure-img img-fluid rounded"
                alt=""
              />
              <figcaption class="figure-caption">
                {{ album.collectionName }}
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import searchList from "../composition/search";

import { createComponent } from "@vue/composition-api";

import _ from "underscore";

const API_URL = "http://localhost:3000/searchArtist?artistName=:query";

export default createComponent({
  setup() {
    const { submitted, list, val, error, fetching } = searchList();
    return {
      val,
      list,
      submitted,
      error,
      fetching,
      artistList: [],
      artistName: "",
      search: "",
    };
  },
  methods: {
    async getAddresses(query) {
      const res = await fetch(API_URL.replace(":query", query));
      const suggestions = await res.json();
      this.artistList = suggestions;
    },
  },

  watch: {
    artistName: _.debounce(function (addr) {
      this.getAddresses(addr);
    }, 500),
  },
  computed: {
    filteredList() {
      return this.list.filter((post) => {
        return post.collectionName
          .toLowerCase()
          .includes(this.search.toLowerCase());
      });
    },
  },
});
</script>

 

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.searchNav {
  height: 100%;
  width: 33.8843vw;
  max-width: 250px;
  background-color: rgb(62 62 66 / 3%);
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 55px auto 1fr auto;
}
.form-control {
  height: 32px !important;
  font-size: 12px !important;
}
/* .results {
  width: 65.8843vw;
} */
.h-40 {
  height: 40px !important;
}
</style>
 
 <style >
.form-control {
  height: 32px !important;
  font-size: 12px !important;
}
.list-group-item {
  font-size: 12px !important;
}
.searchBtn {
  font-size: 14px !important;
}
.albums {
  display: flex;
  font-weight: bold;
}
.noartist {
  color: red;
  font-size: 14px;
}
</style>
