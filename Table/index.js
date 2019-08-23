window.onload = function() {
    var data = {
        id: 'table',
        thead: [
            {
                title: '姓名',
                name: 'name',
                width: '100',
            },
            {
                title: '性别',
                name: 'sex',
            },
            {
                title: '毕业学校',
                name: 'school',
            },
            {
                title: '毕业时间',
                name: 'year',
            }
        ],
        dataList: [
            {
                name: 'zxzxzx',
                sex: '男',
                school: '浙江大学宁波理工学院',
                year: '2018-06-01'
            },
            {
                name: 'qyc',
                sex: '男',
                school: '浙江大学宁波理工学院',
                year: '2018-12-01'
            }
        ]
    }

    var table = new Table(data);
    table.init();
}