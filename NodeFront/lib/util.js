/**
 * 创建唯一标识id 从1递增
 * @param { Array } idList 已存在id集合
 * @return { Number }
 */
function createEquieId (idList = []) {
  if (!idList.length || idList[0] !== 1) {
    return 1
  }
  idList = idList.sort((x, y) => x - y)
  let initIdx = 0
  while (initIdx < idList.length) {
    if (idList[initIdx + 1] - idList[initIdx] > 1)
    return idList[initIdx] + 1
    initIdx++
  }
  return idList[idList.length - 1] + 1
}

export {
  createEquieId
}