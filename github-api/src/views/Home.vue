<template>
  <div class="github-api">
    <h1>Github API</h1>
    <p class="searchText">Search Github Users</p>
    <input
      placeholder="Write a Github username"
      type="text"
      v-model="username"
      @keypress.enter="getRepos()"
    />
    <button class="searchButton" @click="getRepos()">Search</button>

    <pulse-loader v-show="loading"></pulse-loader>
    <template v-if="!loading && valid && verif">
      <user :login="login" v-model="username" :avatar="avatar" :userId="id" :company="company"></user>
      <repos-list
        :user="username"
        :publicRepos="publicRepos"
        :starredRepos="starredRepos"
      >
      </repos-list>
    </template>
    <div v-show="!valid" class="msgError">{{ msgError }}</div>
  </div>
</template>

<script>
import PulseLoader from "@/components/PulseLoader";

import { getUser, getPublicRepos, getStarredRepos } from '@/services/'

import User from "@/components/User";
import ReposList from "@/components/ReposList";

export default {
  name: "GithubApi",
  components: {
    PulseLoader,
    User,
    ReposList
  },
  data() {
    return {
      info: "",
      username: "",
      publicRepos: {},
      starredRepos: {},
      login: "",
      id: "",
      avatar: "",
      loading: false,
      valid: true,
      verif: false,
      msgError: "",
      colaborators: ""
    };
  },
  methods: {
    getRepos() {
      this.loading = true;
      this.valid = true;
      this.verif = true;
      this.msgError = "";

      getUser(this.username).then((res) =>  {
        const data = res?.data
        if (!data) return;

        // User
        this.login = data?.login;
        this.id = data?.id;
        this.avatar = data?.avatar_url;
        this.company = data?.company;
      });

      getPublicRepos(this.username).then((res) =>  {
        const data = res?.data
        if (!data) return;

        this.publicRepos = data;
      });

      getStarredRepos(this.username).then((res) => {
        const data = res?.data
        if (!data) return;

        this.starredRepos = data;
      })
      .catch(error => {
        this.valid = false;
        if (error.response.status == 404) {
          return (this.msgError = "This username not found");
        } else if (error.response.status == 403) {
          return (this.msgError =
            "You have reached the limit of requests for the Github API");
        }
      })
      .finally(() => (this.loading = false));
    },
  }
};
</script>

<style scoped lang="scss">
// Geral
.github-api {
  position: absolute;
  text-align: center;
  transform: translate(-50%, 0);
  left: 50%;
  top: 10%;
  margin-bottom: 10%;
}

// Search
h1 {
  margin-bottom: 5px;
}

.searchText {
  margin-bottom: 40px;
}

input {
  width: 260px;
  height: 40px;
  font-size: 16px;
  padding-left: 15px;
  outline: none;
  border: solid 1px #ccc;
}

.msgError {
  font-size: 24px;
  position: relative;
  top: 40px;
}

// Search Button
input,
.searchButton {
  display: inline-block;
  border-radius: 2px;
}

.searchButton {
  font-weight: 900;
  border: none;
  background-color: #0000ff;
  color: #ffffff;
  opacity: 0.7;
  width: 130px;
  height: 45px;
  font-size: 16px;
  padding-top: 2px;
  cursor: pointer;

  @media (max-width: 768px) {
    margin-top: 20px;
    width: 200px;
  }

  &:hover {
    opacity: 0.5;
  }
}
</style>
