<?php
    //表示后端给前端响应的内容是html内容，字符集用utf-8;
    header("content-type:text/html;charset=utf-8");

    //1.接收前端传来的数据
    $usertel=$_POST['usertel'];
    // $userpwd=$_POST['userpwd'];
   // $password=$_POST['password'];

    //2.连接数据库进行保存
    //1.连接数据库
    $conn=mysqli_connect("localhost:3306","root","root","login");

    if(!$conn){
        die("不能连接");
    }else{
            //执行SQL语句
        //1)增加：
        $sql="select * from chando where usertel ='$usertel'";
//  password = '$userpwd'and 
        //2)执行sql语句
        $result=mysqli_query($conn,$sql);
        
        // 3）关闭数据库
        mysqli_close($conn);

        //3)查询
        $rows=mysqli_num_rows($result);
        // echo($rows);
        //3.响应
        if($rows===1){
            echo 1;
        }else{
            echo 0;
        }
    }
?>