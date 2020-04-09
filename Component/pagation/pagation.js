/**
 * Author zhengx
 * date 2019-08-17
 */

/**
 * @ allList 总条数
 * @ pageNow 当前页码
 * @ pageNum 总页数
 */
function Pagation(id, pageInfo, callback) {
    this.oDiv = document.getElementById(id);
    this.callback = callback;
    this.pageInfo = pageInfo;
    this.init = function () {
        this.oDiv.innerHTML = '';
        this.createAllList();
        this.createPage();
        this.createJump();
        // 判断上一页和下一页是否可以点击
        this.isPandN();
        var liNum = document.getElementsByTagName('li');
        var _this = this
        // 页码自发定义跳转
        for (var i = 0; i < liNum.length; i++) {
            liNum[i].onclick = function (){
                if (this.classList.contains('number')) {
                    var pageNow = this.innerText * 1;
                    if (pageNow == _this.pageInfo.pageNow) { return }
                    _this.jump(pageNow);
                } else if (this.classList.contains('prev')) {
                    var pageNow = _this.pageInfo.pageNow - 5
                    if (pageNow < 1) {
                        pageNow = 1
                    }
                    _this.jump(pageNow);
                } else if (this.classList.contains('next')) {
                    var pageNow = _this.pageInfo.pageNow + 5
                    _this.jump(pageNow);
                }
                _this.callback(_this.pageInfo.pageNow);
            }
        }
        // 输入页码跳转
        window.onkeydown = function (e) {
            var e = e || event;
            if (e.keyCode == '13') {
                var pageNow = document.getElementsByClassName('jumpValue')[0].value * 1;
                if (pageNow == _this.pageInfo.pageNow) { return };
                if (pageNow && pageNow >=1 && pageNow < _this.pageInfo.pageNum) {
                    _this.jump(pageNow);
                } else if (pageNow > _this.pageInfo.pageNum) {
                    document.getElementsByClassName('jumpValue')[0].value = _this.pageInfo.pageNum;
                    pageNow =  _this.pageInfo.pageNum;
                    _this.jump(pageNow);
                } else if (pageNow < 1) {
                    document.getElementsByClassName('jumpValue')[0].value = 1;
                    pageNow =  1;
                    _this.jump(pageNow);
                }
                _this.callback(_this.pageInfo.pageNow); 
            }
        }
        // 上一页
        document.getElementsByClassName('prevpage')[0].onclick = function () {
            if (_this.pageInfo.pageNow > 1) {
                _this.pageInfo.pageNow --;
            } else { return }
            _this.jump(_this.pageInfo.pageNow);
            _this.callback(_this.pageInfo.pageNow);
        }
        // 下一页
        document.getElementsByClassName('nextpage')[0].onclick = function () {
            if (_this.pageInfo.pageNow < _this.pageInfo.pageNum) {
                _this.pageInfo.pageNow ++;
            } else { return }
            _this.jump(_this.pageInfo.pageNow);
            _this.callback(_this.pageInfo.pageNow);
        }
    }
    
    // 创建总条数
    this.createAllList = function () {
        var allList = document.createElement('p');
        var html = `
                总共<span class='totalNum'>${this.pageInfo.allList}</span>条`;
        allList.innerHTML = html;
        this.oDiv.appendChild(allList);
        // 创建上一页按钮
        var preB = document.createElement('button');
        preB.className = 'prevpage';
        preB.innerHTML = `<i class='font_family icon-prev'></i>`;
        this.oDiv.appendChild(preB);
    }

    // 创建页码
    this.createPage = function () {
        var page = document.createElement('ul');
        page.innerHTML = this.pageRender();
        // 创建下一页按钮
        var nextB = document.createElement('button');
        nextB.className = 'nextpage';
        nextB.innerHTML = `<i class='font_family icon-next'></i>`;
        this.oDiv.appendChild(page);
        this.oDiv.appendChild(nextB);
    }

    // 创建跳转页
    this.createJump = function () {
        var jump = document.createElement('div');
        jump.className = 'jump jumpPage';
        var html = `<span>前往</span> <input type="text" class='jumpValue' value='${this.pageInfo.pageNow}'> <span>页</span>`;
        jump.innerHTML = html;
        this.oDiv.appendChild(jump);
        // 创建总页码数
        var total = document.createElement('p');
        var totalHtml = `总共<span class='totalPage'>${this.pageInfo.pageNum}</span>页`;
        total.innerHTML = totalHtml;
        this.oDiv.appendChild(total);
    }

    // 判断上一页和下一页是否可以点击
    this.isPandN = function () {
        if (this.pageInfo.pageNow == 1) {
            document.getElementsByClassName('prevpage')[0].classList = 'prevpage disabled'
        } else {
            document.getElementsByClassName('prevpage')[0].classList = 'prevpage'
        }

        if (this.pageInfo.pageNow == this.pageInfo.pageNum) {
            document.getElementsByClassName('nextpage')[0].classList = 'nextpage disabled'
        } else {
            document.getElementsByClassName('nextpage')[0].classList = 'nextpage'
        }

    }

    // 跳转的方法
    this.jump = function (pageNow) {
        this.pageInfo.pageNow = pageNow;
        this.init();
    }

    // 页码在不同情况下展示
    this.pageRender = function () {
        var html = ''
        // 当页码小于10页时
        if (this.pageInfo.pageNum < 10) {
            for (var i = 1; i <= this.pageInfo.pageNum; i++) {
                if (i == this.pageInfo.pageNow) {
                    html += `<li class='number active'>${i}</li>`;
                } else {
                    html += `<li class='number'>${i}</li>`;
                }
            }
        } else {
            if (this.pageInfo.pageNow < 5) {
                for (var i = 1; i <= 6; i++ ) {
                    if (i == this.pageInfo.pageNow) {
                        html += `<li class='number active'>${i}</li>`;
                    } else {
                        html += `<li class='number'>${i}</li>`;
                    }
                }
                html = `${html}<li class='more next'>···</li><li class='number'>${this.pageInfo.pageNum}</li>`
            } else if (this.pageInfo.pageNow >= 5 && this.pageInfo.pageNow <= (this.pageInfo.pageNum - 5)) {
                for (var i = this.pageInfo.pageNow - 2; i <= this.pageInfo.pageNow + 2; i++ ) {
                    if (i == this.pageInfo.pageNow) {
                        html += `<li class='number active'>${i}</li>`;
                    } else {
                        html += `<li class='number'>${i}</li>`;
                    }
                }
                html =`<li class='number'>${1}</li><li class='more prev'>···</li>
                        ${html}
                        <li class='more next'>···</li><li class='number'>${this.pageInfo.pageNum}</li>`;
            } else {
                for (var i = this.pageInfo.pageNum - 5; i <= this.pageInfo.pageNum; i++) {
                    if (i == this.pageInfo.pageNow) {
                        html += `<li class='number active'>${i}</li>`;
                    } else {
                        html += `<li class='number'>${i}</li>`;
                    }
                }
                html = `<li class='number'>${1}</li><li class='more prev'>···</li>${html}`;
            }
        }
        return html;
    }
}
