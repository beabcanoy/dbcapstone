<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

class RawMaterial
{
    function addRawMaterial()
    {
        include "connection.php";

        $raw_roll = $_POST["raw_roll"];
        $raw_material_id = $_POST["raw_material_id"];
        $raw_netweight = $_POST["raw_netweight"];
        $raw_manufactured_date = $_POST["raw_manufactured_date"];
        $admin_id = $_POST["admin_id"];
        $employee_id = $_POST["employee_id"];

        $sql = "INSERT INTO tbl_raw_materials(raw_roll, raw_material_id, raw_netweight, raw_manufactured_date, admin_id, employee_id) ";
        $sql .= "VALUES(:raw_roll, :raw_material_id, :raw_netweight, :raw_manufactured_date, :admin_id, :employee_id)";

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(":raw_roll", $raw_roll);
        $stmt->bindParam(":raw_material_id", $raw_material_id);
        $stmt->bindParam(":raw_netweight", $raw_netweight);
        $stmt->bindParam(":raw_manufactured_date", $raw_manufactured_date);
        $stmt->bindParam(":admin_id", $admin_id);
        $stmt->bindParam(":employee_id", $employee_id);
        $stmt->execute();

        $returnValue = 0;
        if ($stmt->rowCount() > 0) {
            $returnValue = 1;
        }

        $stmt = null;
        $conn = null;

        echo $returnValue;
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

    function getEmpId()
    {
        include "connection.php";

        $sql = "SELECT emp_id, emp_name, emp_username, emp_password FROM tbl_employee";
        $stmt = $conn->prepare($sql);
        $stmt->execute();

        $returnValue = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $stmt = null;
        $conn = null;

        echo json_encode($returnValue);
    }

    function getAdminId()
    {
        include "connection.php";

        $sql = "SELECT admin_id, admin_fname, admin_lname, admin_uname, admin_pword FROM tbl_admin";
        $stmt = $conn->prepare($sql);
        $stmt->execute();

        $returnValue = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $stmt = null;
        $conn = null;

        echo json_encode($returnValue);
    }

    function getRecords()
    {
        include "connection.php";

        $sql = "SELECT tbl_raw_materials.raw_id, tbl_raw_materials.raw_roll, tbl_raw_materials.raw_netweight, tbl_raw_materials.raw_manufactured_date, ";
        $sql .= "tbl_raw_categories.raw_material_id, tbl_admin.admin_id, tbl_employee.emp_id ";
        $sql .= "FROM tbl_raw_materials ";
        $sql .= "INNER JOIN tbl_raw_categories ON tbl_raw_materials.raw_material_id = tbl_raw_categories.raw_material_id ";
        $sql .= "INNER JOIN tbl_admin ON tbl_raw_materials.admin_id = tbl_admin.admin_id ";
        $sql .= "INNER JOIN tbl_employee ON tbl_raw_materials.emp_id = tbl_employee.emp_id ";


        $stmt = $conn->prepare($sql);
        $stmt->execute();

        $returnValue = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $conn = null;
        $stmt = null;

        echo json_encode($returnValue);
    }
}

$operation = $_POST['operation'];

$rawmaterial = new RawMaterial();

switch ($operation) {
    case "addRawMaterial":
        echo $rawmaterial->addRawMaterial();
        break;
    case "getRawCategories":
        echo $rawmaterial->getRawCategories();
        break;
    case "getEmpId":
        echo $rawmaterial->getEmpId();
        break;
    case "getAdminId":
        echo $rawmaterial->getAdminId();
        break;
    case "getRecords":
        echo $rawmaterial->getRecords();
        break;
}
?>