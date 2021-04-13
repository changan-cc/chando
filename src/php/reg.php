<?php
    header("content-type:context/html","charset=utf-8");

    //1.接受数据
    $username=$_POST['username'];
    // echo $username;
    // username:为params中的username；
    // let params = `username=${$("#name").value}&userpwd=${$("#pwd").value}`;
    $usertel=$_POST['usertel'];
    $userpwd=$_POST['userpwd'];

    //2.连接数据库
    //1)连接数据库
    $conn=mysqli_connect("localhost:3306","root","root","login");

    //2)执行sql语句
    $sql="insert into chando values('$username','$usertel','$userpwd')";
    $result=mysqli_query($conn,$sql);

    //3)关闭数据库
    mysqli_close($conn);

    //3.响应
    // $rows=mysqli_num_rows($result);

    if($result){
        echo 1;//"注册成功 请  <a href='login.html'>登录</a>"
    }else{
        echo 0;//"注册失败"
    }
?>  