<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

include "../dbconnection.php";

$data = json_decode(file_get_contents("php://input"), true);
$email = $data['player_email'] ?? '';
$password = $data['player_password'] ?? '';

// ✅ Gmail restriction
if (!preg_match("/@gmail\.com$/", $email)) {
    echo json_encode(["success" => false, "message" => "Only Gmail accounts allowed"]);
    exit;
}

try {
    // ✅ Select all columns except password fields
    $stmt = $conn->prepare("
        SELECT 
            p.player_id,
            p.player_fullname,
            p.player_email,
            p.player_age,
            p.player_address,
            p.player_contact,
            p.gender_id,
            p.role_id,
            r.role_name
        FROM tbl_player p
        INNER JOIN tbl_role r ON p.role_id = r.role_id
        WHERE p.player_email = ?
    ");
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    // Verify password
    if ($user) {
        $stmtPwd = $conn->prepare("SELECT player_password FROM tbl_player WHERE player_email = ?");
        $stmtPwd->execute([$email]);
        $pwdRow = $stmtPwd->fetch(PDO::FETCH_ASSOC);

        if ($pwdRow && password_verify($password, $pwdRow['player_password'])) {
            echo json_encode([
                "success" => true,
                "message" => "Login successful",
                "data" => $user
            ]);
        } else {
            echo json_encode(["success" => false, "message" => "Invalid email or password"]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Invalid email or password"]);
    }
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Error: " . $e->getMessage()]);
}
?>