import Mock from 'mockjs'
import { getmainClassifyList } from './mock'

Mock.setup({
  timeout: 100
})

Mock.mock(/\/dataCatalog\/web\/mainClassify\/list/, getmainClassifyList)

export default Mock
