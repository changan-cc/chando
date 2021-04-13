function $(selector) {
    var result = document.querySelectorAll(selector);
    if (result.length === 1) {
        return result[0]
    }
    return result;
}

function bindEvent(nodeList, eventType, fn) {
    for (var i = 0; i < nodeList.length; i++) {
        nodeList[i][eventType] = fn
    }
}

function getRandomColor() {
    var arr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
    var result = "#";
    for (var i = 0; i < 6; i++) {
        var index = Math.floor(Math.random() * 16)
        result = result + arr[index];
    }
    return result;
}

Array.prototype.has = function(query) {
    let isHas = false;
    // 指向 实例对象 : 数组
    this.forEach(item => {
        if (item === query) {
            isHas = true;
        }
    })
    return isHas;
}

NodeList.prototype.bind = function(eventType, fn) {
    if (typeof eventType === "function" && fn === undefined) {
        fn = eventType;
        eventType = "onclick";
    }
    this.forEach(item => {
        item[eventType] = fn;
    })
    return this;
}

HTMLCollection.prototype.bind = function(eventType, fn) {
    if (typeof eventType === "function" && fn === undefined) {
        fn = eventType;
        eventType = "onclick";
    }
    for (let i = 0; i < this.length; i++) {
        this[i][eventType] = fn;
    }
    return this;
}

// 相当于为所有元素节点扩展方法
HTMLElement.prototype.fadeOut = function(speed = 0.05, callback) {
    if (speed === "slow") { speed = 0.02 };
    if (speed === "fast") { speed = 0.08 };
    if (typeof speed === "function") {
        callback = speed;
        speed = 0.05;
    }
    this.style.opacity = 1;
    let fadeOut = setInterval(() => {
        let o = parseFloat(this.style.opacity);
        if (o <= 0) {
            this.style.opacity = 0;
            this.style.display = "none";
            clearInterval(fadeOut)
            callback && typeof callback === "function" ? callback() : ""
            return;
        }
        this.style.opacity = o - speed;
    }, 16)
}
HTMLElement.prototype.fadeIn = function(speed = 0.05, callback) {
    if (speed === "slow") { speed = 0.02 };
    if (speed === "fast") { speed = 0.08 };
    if (typeof speed === "function") {
        callback = speed;
        speed = 0.05;
    }
    this.style.opacity = 0;
    this.style.display = "block";
    let fadeOut = setInterval(() => {
        let o = parseFloat(this.style.opacity);
        if (o >= 1) {
            this.style.opacity = 1;
            clearInterval(fadeOut)
            callback && typeof callback === "function" ? callback() : ""
            return;
        }
        this.style.opacity = o + speed;
    }, 16)
}




function ajax(method, url, params, callback, isAsync) {

    //参数
    //method:请求方式
    //url:请求地址
    //params:请求参数
    //callback:回调函数
    //isAsync:同步/异步


    let xhr = new XMLHttpRequest();

    //如果是get请求，则xhr.open("get", "checkuser.php?username=" + $("#name").value, true);
    //如果是post请求，则 xhr.open("post", "regSaveByAjax.php", true);
    //区别：url

    let urlParams = url;
    if (method.toLowerCase() == "get") {
        urlParams += "?" + params;
    }
    xhr.open(method, urlParams, isAysnc); //设置请求参数；

    //回调函数
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            callback(xhr.responseText);
        }
    }

    //发送请求
    //如果是get请求，则xhr.send();
    // 如果是post请求，则 xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");// xhr.send(params);

    if (method.toLowerCase() == "get") {
        xhr.send();
    } else if (method.toLowerCase == "post") {
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(params);
    }
}



// 封装ajax
// 功能：前后端交互
// 参数：
// 请求方式:method
// 请求地址:url
// 是否异步:isAsync
// 请求参数（浏览器端发给服务器端的数据）:params
// 回调函数:callback
// 返回值：无

// let cb = function(str){
//     document.getElementById("msg").innerHTML = str;
// }
// ajax2013("get","regSave.php","username=jzm&userpass=123",cb, true);

function ajax2013(method, url, params, callback, isAsync) {

    let xhr = new XMLHttpRequest();

    let urlAndParms = url; //regSave.php
    if (method.toLowerCase() == "get") {
        urlAndParms += "?" + params; //regSave.php?username=jzm&userpass=123
    }

    xhr.open(method, urlAndParms, isAsync);

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            callback(xhr.responseText);
        }
    }

    if (method.toLowerCase() == "get") {
        xhr.send();
    } else { //post
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xhr.send(params);
    }

}


// ajax2013useobj({
//     url:"regSave.php",
//     params:"username=jzm&userpass=123",
//     callback:function(str){}
// })


function ajax2013useobj(obj) {
    // 默认值：
    let defaultObj = {
        method: "get",
        url: "#",
        params: "",
        isAsync: true,
        callback: null
    };

    for (let key in defaultObj) {
        if (!obj[key]) {
            obj[key] = defaultObj[key];
        }
    }

    let xhr = new XMLHttpRequest();

    let urlAndParms = obj.url; //regSave.php
    if (obj.method.toLowerCase() == "get") {
        urlAndParms += "?" + obj.params; //regSave.php?username=jzm&userpass=123
    }

    xhr.open(obj.method, urlAndParms, obj.isAsync);

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            obj.callback(xhr.responseText);
        }
    }

    if (obj.method.toLowerCase() == "get") {
        xhr.send();
    } else { //post
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xhr.send(obj.params);
    }

}







function ajax2013useobjandpromise(obj) {
    // 默认值：
    let defaultObj = {
        method: "get",
        url: "#",
        params: "",
        isAsync: true,
        //不用再写回调函数；callback

    };
    for (let key in defaultObj) {
        if (!obj[key]) {
            obj[key] = defaultObj[key];
        }
    }
    let xhr = new XMLHttpRequest();
    let urlAndParms = obj.url; //regSave.php
    if (obj.method.toLowerCase() == "get") {
        urlAndParms += "?" + obj.params; //regSave.php?username=jzm&userpass=123
    }
    xhr.open(obj.method, urlAndParms, obj.isAsync);

    let p = new Promise(function(resolve, reject) { //异步
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    resolve(xhr.responseText);
                } else {
                    reject("服务器错了");
                }
            }
        }
    });
    if (obj.method.toLowerCase() == "get") {
        xhr.send();
    } else { //post
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xhr.send(obj.params);
    }

    return p;
}