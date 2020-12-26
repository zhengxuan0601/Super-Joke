<template>
  <div>
    <BreadCrumb :breadcrumb="breadcrumb"/>
  </div>
</template>

<script>
export default {
  data () {
    return {
      breadcrumb: ['首页', '记录']
    }
  }
}
</script>

<style>

</style>
