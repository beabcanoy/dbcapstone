<?php
    header('Content-Type: application/json');
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");

class Employee{

    function addEmployee()
    {
        include "connection.php";

        $empFName = $_POST["emp_fName"];
        $empLName = $_POST["emp_lName"];
        $empUname = $_POST["emp_uname"];
        $empPword = $_POST["emp_password"];
        $hashedPassword = password_hash($empPword, PASSWORD_DEFAULT);

        $role = "Employee";

        $uploadDir = "profile_uploads/";
        $uploadFile = $uploadDir . basename($_FILES['emp_image']['name']);

        $sqlCheckUsername = "SELECT emp_uname FROM tbl_employees WHERE emp_uname = :empUname";
        $stmtCheckUsername = $conn->prepare($sqlCheckUsername);
        $stmtCheckUsername->bindParam(":empUname", $empUname);
        $stmtCheckUsername->execute();

        if ($stmtCheckUsername->rowCount() > 0) {
            return json_encode(array("status" => 1, "message" => "Username already taken"));
        } else {
            if (move_uploaded_file($_FILES['emp_image']['tmp_name'], $uploadFile)) {
                $sqlInsertEmployee = "INSERT INTO tbl_employees(emp_fname, emp_lname, emp_img, emp_uname, emp_pword, usr_role, emp_date_registered) ";
                $sqlInsertEmployee .= "VALUES(:empFName, :empLName, :emp_img, :empUname, :empPword, :role, CURRENT_DATE())";

                $stmtInsertEmployee = $conn->prepare($sqlInsertEmployee);
                $stmtInsertEmployee->bindParam(":empFName", $empFName);
                $stmtInsertEmployee->bindParam(":empLName", $empLName);
                $stmtInsertEmployee->bindParam(":emp_img", $uploadFile);
                $stmtInsertEmployee->bindParam(":empUname", $empUname);
                $stmtInsertEmployee->bindParam(":empPword", $hashedPassword);
                $stmtInsertEmployee->bindParam(":role", $role);

                $stmtInsertEmployee->execute();

                if ($stmtInsertEmployee->rowCount() > 0) {
                    return json_encode(array("status" => 1, "message" => "Employee registration successful."));
                } else {
                    return json_encode(array("status" => 0, "message" => "Employee registration failed."));
                }
            }
        }
    }

        function getEmployee() {
            include "connection.php";

            $sql = "SELECT * FROM tbl_employees ";
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $conn = null; $stmt=null;
            //var_dump($result);
            return json_encode($result);
        }

        function login($json){
            include "connection.php";

            $json = json_decode($json, true);
            $username = $json["username"];
            $password = $json["password"];

            $sql = "SELECT * FROM tbl_employees ";
            $sql .= "WHERE emp_uname = :username AND emp_pword = :password";
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

$operation = $_POST['operation'];
$employee = new Employee();

switch ($operation) {
    case "addEmployee":
        echo $employee->addEmployee();
        break;
    case "getEmployee":
        echo $employee->getEmployee();
        break;
    case "login":
        echo $employee->login();
        break;
}
?>
