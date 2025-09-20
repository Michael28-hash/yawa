<?php
// Allow cross-origin requests
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

session_start();
include '../dbconnection.php'; // Make sure this file sets up $conn (PDO)

// Handle preflight requests
if ($_SERVER["REQUEST_METHOD"] == "OPTIONS") {
    http_response_code(200);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);

// Validate input
if (!isset($data['username'], $data['password'])) {
    echo json_encode(['success' => false, 'message' => 'Invalid request! Missing username or password.']);
    exit;
}

$username = trim($data['username']);
$password = trim($data['password']);
$hashedPassword = sha1($password); // ⚠️ For production, use password_hash and password_verify

$stmt = $conn->prepare("
    SELECT u.user_id, u.username, u.user_password, u.role_id, u.photo_url, 
           u.age, u.contact, u.email, u.address,
           r.role_name 
    FROM tbl_users u 
    JOIN tbl_role r ON u.role_id = r.role_id
    WHERE BINARY u.username = :username
");
$stmt->bindParam(':username', $username, PDO::PARAM_STR);
$stmt->execute();
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user) {
    if ($hashedPassword === $user['user_password']) {
        $_SESSION['user_id'] = $user['user_id'];
        $_SESSION['role_id'] = $user['role_id'];
        $token = bin2hex(random_bytes(16));

        $baseImageUrl = "";
        $photoUrl = $user['photo_url'] ? $baseImageUrl . basename($user['photo_url']) : null;

        echo json_encode([
            "success" => true,
            "message" => "Login successful",
            "token" => $token,
            "user_id" => $user['user_id'],
            "username" => $username,
            "role" => $user['role_id'],
            "role_name" => strtolower($user['role_name']),
            "photo_url" => $photoUrl,
            "age" => $user['age'],
            "contact" => $user['contact'],
            "email" => $user['email'],
            "address" => $user['address']
        ]);
    } else {
        echo json_encode(["success" => false, "message" => "Incorrect password."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid credentials."]);
}
?>
