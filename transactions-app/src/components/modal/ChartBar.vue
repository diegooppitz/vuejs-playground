<template>
  <div class="chart-bar">
    <div class="cb__content" :class="formatStatus()"></div>

    <div class="cb__texts">
      <p>Solicitada</p>
      <p>Processando</p>
      <p>Concluída</p>
    </div>
  </div>
</template>

<script>
// libs
import { computed } from "vue";
import { useStore } from "vuex";
import { checkStatus } from "@/helpers/checkStatus";

export default {
  name: "ChartBar",
  setup() {
    const store = useStore();
    const modalData = computed(() => store.state.modalData);

    return { modalData };
  },
  methods: {
    // call the checkStatus helper and return a chartBar class
    formatStatus() {
      const status = this.modalData?.status;
      const isChartBar = true;

      return checkStatus(status, isChartBar);
    },
  },
};
</script>

<style lang="scss" scoped>
.chart-bar {
  width: 70%;
  margin: 0 auto 20px auto;

  @media screen and (max-width: 768px) {
    width: 90%;
    margin-bottom: 10px;
  }

  .cb__content {
    height: 30px;
    background-color: #ccc;
    position: relative;

    &.twenty-five {
      width: 25%;
    }

    &.half {
      width: 50%;
    }

    &.full {
      width: 100%;
    }
  }

  .cb__texts {
    display: flex;
    justify-content: space-between;

    p {
      @media screen and (max-width: 768px) {
        font-size: 13px;
      }
    }
  }
}
</style>
