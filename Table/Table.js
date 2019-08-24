/**
 * 
 * @param {*} oDiv table存放区域 
 * @param {*} theadList 头部表格标题[{title:'名称', width:'宽度', name:'数据名称'}]
 * @param {*} dataList 头部表格标题[]
 * @param {*} action 表格动作列表 {}
 * @param {*} index 表格序号列表 Boolean
 * @param {*} checkBox 表格选择框 Boolean
 */
function Table(dataTable) {
    this.oDiv = document.getElementById(dataTable.id);
    this.theadList = dataTable.thead;
    this.dataList = dataTable.dataList;
    this.table = '';
    this.action = dataTable.action;
    this.index = dataTable.index;
    this.checkBox = dataTable.checkBox;

    // 判断是否为数组
    this.isArr = function (object) {
        if (object.constructor === Array) {
            return true;
        } else {
            return false;
        }
    }
    // 初始化一个表格
    this.init = function () {
        this.oDiv.innerHTML = '';
        this.table = document.createElement('table');
        this.table.className = 'table';
        this.table.style.borderCollapse = 'collapse';
        // 创建thead
        var thead = document.createElement('thead');
        thead.innerHTML = this.createThead();
        this.table.appendChild(thead);
        this.createBody();
        this.oDiv.appendChild(this.table);
        this.checked();
    }
}

// 多选框节点创建
Table.prototype.createChexbox = function (classList) {
    var checkBox = `<input type='checkbox' class='${classList}'/>`;
    return checkBox;
}

// 多选框选中事件
Table.prototype.checked = function () {
    if (this.checkBox !== true) { return }
    // 单个checkbox事件
    var allInput = document.querySelectorAll('tr td input.checkSelect');
    for (var i = 0; i < allInput.length; i++) {
        allInput[i].onchange = () => {
            var allInputCheck = document.querySelectorAll('tr td input.checkSelect:checked');
            if (allInputCheck.length == this.dataList.length) {
                document.querySelector('tr th input.allCheck').checked = true;
                document.querySelector('tr th input.allCheck').classList = ['allCheck']
            } else if (allInputCheck.length != 0) {
                document.querySelector('tr th input.allCheck').checked = false;
                document.querySelector('tr th input.allCheck').classList = ['allCheck halfCheck'];
            } else {
                document.querySelector('tr th input.allCheck').checked = false;
                document.querySelector('tr th input.allCheck').classList = ['allCheck'];
            }
        }
    }

    // 多选事件
    var allCheck = document.querySelector('tr th input.allCheck');
    allCheck.onchange = function () {
        var state = this.checked;
        this.classList = ['allCheck'];
        for (var i = 0; i < allInput.length; i++) {
            allInput[i].checked = state;
        }
    }
}

// 创建表头内容
Table.prototype.createThead = function () {
    // 初始化表头内容
    var theadHtml = '';
    if (!this.isArr(this.theadList)) {
        throw new Error('The theadList that needs to be passed in is an array.');
    }
    for (var i = 0; i < this.theadList.length; i++) {
        theadHtml += `<th ${this.theadList[i]['width'] ? "width=" + this.theadList[i]['width'] + "" : ""}>${this.theadList[i]['title']}</th>`
    }
    // 是否传入序号
    if (this.index == true) {
        theadHtml = `<th width='50'>序号</th>${theadHtml}`
    }

    // 是否需要多选框
    if (this.checkBox == true) {
        theadHtml = `<th width='20'>${this.createChexbox('allCheck')}</th>${theadHtml}`
    }

    // 传入的参数是否有操作列表
    if (this.action) {
        if (this.action.width) {
            theadHtml = `${theadHtml}<th width='${this.action.width}'>${this.action['title']}</th>`
        } else {
            theadHtml = `${theadHtml}<th>${this.action['title']}</th>`
        }
    } 
    var thead = `<tr>${theadHtml}</tr>`;
    return thead;
}

// 创建tbody的主体内容
Table.prototype.createBody = function () {
    var tbodyHtml = '';
    if (!this.dataList) { return }  
    if (!this.isArr(this.dataList)) {
        throw new Error('The theadList that needs to be passed in is an array.');
    }
    for (var i = 0; i < this.dataList.length; i++) {
        var tdHtml = '';
        for (var j = 0; j < this.theadList.length; j++) {
            tdHtml += `<td title='${this.dataList[i][this.theadList[j].name]}'>${this.dataList[i][this.theadList[j].name]}</td>`
        }
        // 是否传入序号
        if (this.index == true) {
            tdHtml = `<td>${i + 1}</td>${tdHtml}`
        }

        // 是否需要多选框
        if (this.checkBox == true) {
            tdHtml = `<td>${this.createChexbox('checkSelect')}</td>${tdHtml}`
        }

        // 传入的参数是否有action
        if (this.action) {
            tbodyHtml += `<tr>${tdHtml}<td>${this.action['doc']}</td></tr>`
        } else {
            tbodyHtml += `<tr>${tdHtml}</tr>`
        }
    }
    // 创建tbody
    var tbody = document.createElement('tbody');
    tbody.innerHTML = tbodyHtml;
    this.table.appendChild(tbody);
}
