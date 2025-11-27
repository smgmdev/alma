<?php

header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["error" => "Method Not Allowed"]);
    exit;
}

$to = "paul@almaktoumoffice.com";
$subject = "New Investor Registration - Al Maktoum Finance";

$fields = [
    "Full Name" => $_POST["fullName"] ?? "",
    "Email" => $_POST["email"] ?? "",
    "Whatsapp" => $_POST["whatsapp"] ?? "",
    "Institution" => $_POST["institution"] ?? "",
    "Country" => $_POST["country"] ?? "",
    "Website" => $_POST["website"] ?? "N/A",
    "Industry" => $_POST["industry"] ?? "",
    "Investment Amount" => $_POST["amount"] ?? "",
    "Diversification Preference" => $_POST["diversification"] ?? "",
    "Other Diversification" => $_POST["otherDiversification"] ?? "",
];

$message = "New Investor Submission:\n\n";
foreach ($fields as $label => $value) {
    $message .= "$label: $value\n";
}

$headers = "From: noreply@stankeviciusgroup.com\r\n";
$headers .= "Reply-To: " . ($_POST["email"] ?? "") . "\r\n";

if (mail($to, $subject, $message, $headers)) {
    echo json_encode(["status" => "ok"]);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Mail send failed"]);
}
?>
