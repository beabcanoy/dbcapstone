<?php
    header('Content-Type: application/json');
    header("Access-Control-Allow-Origin: *");

class Formula{
    function addFormula($json){
        include "connection.php";

        $json = json_decode($json, true);
        $formula_name = $json["formulaName"];
        $formula_expression = $json["formulaExpression"];

        $sql = "INSERT INTO  tbl_product_formulas(formula_name, Expression) ";
        $sql .= "VALUES(:formula_name, :formula_expression )";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(":formula_name", $formula_name);
        $stmt->bindParam(":formula_expression", $formula_expression);

        $stmt->execute();

        $returnValue = 0;
        if($stmt->rowCount() > 0){
            $returnValue = 1;
        }

        $stmt = null;
        $conn = null;

        return $returnValue;
    }

    
    function getFormulas(){
        include "connection.php";

        $sql = "SELECT * FROM tbl_product_formulas ORDER BY formula_id ";
        $stmt = $conn->prepare($sql);
        $stmt->execute();

        $returnValue = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $conn = null; $stmt=null;

        return json_encode($returnValue);
    }


}

$json = isset($_POST['json']) ? $_POST['json'] : "";
$operation = $_POST['operation'];


$formula = new Formula();

switch($operation){
    case "addFormula":
        echo $formula->addFormula($json);
        break;
    case "getFormulas":
        echo $formula->getFormulas();
        break;
}
