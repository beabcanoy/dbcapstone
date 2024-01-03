<?php
header("Access-Control-Allow-Origin:*");

include("connection.php");

$emp_name = $_POST['emp_name'];
$emp_username = $_POST['emp_username'];
$emp_password = $_POST['emp_password'];

$sql = "INSERT INTO tbl_employee(emp_name, emp_username, emp_password) ";
$sql .= "VALUES(:emp_name, :emp_username, :emp_password)";
$stmt = $conn->prepare($sql);
$stmt->bindParam(":emp_name", $emp_name);
$stmt->bindParam(":emp_username", $emp_username);
$stmt->bindParam(":emp_password", $emp_password);

$returnValue = 0;
$stmt->execute();

if ($stmt->rowCount() > 0) {
    $returnValue = 1;
}

echo $returnValue;
?>
