<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

class Roll_material{
    function add_roll_material($json) {
        include "connection.php";

        $returnValue = 0;

        $json = json_decode($json, true);
        if (isset($json['headerTable']) && is_array($json['headerTable'])) {
            $headerTable = $json['headerTable'];

        $sql = "INSERT INTO tbl_roll_detail(raw_material_id, roll_detail_no_of, roll_detail_netweight, manufacture_date) ";
        $sql .= "VALUES(:raw_material_id, :detail_no_of, :detail_netweight, :manufacture_date)";
        $stmt = $conn->prepare($sql);

        foreach ($headerTable as $headerTables) {

            $stmt->bindParam(":raw_material_id", $headerTables['raw_material_id']);
            $stmt->bindParam(":detail_no_of", $headerTables['detail_no_of']);
            $stmt->bindParam(":detail_netweight", $headerTables['detail_netweight']);
            $stmt->bindParam(":manufacture_date", $headerTables['manufacture_date']);
            
            $stmt->execute();
        }

        if ($stmt->rowCount() > 0) {
            $returnValue = 1;
        } else {
            $returnValue = 0;
        }
    }

        $stmt = null;
        $conn = null;

        return $returnValue;
    }
        


    function getRawCategories()
    {
        include "connection.php";

        $sql = "SELECT raw_material_id, raw_material_categories FROM tbl_raw_categories";
        $stmt = $conn->prepare($sql);
        $stmt->execute();

        $returnValue = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $stmt = null;
        $conn = null;

        echo json_encode($returnValue);
    }

    function getRecords(){
        include "connection.php";
    
        $sql = "SELECT tbl_roll_detail.roll_detail_id, tbl_raw_categories.raw_material_categories, tbl_roll_detail.roll_detail_no_of, tbl_roll_detail.roll_detail_netweight ";
        $sql .= "FROM tbl_roll_detail ";
        $sql .= "INNER JOIN tbl_raw_categories ON tbl_roll_detail.raw_material_id = tbl_raw_categories.raw_material_id";
    
        $stmt = $conn->prepare($sql);
        $stmt->execute();
    
        $returnValue = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $conn = null;
        $stmt = null;
    
        return json_encode($returnValue);
    }
    
    }

$json = isset($_POST['json']) ? $_POST['json'] : "";
$operation = $_POST['operation'];
$roll_material = new Roll_material();

switch ($operation) {
    case "add_roll_material":
        echo $roll_material->add_roll_material($json);
        break;
    case "getRawCategories":
        echo $roll_material->getRawCategories();
        break;
    case "getRecords":
        echo $roll_material->getRecords();
        break;
}
?>
