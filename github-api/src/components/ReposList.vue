<template>
  <div class="reposList">
    <button class="reposButton" v-if="!starredReposIsActive" @click="updateRepos()">See private repositories</button>
    <button class="reposButton" v-if="starredReposIsActive" @click="updateRepos()">See public repositories</button>

    <div class="repos" v-if="!starredReposIsActive">
      <h3 class="reposTitle">Public repositories:</h3>
      <template class="currency" v-for="repos in publicRepos">
        <div :key="repos.name">
          <a target="_blank" :href="`https://github.com/${user}/${repos.name}`">
            <h4>{{ repos.name }}</h4>
          </a>
          <p class="technologies" :class="verifTechno(repos.language)">{{ repos.language }}</p>
          <p class="date">{{ formatDate(repos.created_at) }}</p>
          <br />
          <p class="description">{{ repos.description }}</p>
        </div>
      </template>
    </div>

    <div class="repos" v-if="starredReposIsActive">
      <h3 class="reposTitle">Favorite repositories:</h3>
      <template v-for="starred in starredRepos">
        <div :key="starred.name">
          <a target="_blank" :href="`https://github.com/${starred.full_name}`">
            <h4>{{ starred.name }}</h4>
          </a>
          <p class="technologies" target="_blank" :class="verifTechno(starred.language)">{{ starred.language }}</p>
          <p class="date">{{ formatDate(starred.created_at) }}</p>
          <br />
          <p class="description">{{ starred.description }}</p>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: "ReposList",
  data() {
    return {
      starredReposIsActive: null,
      technoColor: ""
    };
  },
  props: {
    user: {
      type: String,
      default: ""
    },
    publicRepos: {
      type: Array,
      default: () => []
    },
    starredRepos: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    updateRepos() {
      this.starredReposIsActive = !this.starredReposIsActive;
    },

    verifTechno(value) {
      if (value && value.length > 1) {
        switch (value) {
          case "JavaScript":
            return "burntYellow";
          case "TypeScript":
            return "typeScriptColor";
          case "React":
            return "coral";
          case "C++":
            return "DarkOrange";
          case "C#":
            return "CSharpColor";
          case "Ruby":
            return "DarkGoldenRod";
          case "Java":
            return "dimGrey";
          case "PHP":
            return "phpColor";
          case "HTML":
            return "htmlColor";
          case "Python":
            return "green";
          case "CSS":
            return "red";
          case "Shell":
            return "blue";
          case "Go":
            return "yellow";
          case "Vue":
            return "vueColor";
          default:
            return "black";
        }
      } else {
        return "notTechno";
      }
    },

    formatDate(date) {
        if (!date) return;
        return moment(date).format('MMMM Do YYYY');
    },
  }
};
</script>

<style scoped lang="scss">
.reposTitle {
  margin: 40px 0 20px 0;
}

.repos {
  text-align: left;
  width: 80vw;

  @media (max-width: 768px) {
    width: 90vw;
  }
}

.repos a,
p {
  display: inline-block;
}

.repos a {
  margin: 0 10px 0 0;
}

.repos h4 {
  margin: 0;
  font-size: 22px;

  @media (max-width: 768px) {
    font-size: 18px;
  }

  &:hover {
    opacity: 0.7;
  }
}

.reposButton {
  font-weight: 900;
  border: none;
  background-color: #0000ff;
  color: #ffffff;
  opacity: 0.7;
  margin-top: 25px;
  font-size: 16px;
  width: 250px;
  height: 45px;
  cursor: pointer;

  &:hover {
    opacity: 0.5;
  }
}

.description {
  margin: 5px 0 20px 0;
  font-size: 18px;

  @media (max-width: 768px) {
    font-size: 14px;
    width: 90%;
  }
}

.date {
  margin: 0;

  @media (max-width: 768px) {
    font-size: 12px;
  }
}

.technologies {
  margin: 0 10px 0 0;
  padding: 2px 12px;
  font-size: 10px;
  font-weight: 900;
  color: #ffffff;

  @media (max-width: 768px) {
    padding: 2px 8px;
    font-size: 9px;
  }
}

.blue {
  background-color: #0000ff;
}

.burntYellow {
  background-color: #e1ad01;
}

// Labels Colors
.red {
  background-color: #dc143c;
}

.black {
  background-color: #000;
}

.coral {
  background-color: #ff7f50;
}

.CSharpColor {
  background-color: #8467d6;
}

.DarkGoldenRod {
  background-color: #b8860b;
}

.DarkOrange {
  background-color: #ff8c00;
}

.yellow {
  background-color: #ffff00;
}

.dimGrey {
  background-color: #696969;
}

.green {
  background-color: #008000;
}

.orange {
  background-color: #ff8c00;
}

.htmlColor {
  background-color: #e75f35;
}

.phpColor {
  background-color: #5283a3;
}

.typeScriptColor {
  background-color: #715cc1;
}

.vueColor {
  background-color: #42b884;
}

.notTechno {
  margin: initial;
  padding: initial;
  font-size: initial;
  font-weight: initial;
  color: initial;
}
</style>
