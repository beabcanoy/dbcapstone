<?php
    header('Content-Type: application/json');
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
    

class Admin{

    function login($json){
        include "connection.php";

        $json = json_decode($json, true);
        $username = $json["username"];
        $password = $json["password"];

        $sql = "SELECT * FROM tbl_admin ";
        $sql .= "WHERE admin_uname = :username AND admin_pword = :password";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(":username", $username);
        $stmt->bindParam(":password", $password);
        $stmt->execute();
        
        $returnValue = 0;
        if($stmt->rowCount() > 0){
            $returnValue = $stmt->fetch(PDO::FETCH_ASSOC);
            
        }

        $stmt = null;
        $conn = null;

        return json_encode($returnValue);
    }
}

$json = isset($_POST['json']) ? $_POST['json'] : "";
$operation = $_POST['operation'];

$admin = new Admin();
switch($operation){
    case "login":
        echo $admin->login($json);
        break;
}

?>