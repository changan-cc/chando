<?php
    header("content-type:context/html","charset=utf-8");

    //1.接受数据
    $username=$_GET['username'];
    // $userpwd=$_POST['userpwd'];

    //2.连接数据库
    //1)连接数据库
    $conn=mysqli_connect("localhost:3306","root","root","login");

    //2)执行sql语句
    $sql="select * from chando where username='$username'";
    $result=mysqli_query($conn,$sql);
    //3)关闭数据库
    mysqli_close($conn);

    //3.响应
    $rows=mysqli_num_rows($result);
    if($rows==1){
        echo 1;//用户名已被占用
    }else{
        echo 0;//用户名没有被占用
    }
?>