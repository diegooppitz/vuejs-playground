<template>
  <div class="user">
    <div class="user-child">
      <div class="user-content">
        Username:
        <h3>
          <a target="_blank" :href="`https://github.com/${login}`">{{ login }}</a>
        </h3>
      </div>
      <div class="user-content">
        Id:
        <h4>{{ userId }}</h4>
      </div>
      <div class="user-content">
        <h4 class="company" v-show="company != null">{{ company }}</h4>
      </div>
    </div>
    <img :src="avatar" />
  </div>
</template>

<script>
export default {
  name: "User",
  props: {
    login: {
      type: String,
      default: ""
    },
    avatar: {
      type: String,
      default: ""
    },
    company: {
      type: String,
      default: ""
    },
    userId: {
      type: Number,
      default: null
    }
  }
};
</script>

<style scoped lang="scss">
.user-content {
  display: inline-block;

  @media (max-width: 767px) {
    display: block;
  }
}

.user-child {
  @media (max-width: 767px) {
    margin: 15px 0;
  }
}

.user h3,
h4 {
  display: inline-block;

  @media (max-width: 767px) {
    margin: 12px 0;
  }
}

.user h3 {
  margin-right: 35px;

  @media (max-width: 767px) {
    margin: 12px 0;
  }

  &:hover {
    opacity: 0.5;
  }
}

.company {
  margin-left: 40px;

  @media (max-width: 767px) {
    margin-left: initial;
  }
}

img {
  width: 300px;
  height: 300px;
  border-radius: 10px;
}
</style>
