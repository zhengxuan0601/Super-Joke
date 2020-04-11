<template>
  <view>
    <view class="page-body">
      <view class="page-section page-section-gap"><map ref="map" style="width: 100%; height: 100vh;" :latitude="latitude" :longitude="longitude" :markers="covers"></map></view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      latitude: 39.909,
      longitude: 116.39742,
      covers: [
        {
          latitude: 39.909,
          longitude: 116.39742,
          iconPath: '../../../static/location.png'
        },
        {
          latitude: 39.9,
          longitude: 116.39,
          iconPath: '../../../static/location.png'
        }
      ]
    };
  },
  onLoad() {
  },
  onReady() {},
  methods: {
  }
};
</script>

<style></style>
