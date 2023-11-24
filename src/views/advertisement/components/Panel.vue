
<template>
  <div class="content" :style="{ background: colors }">
    <div class="title">{{ title }}</div>
    <div class="totality">{{ totality }}</div>
    <div class="card-time">
      <div class="card-left">
        <div class="card-panel-text">{{ today_text }}</div>
        <div class="card-panel-num">{{ today }}</div>
      </div>
      <div class="card-right">
        <div class="card-panel-text">{{ yesterday_text }}</div>
        <div class="card-panel-num">{{ yesterday }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: '',
  props: {
    title: {
      type: String,
      default: false
    },
    totality: {
      type: Number,
      default: false
    },
    today_text: {
      type: String,
      default: false
    },
    today: {
      type: Number,
      default: false
    },
    yesterday_text: {
      type: String,
      default: false
    },
    yesterday: {
      type: Number,
      default: false
    },
    colors: {
      type: String,
      default: false
    }
  }
}

</script>

<style lang="scss" scoped>
.content {
  font-size: 16px;
  color: #fff;
  padding: 18px 30px;
  background: #bc8ef7;
  border-radius: 10px;

  .totality {
    font-size: 24px;
    font-weight: bold;
    margin-top: 8px;
  }

  .card-time {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;

    .card-panel-text {
      margin-bottom: 8px;
    }

    .card-panel-text,.card-panel-num{
      font-size: 16px;
    }
  }
}
</style>
