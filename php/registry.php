<?php

include "conn.php";
//header('content-type:text/html;charset=utf-8');
//include 'conn.php';
//检测用户名：
//if(isset($_POST['username'])){
 //   $username=$_POST['username'];
    //通过查询方式来测试是否存在用户名。
 //   $result=$conn->query("select * from registrywoniu where username='$username'");
  //  if($result->fetch_assoc()){
 //       echo true;
 //   }else{
 //       echo false;
 //   }
//}
    
//前端用户点击了submit按钮。接收前端传入表单的值。
if(isset($_POST['submit'])){
    $name=$_POST['username'];
    echo $name;
    $pass=$_POST['password'];
    $number=$_POST['number'];
    //将获取的数据添加入数据库：
    $conn->query("insert registerwoniu values(null,'$name','$pass','$number')");
    echo 1;
    //php的跳转;
    header('http://10.31.155.60/h5-1909/woniushangcheng/src/html/login.html');
}