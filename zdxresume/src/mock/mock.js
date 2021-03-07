const getmainClassifyList = () => {
  const data = [
    {
      'id': 1,
      'domainCode': '1',
      'domainName': '主题',
      'isShow': 1,
      'sort': 1,
      'lesseeCode': '12345',
      'isvalid': 1
    },
    {
      'id': 2,
      'domainCode': '2',
      'domainName': '行业',
      'isShow': 1,
      'sort': 2,
      'lesseeCode': '12345',
      'isvalid': 1
    },
    {
      'id': 3,
      'domainCode': '3',
      'domainName': '部门',
      'isShow': 1,
      'sort': 3,
      'lesseeCode': '12345',
      'isvalid': 1
    },
    {
      'id': 4,
      'domainCode': '4',
      'domainName': '区域',
      'isShow': 1,
      'sort': 4,
      'lesseeCode': '12345',
      'isvalid': 1
    }
  ]
  return {
    data: data,
    msg: 'success',
    success: true,
    code: '0'
  }
}

export {
  getmainClassifyList
}
