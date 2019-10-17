<?php

include "conn.php";    
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