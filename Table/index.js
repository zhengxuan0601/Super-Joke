window.onload = function () {
    var oData = [];
    function initTable () {
        var data = {
            id: 'table',  //表格所在区域
            index: true, // b表格是否有序号
            checkBox: true,
            thead: [  // 表头内容初始化
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
            dataList: oData,// 表格数据
            action: {
                title: '操作',
                doc: `<span class='edit'>编辑</span> <span class='del'>删除</span>`
            }
        }
        var table = new Table(data);
        table.init();
        del();
        edit()
    }
    initTable();
    setTimeout(() => {
        for (var i = 0; i < 10; i++) {
            oData.push({
                name: `zx${i}`,
                sex: '男',
                school: '浙江大学宁波理工学院',
                year: '2018-12-01',
                id: i
            })
        }
        initTable();
    }, 500)

    // 删除
    function del() {
        var del = document.querySelectorAll('tr td span.del');
        for (var i = 0; i < del.length; i++) {
            del[i].index = i;
            del[i].onclick = function () {
                oData.splice(this.index,1);
                initTable();
            }
        }
    }

    // 编辑
    function edit() {
        var edit = document.querySelectorAll('tr td span.edit');
        for (var i = 0; i < edit.length; i++) {
            edit[i].index = i;
            edit[i].onclick = function () {
                console.log(oData[this.index]);
                alert(JSON.stringify(oData[this.index]))
            }
        }
    }
}