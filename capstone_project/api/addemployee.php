<?php
    header('Content-Type: application/json');
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
    

class Emp {

    function login($json){
        include "connection.php";

        $json = json_decode($json, true);
        $username = $json["username"];
        $password = $json["password"];

        // Assuming your passwords are hashed using bcrypt
        $sql = "SELECT * FROM tbl_employees WHERE emp_uname = :username";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(":username", $username);
        $stmt->execute();
        
        $returnValue = 0;

        if ($stmt->rowCount() > 0) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            $hashedPasswordFromDB = $row['emp_pword'];

            if (password_verify($password, $hashedPasswordFromDB)) {
                $returnValue = $row;
            }
        }

        $stmt = null;
        $conn = null;

        return json_encode($returnValue);
    }
}

$json = isset($_POST['json']) ? $_POST['json'] : "";
$operation = isset($_POST['operation']) ? $_POST['operation'] : "";

$emp = new Emp();

switch($operation){
    case "login":
        echo $emp->login($json);
        break;
}
?>
