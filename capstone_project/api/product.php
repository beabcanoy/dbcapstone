<?php
 header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

class Product{

    function addProduct()
    {
    include "connection.php";
        $prod_name = $_POST["prodName"];
        $prod_description = $_POST["prodDescription"];
        $prod_formula = $_POST["prodFormula"];
    
        // File handling
        $uploadDir = "uploads/";
        $uploadFile = $uploadDir . basename($_FILES['prodImage']['name']);

            if (move_uploaded_file($_FILES['prodImage']['tmp_name'], $uploadFile)) {
                $sql = "INSERT INTO tbl_products(product_name, product_image, product_description, formula_id) ";
                $sql .= "VALUES(:prod_name, :prod_img, :prod_description, :prod_formula)";
                
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(":prod_name", $prod_name);
                $stmt->bindParam(":prod_img", $uploadFile);
                $stmt->bindParam(":prod_description", $prod_description);
                $stmt->bindParam(":prod_formula", $prod_formula);
                $stmt->execute();
    
                $returnValue = 0;
                if($stmt->rowCount() > 0){
                    $returnValue = 1;
                }

                $stmt = null;
                $conn = null;

                return $returnValue;
    }
}

    function getFormula()
    {
        include "connection.php";

        $sql = "SELECT formula_id, formula_name FROM tbl_product_formulas";
        $stmt = $conn->prepare($sql);
        $stmt->execute();

        $returnValue = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $stmt = null;
        $conn = null;

        echo json_encode($returnValue);
    }

    function getRecords(){
        include "connection.php";

        $sql = "SELECT tbl_products.product_id, tbl_products.product_name, tbl_products.product_image, tbl_products.product_description, ";
        $sql .= "tbl_product_formulas.formula_id ";
        $sql .= "FROM tbl_products ";
        $sql .= "INNER JOIN tbl_product_formulas ON tbl_products.formula_id = tbl_product_formulas.formula_id";
        
        $stmt = $conn->prepare($sql);
        $stmt->execute();

        $returnValue = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $conn = null; $stmt=null;

        return json_encode($returnValue);
    }

}

$operation = $_POST['operation'];

$product = new Product();

switch ($operation) {
    case "addProduct":
        echo $product->addProduct();
        break;
    case "getFormula":
        echo $product->getFormula();
        break;
    case "getRecords":
        echo $product->getRecords();
        break;
}
?>
