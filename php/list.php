<?php
    include "conn.php";
    $result=$conn->query("select * from list");
    $listdata=array();
    for($i=0;$i<$result->num_rows;$i++){
        $listdata[$i]=$result->fetch_assoc();
    }

    echo json_encode($listdata);    