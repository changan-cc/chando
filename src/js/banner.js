function $(selector) {
    var result = document.querySelectorAll(selector);
    if (result.length === 1) {
        return result[0]
    }
    return result;
}

$(".banner-ul").style.marginLeft = "0px";
let n = 0;
let liList = $("#banner ul li");
let bodyWidth = document.body.clientWidth;
// console.log(bodyWidth);
// $("#banner ul li img").style.width = bodyWidth;
//左箭头：向右滑动一张图片的距离

//点右箭头：ul向左滑动一张图片的距离
//封装函数
function move(dir = "rig", count = 1, speed = 20) {
    if (dir = "rig") {
        let p1 = setInterval(() => {
            let ml = parseInt($(".banner-ul").style.marginLeft);
            if (ml <= -bodyWidth * n) {
                ml = -bodyWidth * n;
                clearInterval(p1);
                return;
            }
            $(".banner-ul").style.marginLeft = ml - speed * count + "px";
        }, 16)
    }
    if (dir = "lef") {
        let p2 = setInterval(() => {
            let ml = parseInt($(".banner-ul").style.marginLeft);
            if (ml >= -(bodyWidth * n)) {
                ml = -(bodyWidth * n);
                clearInterval(p2);
                return;
            }
            $(".banner-ul").style.marginLeft = ml + speed * count + "px";
        }, 16)
    }
    upDataDot();
}

//特殊情况:在最后一张
//克隆虚拟的第一张图片，插入到ul的最后，当进行滑动的时候，
//滑动到虚拟的第一张的瞬间，将marginleft设置为真实的第一张的marginleft
function next(speed = 20, count = 1) {
    let newLi = liList[0].cloneNode(true);
    $(".banner-ul").appendChild(newLi);
    let p3 = setInterval(() => {
        let ml = parseInt($(".banner-ul").style.marginLeft);
        if (ml < -bodyWidth * liList.length) {
            newLi.remove();
            $(".banner-ul").style.marginLeft = "0px";
            clearInterval(p3);
            return;
        }
        $(".banner-ul").style.marginLeft = ml - speed * count + "px";
    }, 16)
}
//特殊情况:在第一张
function prev(speed = 20, count = 1) {
    let newLi = liList[liList.length - 1].cloneNode(true);
    $(".banner-ul").insertBefore(newLi, liList[0]);
    // console.log(newLi)
    $(".banner-ul").style.marginLeft = -bodyWidth + "px"; //????因为插入之后页面的第一张图片变成了克隆的虚拟的第一张，
    //但是刚进入页面的时候不希望看到虚拟的最后一张，我们需要看到真实的第一张图片，所以需要先把他的marginLeft设置为-bodyWidthpx；
    //当进行切换的时候，再滑动到虚拟的最后一张的瞬间，将marginleft设置为真实的最后一张的marginleft;，
    let p4 = setInterval(() => {
        let ml = parseInt($(".banner-ul").style.marginLeft);
        if (ml >= 0) { //
            clearInterval(p4);
            $(".banner-ul").style.marginLeft = "0px"
            newLi.remove();
            $(".banner-ul").style.marginLeft = -bodyWidth * (liList.length - 1) + "px";
            return;
        }
        $(".banner-ul").style.marginLeft = ml + speed * count + "px";
    }, 16)
}


//绑定单击事件
$(".rig").onclick = function() {
    if (n !== liList.length - 1) {
        n++;
        move();
    } else {
        n = 0;
        next();
    }
    upDataDot();
}
$(".lef").onclick = function() {
        if (n === 0) {
            n = liList.length - 1;
            prev();
        } else {
            n--;
            move("lef");
        }
        upDataDot();
    }
    //自动播放：设置定时器，自动切换图片
    // let autoPlay = setInterval(function() {
    //     //绑定帮助用户去触发某个事件
    //     $(".rig").click()
    // }, 3000)



// //鼠标放上去的时候，停止自动播放
// $(".banner-ul").onmouseenter = function() {
//         //提前结束计时器的执行
//         clearInterval(autoPlay)
//     }
//     //当鼠标离开时候，再去继续自动播放
// $(".banner-ul").onmouseleave = function() {
//     //此时得去掉var变成全局变量，否则鼠标放上去的时候不能用局部变量
//     autoPlay = setInterval(function() {
//         //绑定帮助用户去触发某个事件
//         $(".rig").click()
//     }, 3000)
// }

//小圆点的跟随
let dotList = $(".dot ol li");
if (n === 0) {
    dotList[n].className = "focus";
}

function upDataDot() {
    dotList.forEach(item => {
        item.className = "";
    });
    dotList[n].className = "focus";
}
//小圆点的点击
//小圆点单击----获取当前我要点击的小圆点在第几个,和点击之前的小圆点在第几个
//进行比较大小，如果now>ago:相当于向右箭头；否则向左箭头；
for (let i = 0; i < dotList.length; i++) {
    $(".dot ol li")[i].setAttribute("index", i);
    $(".dot ol li")[i].onclick = function() {
        let ago = n; //以前的
        let now = Number(this.getAttribute("index"));
        n = now;
        if (now > ago) {
            move("rig", now - ago);
        }
        if (now < ago) {
            move("lef", ago - now);
        }
    }
};