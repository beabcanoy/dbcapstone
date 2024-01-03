<?php
    header('Content-Type: application/json');
    header("Access-Control-Allow-Origin: *");

class Category{
    function addCategory($json){
        include "connection.php";

        $json = json_decode($json, true);
        $raw_category = $json["rawCategory"];

        $sql = "INSERT INTO tbl_raw_categories(raw_material_categories) ";
        $sql .= "VALUES(:raw_category)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(":raw_category", $raw_category);

        $stmt->execute();

        $returnValue = 0;
        if($stmt->rowCount() > 0){
            $returnValue = 1;
        }

        $stmt = null;
        $conn = null;

        return $returnValue;
    }

    function getCategories(){
        include "connection.php";

        $sql = "SELECT * FROM tbl_raw_categories ORDER BY raw_material_id ";
        $stmt = $conn->prepare($sql);
        $stmt->execute();

        $returnValue = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $conn = null; $stmt=null;

        return json_encode($returnValue);
    }

}

$json = isset($_POST['json']) ? $_POST['json'] : "";
$operation = $_POST['operation'];


$category = new Category();

switch($operation){
    case "addCategory":
        echo $category->addCategory($json);
        break;
    case "getCategories":
        echo $category->getCategories();
        break;
}
