// ======================= 吸顶效果================================
window.onscroll = function() {
    // console.log(ord++);
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    // console.log(scrollTop);
    // console.log($("#head").offsetHeight);

    if (scrollTop >= 128) {
        $("nav").css({
            "position": "fixed",
            "top": "0px",
            "left": "0px",
            "z-index": 2000,

            // "class": "nav fixed"
        });
        $("nav").next().css({
            "margin-top": 76 + "px"
        });
        $(".logo").css({
            "display": "block"
        });
        $("#nav ul").css({
            "margin-left": "0px",
        });
        $("#nav ul li").css({
            "line-height": "76px",
            // "margin-right": "30px",
        });
        $("#nav dl dt").css({
            "line-height": "76px",
        });

        $("#nav dl dt").css({
            "margin-top": "25px"
        });

        //

        $(".back").css({
            "display": "block"
        });

        $(".normalBack").css({
            "display": "none"
        });
    } else {
        $("nav").css({
            // "class": "nav",
            "position": "static"

        });

        $("nav").next().css({
            "margin-top": 0
        });
        $(".logo").css({
            "display": "none"
        })
        $("#nav ul li").css({
            "line-height": "36px",
        });
        // $("#nav dl dt").css({
        //     "line-height": "36px",
        // });

        $("#nav dl dt").css({
            "margin-top": "10px"
        });

        //

        $(".back").css({
            "display": "none"
        });

        $(".normalBack").css({
            "display": "block"
        });
    }
};
// =========================back===================================

get(".back").onclick = function() {

    console.log(1)
    history.go(-1);
};
get(".normalBack").onclick = function() {

        console.log(1)
        history.go(-1);
    }
    // 事件委托:因为是后面添加进来的元素
get("nav").onclick = function(event) {
    let _this = event.target;
    if (_this.className === "back") {
        // console.log(1);
        history.go(-1);
    }
    if (_this.className === "normalBack") {
        // console.log(2);
        history.go(-1);
    }
};

function get(selector) {
    var result = document.querySelectorAll(selector);
    if (result.length === 1) {
        return result[0]; //
    }
    return result; //
};