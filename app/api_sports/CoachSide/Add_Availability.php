<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");

// DB connection
$host = "localhost";
$user = "root"; // change if needed
$pass = "";     // your db password
$db   = "sports_booking"; // your database name

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    die(json_encode(["error" => "Database connection failed."]));
}

// Handle GET (fetch all availabilities)
if ($_SERVER["REQUEST_METHOD"] === "GET") {
    $result = $conn->query("SELECT * FROM coach_availabilities ORDER BY date ASC");
    $availabilities = [];
    while ($row = $result->fetch_assoc()) {
        $availabilities[] = $row;
    }
    echo json_encode($availabilities);
    exit;
}

// Handle POST (add new availability)
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $coachName = $_POST["coach_name"] ?? '';
    $sport     = $_POST["sport"] ?? '';
    $date      = $_POST["date"] ?? '';
    $start     = $_POST["start"] ?? '';
    $end       = $_POST["end"] ?? '';
    $venue     = $_POST["venue"] ?? '';
    $slots     = $_POST["slots"] ?? 1;

    // handle image upload
    $coachImagePath = null;
    if (isset($_FILES["coach_image"]) && $_FILES["coach_image"]["error"] === UPLOAD_ERR_OK) {
        $uploadDir = "uploads/";
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }
        $fileName = time() . "_" . basename($_FILES["coach_image"]["name"]);
        $targetPath = $uploadDir . $fileName;
        if (move_uploaded_file($_FILES["coach_image"]["tmp_name"], $targetPath)) {
            $coachImagePath = $targetPath;
        }
    }

    if (!$coachName || !$sport || !$date || !$start || !$end || !$venue) {
        echo json_encode(["error" => "⚠ Please fill in all fields."]);
        exit;
    }

    $stmt = $conn->prepare("INSERT INTO coach_availabilities (coach_name, coach_image, sport, date, start, end, venue, slots) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssssssi", $coachName, $coachImagePath, $sport, $date, $start, $end, $venue, $slots);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "id" => $stmt->insert_id]);
    } else {
        echo json_encode(["error" => "Failed to insert record."]);
    }

    $stmt->close();
    exit;
}

echo json_encode(["error" => "Invalid request method."]);
$conn->close();
?>
