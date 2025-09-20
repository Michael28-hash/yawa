<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

include "../dbconnection.php"; 

$data = json_decode(file_get_contents("php://input"), true);


$player_fullname        = $data['player_fullname'] ?? '';
$player_email           = $data['player_email'] ?? '';
$player_password        = $data['player_password'] ?? '';
$player_confirmpassword = $data['player_confirmpassword'] ?? '';
$player_age             = $data['player_age'] ?? '';
$player_address         = $data['player_address'] ?? '';
$player_contact         = $data['player_contact'] ?? '';
$gender_id              = isset($data['gender_id']) ? intval($data['gender_id']) : null;
$role_id                = isset($data['role_id']) ? intval($data['role_id']) : 4; 

// Validate required fields
if (!$player_fullname || !$player_email || !$player_password || !$player_confirmpassword) {
    echo json_encode(["success" => false, "message" => "All required fields must be filled"]);
    exit;
}

if ($player_password !== $player_confirmpassword) {
    echo json_encode(["success" => false, "message" => "Passwords do not match"]);
    exit;
}

// ✅ Hash both password fields
$hashedPassword        = password_hash($player_password, PASSWORD_DEFAULT);
$hashedConfirmPassword = password_hash($player_confirmpassword, PASSWORD_DEFAULT);

try {
    $stmt = $conn->prepare("
        INSERT INTO tbl_player 
        (player_fullname, player_email, player_password, player_confirmpassword, player_age, player_address, player_contact, gender_id, role_id) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ");
    $stmt->execute([
        $player_fullname, 
        $player_email, 
        $hashedPassword, 
        $hashedConfirmPassword, 
        $player_age, 
        $player_address, 
        $player_contact, 
        $gender_id,
        $role_id
    ]);

    echo json_encode(["success" => true, "message" => "Registration successful"]);
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Error: " . $e->getMessage()]);
}
