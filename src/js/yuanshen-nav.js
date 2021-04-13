function get(selector) {
    var result = document.querySelectorAll(selector);
    if (result.length === 1) {
        return result[0]
    }
    return result;
}



// 导航栏粘性定位
// 封装一个scrollTop兼容性函数
// function getScrollTop() {
//     return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
// }

// 给页面注册滚动事件
window.onscroll = function() {
    // 判断广告栏header 与 滚动的scrollTop的值
    // 当scrollTop > header高度的时候 让导航栏 nav 固定定位
    // let scrollTop = getScrollTop();
    let scrollTop = Math.floor(document.documentElement.scrollTop)
        // console.log(scrollTop);
    if (scrollTop >= get("header").offsetHeight) {
        // 样式中有的类名这里一定不要忘了加上去，否则就会被替换掉
        get("nav").className = "nav fixed";
        // 一旦标题栏设置了固定定位之后，就脱离标准流了，下面的内容就会顶上来，
        // 所以要手动给下面的内容添加一个margin-top，将导航栏的位置留下来
        get("nav").nextElementSibling.style.marginTop = get("nav").offsetHeight + "px";
        get(".logo").style.display = "block";

        get("#nav ul li").forEach(item => {
            item.style.lineHeight = "76px";
        });
        get("#nav dl dt").forEach(item => {
            item.style.lineHeight = "76px";
        });

        //  back
        get(".back").style.display = "block";
        get(".normalBack").style.display = "none";

    } else {
        // 当scrollTop < header高度的时候 让导航栏 nav 恢复到原来的位置
        // nav 取消固定定位，恢复到原来的位置，所以下面内容的margin-top也要去掉
        get("nav").className = "nav"; // 去掉固定定位的样式，保留之前的样式
        get("nav").nextElementSibling.style.marginTop = 0;
        // get("nav").css({
        //     "margin-top": 0
        // });
        get(".logo").style.display = "none";

        get("#nav ul li").forEach(item => {
            item.style.lineHeight = "36px";
        });
        get("#nav dl dt").forEach(item => {
            item.style.lineHeight = "36px";
        });


        // if ()
        //  back
        get(".back").style.display = "none";
        get(".normalBack").style.display = "block";
    }
};
//back
get(".back").onclick = function() {
    history(-1);
}
get(".normalBack").onclick = function() {
    history(-1);
}