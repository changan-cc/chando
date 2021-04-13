// 验证码
function code() {
    //存放数据
    var codes = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g",
        "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
        "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
    ];
    var result = [];
    for (var i = 0; i < 4; i++) {
        result.push(codes[parseInt(Math.random() * codes.length)])

    }
    $(".picCodeImg").html(result.join("")); //将数组转换为字符串-----join("分隔符")----不写默认为逗号,
    return (result.join("")); //字符串：1en5
    // console.log(result);//result；数组：1，e，n，5
}