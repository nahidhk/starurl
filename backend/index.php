<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json");

// =====================
// Database Config
// =====================
$DB_HOST = "localhost";
$DB_USER = "nahidtdx";
$DB_PASS = "NAHID12345";
$DB_NAME = "su";

try {
    $pdo = new PDO(
        "mysql:host=$DB_HOST;dbname=$DB_NAME;charset=utf8mb4",
        $DB_USER,
        $DB_PASS
    );

    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

} catch (PDOException $e) {
    die(json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]));
}

// =====================
// OPTIONS Request
// =====================
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// =====================
// Input Data
// =====================
$input = json_decode(file_get_contents("php://input"), true);
$type = $input['type'] ?? $_POST['type'] ?? '';
$table = "starurl_ndsql";

// =====================
// GET ALL DATA
// =====================
if ($type === "getall") {

    try {

        $stmt = $pdo->prepare("SELECT * FROM `$table`");
        $stmt->execute();

        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode([
            "status" => "success",
            "data" => $data
        ]);

    } catch (PDOException $e) {

        echo json_encode([
            "status" => "error",
            "message" => $e->getMessage()
        ]);

    }

    exit();
}

// =====================
// INSERT DATA
// =====================
if ($type === "post") {

    $data = $input['data'] ?? $_POST['data'] ?? [];

    if (empty($data)) {
        echo json_encode([
            "status" => "error",
            "message" => "No data provided"
        ]);
        exit();
    }

    try {

        $columns = array_keys($data);

        $sql = "INSERT INTO `$table` ("
            . implode(",", $columns)
            . ") VALUES (:"
            . implode(",:", $columns)
            . ")";

        $stmt = $pdo->prepare($sql);

        foreach ($data as $key => $value) {
            $stmt->bindValue(":$key", $value);
        }

        $stmt->execute();

        echo json_encode([
            "status" => "success",
            "message" => "Data inserted successfully",
            "id" => $pdo->lastInsertId()
        ]);

    } catch (PDOException $e) {

        echo json_encode([
            "status" => "error",
            "message" => $e->getMessage()
        ]);

    }

    exit();
}
// =====================
// Get Request
// =====================
if ($type === "get") {

 $data = $input['data'] ?? $_POST['data'] ?? [];

    if (empty($data)) {
        echo json_encode([
            "status" => "error",
            "message" => "No data provided"
        ]);
        exit();
    }
    $shortid = $data['short_id'] ?? '';

    $stmt = $pdo->prepare("
        SELECT *
        FROM `$table`
        WHERE short_id = :shortid
        LIMIT 1
    ");

    $stmt->execute([
        ':shortid' => $shortid
    ]);

    $data = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$data) {
        echo json_encode([
            "status" => "error",
            "message" => "Short ID not found"
        ]);
        exit;
    }

    echo json_encode([
        "status" => "success",
        "data" => $data
    ]);

    exit;
}

if($type === "edit") {

    $data = $input['data'] ?? $_POST['data'] ?? [];

    if (empty($data)) {
        echo json_encode([
            "status" => "error",
            "message" => "No data provided"
        ]);
        exit();
    }

    $id = $data['id'] ?? '';

    if (empty($id)) {
        echo json_encode([
            "status" => "error",
            "message" => "ID is required for edit"
        ]);
        exit();
    }

    try {

        $columns = array_keys($data);
        unset($columns[array_search('id', $columns)]);

        $sql = "UPDATE `$table` SET "
            . implode(" = ?, ", $columns) . " = ? "
            . "WHERE id = ?";

        $stmt = $pdo->prepare($sql);

        $values = array_values($data);
        unset($values[array_search($id, $values)]);
        $values[] = $id;

        $stmt->execute($values);

        echo json_encode([
            "status" => "success",
            "message" => "Data updated successfully"
        ]);

    } catch (PDOException $e) {

        echo json_encode([
            "status" => "error",
            "message" => $e->getMessage()
        ]);

    }

    exit();
}


// =====================
// Invalid Request
// =====================
echo json_encode([
    "status" => "error",
    "message" => "Invalid request type"
]);

?>