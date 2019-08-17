/*!
 * Table.js
 * 2019-06-07
 * Author ZhengXuan
 */

 !function (global,factory){
    //  模块化环境判断
    if (typeof exports === 'object' && typeof module !== 'undefined'){
        module.exports = factory();  //CommandJs暴露
    }else{
        if (typeof define === 'function' && define.amd){
            define(fastory);  // AMD && CMD
        }else{
            global.Table = factory();  // 浏览器端
        }
    }

 }(this,function (){ 'use strict'  //严格模式

    function isArr (objType){
        return objType.constructor === Array;
    }

    function isObject (objType){
        return typeof objType === 'object' && objType !== null;
    }

     return function (obj){
        //  判断传入参数的类型，否则报错
        if (isArr(obj) || !isObject(obj)){
            throw new Error('The type of the passed argument should be an Object')
        }

        var el = obj.el
            ,theadCon = obj.theadCon
            ,colums = obj.colums
            ,data = obj.data,
            action = obj.action;

        var tableParentNode = document.querySelector(el)
        
        var addButton = document.createElement('button')
        addButton.className = 'btn_add'
        addButton.innerText = '添加'

        tableParentNode.appendChild(addButton)

        var table = document.createElement('table')
        table.setAttribute('id','myTable')
        table.setAttribute('class','myTable')
        table.setAttribute('class','myTable')
        tableParentNode.appendChild(table)
        table.style.width = '100%'
        // 创建表头
        function createTableThead (){
            var thead = document.createElement('thead')
            table.appendChild(thead)
            var theadTr = document.createElement('tr')
            thead.appendChild(theadTr)
            for (var i = 0;i < theadCon.length;i++){
                var th = document.createElement('th')
                var thText = document.createTextNode(theadCon[i])
                th.appendChild(thText)
                theadTr.appendChild(th)
            }
            if (action){
                var th = document.createElement('th')
                var thText = document.createTextNode(action.name)
                th.appendChild(thText)
                theadTr.appendChild(th)
            }
        }
        createTableThead()

        // 创建表格主题
        function createTableTbody (){
            var tbody = document.createElement('tbody')
            table.appendChild(tbody)
            
            function createData(){
                if (data){
                    for(var i = 0;i < data.length;i++){
                        var tbodyTr = document.createElement('tr')
                        tbody.appendChild(tbodyTr)
                        for(var j = 0;j < colums.length; j++){
                            var td = document.createElement('td')
                            var text = data[i][(colums[j].data)]
                            var _data = colums[j].data
                            td.setAttribute('title',text)
                            td.setAttribute('data-set',_data)
                            var tdText = document.createTextNode(text)
                            td.appendChild(tdText)
                            tbodyTr.appendChild(td)
                        }
                        if (action){
                            var td = document.createElement('td')
                            var str = action.do
                            td.innerHTML = str
                            tbodyTr.appendChild(td)
                        }
                    }
                }
            }
            createData()

            // 添加y一行的方法
            !function addCloum (){
                addButton.onclick = function (){
                    var str = ''
                    var tr = document.createElement('tr')
                    for(var i = 0;i < colums.length;i++){
                        var td = document.createElement('td')
                        td.innerHTML = '<input type="text" name='+ colums[i].data + '>'
                        tr.appendChild(td)
                    }
                    tbody.appendChild(tr)
                    // 添加确定取消按钮
                    var td = document.createElement('td')
                    td.innerHTML = '<span class="sure">确认</span><span class="reset">取消</span>'
                    tr.appendChild(td)
                    reset ()
                    sureAdd ()
                }
            }()

            // 取消的方法
            function reset (){
                var reset = document.querySelectorAll('tr td span.reset')
                for(var i = 0;i < reset.length;i++){
                    reset[i].onclick = function (){
                        var table = this.parentNode.parentNode.parentNode
                        var tr = this.parentNode.parentNode
                        table.removeChild(tr)
                    }
                }
            }

            function getData(data){
                var tableData = localStorage.getItem('tableData')
                if (tableData){
                    tableData = JSON.parse(tableData)
                    tableData.push(data)
                    tableData = JSON.stringify(tableData)
                    localStorage.setItem('tableData',tableData)
                }else{
                    var aTable = new Array()
                    aTable.push(data)
                    aTable = JSON.stringify(aTable)
                    localStorage.setItem('tableData',aTable)
                }
            }


            // 确认添加的方法
            function sureAdd (){
                var sureAdd = document.querySelectorAll('tr td span.sure')
                for (var i = 0;i <sureAdd.length;i++){
                    sureAdd[i].onclick = function (){
                        var childInput, tdObj = new Object()
                        var tr = this.parentNode.parentNode
                        var td = tr.children
                        var tbody = tr.parentNode
                        for (var j = 0;j < td.length-1;j++){
                            if (td[j].hasChildNodes('input[type=text]')){
                                childInput = td[j].childNodes[0]
                                tdObj[childInput.name] = childInput.value
                            }
                        }
                        tbody.removeChild(tr)
                        getData(tdObj)
                    }
                }
                
            }
        }
        createTableTbody()
     } 
 })