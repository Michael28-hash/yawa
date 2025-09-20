<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include "../dbconnection.php";

try {
    $stmt = $conn->prepare("SELECT gender_id, gender_name FROM tbl_gender");
    $stmt->execute();
    $gender = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "success" => true,
        "data" => $gender
    ]);
} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => "Error fetching genders: " . $e->getMessage()
    ]);
}

$conn = null;
