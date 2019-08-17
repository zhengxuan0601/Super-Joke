window.onload = function(){
    
    function createTable(){
        var tableObj = {
            el:"#con",
            theadCon:["姓名", "年龄", "性别", "地址", "公司", "职位"],
            colums:[
                {data:"name"},
                {data:"age"},
                {data:'sex'},
                {data:"addr"},
                {data:"company"},
                {data:"job"}
            ],
            data:[],
            action:{
                name:'操作',
                do:'<span class="edit">编辑</span><span class="del">删除</span>',
            }
        }
        var tableData = localStorage.getItem('tableData')
        if (tableData){
            tableData = JSON.parse(tableData)
            tableObj.data = tableData
        }
        new Table(tableObj)
    }
    createTable()

    

}