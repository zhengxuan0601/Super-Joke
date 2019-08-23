/**
 * 
 * @param {*} oDiv table存放区域 
 * @param {*} theadList 头部表格标题[{title:'名称', width:'宽度', name:'数据名称'}]
 * @param {*} dataList 头部表格标题[{}]
 */
function Table(dataTable) {
    this.oDiv = document.getElementById(dataTable.id);
    this.theadList = dataTable.thead;
    this.dataList = dataTable.dataList;
    // 初始化一个表格
    this.init = function () {
        var table = document.createElement('table');
        table.className = 'table';
        table.style.borderCollapse = 'collapse';
        // 创建thead
        var thead = document.createElement('thead');
        thead.innerHTML = this.createThead();
        table.appendChild(thead);
        // 创建tbody
        var tbody = document.createElement('tbody');
        tbody.innerHTML = this.createBody();
        table.appendChild(tbody);
        this.oDiv.appendChild(table);
    }

    // 创建表头内容
    this.createThead = function () {
        // 初始化表头内容
        var theadHtml = '';
        for (var i = 0; i < this.theadList.length; i++) {
            theadHtml += `<th ${this.theadList[i]['width'] ? "width=" + this.theadList[i]['width'] + "" : ""}>${this.theadList[i]['title']}</th>`
        }
        var thead = `<tr>${theadHtml}</tr>`;
        return thead;
    }

    // 创建tbody的主体内容
    this.createBody = function () {
        var tbodyHtml = '';
        for (var i = 0; i < this.dataList.length; i++) {
            var tdHtml = '';
            for (var j = 0; j < this.theadList.length; j++) {
                tdHtml += `<td title='${this.dataList[i][this.theadList[j].name]}'>${this.dataList[i][this.theadList[j].name]}</td>`
            }
            tbodyHtml += `<tr>${tdHtml}</tr>`
        }
        return tbodyHtml;
    }
}
