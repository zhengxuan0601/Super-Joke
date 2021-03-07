<template>
  <div
    v-loading="loading"
    element-loading-spinner="el-icon-magic-stick"
    class="weather_model loading_class">
    <div class="info">
      <p><em class="el-icon-map-location"></em>{{ weather.cityName }}</p>
      <p v-html="weatherHTML[weather.type]"></p>
      <p>{{ weather.type || '--' }}</p>
      <p>空气质量<i>{{ weather.quality || '--' }}</i></p>
      <p>{{ weather.wendu || '--' }}℃</p>
      <div class="notice">
        <div class="block">
          <p>{{ weather.notice || '--' }}!</p>
          <p>{{ weather.ganmao || '--' }}!</p>
          <p>{{ weather.low || '--' }}, {{ weather.high || '--' }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { queryWeatherByCityName } from '@/api/frontApi'
import weatherHTML from '@/lib/weatherHtml'
import initMap from '@/lib/initMap'
export default {
  data () {
    return {
      weather: {},
      weatherHTML,
      loading: true
    }
  },

  created () {
    initMap().then(BMap => {
      const CITY_POSITION = new BMap.LocalCity()
      CITY_POSITION.get(city => {
        this.queryWeatherByCityName(city.name)
      })
    })
  },

  methods: {
    queryWeatherByCityName (cityName) {
      queryWeatherByCityName(cityName).then(res => {
        this.weather = res.data || {}
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style scoped lang="less">
.weather_model {
  padding: 16px 15px 6px 15px;
  min-height: 78px;
  .info {
    display: flex;
    flex-wrap: wrap;
    p {
      letter-spacing: 2px;
      margin-right: 8px;
      display: flex;
      align-items: center;
      flex-shrink: 0;
      em {
        font-size: 16px;
        position: relative;
        top: 1px;
        margin-right: 6px;
      }
      i {
        color: #e23794;
        font-style: normal;
        margin-left: 2px;
      }
    }
    .notice {
      color: #d46a41;
      width: 100%;
      margin-top: 6px;
      height: 24px;
      overflow-y: hidden;
      line-height: 24px;
      & > div {
        animation: move 12s ease-out infinite;
        animation-delay: 1s;
      }
      p {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }
}

@keyframes move {
  0% {
    transform: translateY(0px);
  }
  20% {
    transform: translateY(0px);
  }
  40% {
    transform: translateY(-24px);
  }
  60% {
    transform: translateY(-24px);
  }
  80% {
    transform: translateY(-48px);
  }
  100% {
    transform: translateY(-48px);
  }
}
</style>
