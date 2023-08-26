<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the data from the request
    $name = $_POST["name"];
    $message = $_POST["message"];

    // Email configuration
    $to = "laboyangelik@gmail.com"; // Change this to your email address
    $subject = "User Wants To Connect";
    $headers = "From: contact@angeliklaboy.com"; // Change this to a valid sender email address

    // Compose the email message
    $emailContent = "Name: $name\n\n";
    $emailContent .= "Message:\n$message";

    // Send the email
    $success = mail($to, $subject, $emailContent, $headers);

    // Prepare the response data
    $response = array(
        "success" => $success,
    );

    // Send the JSON response
    header("Content-Type: application/json");
    echo json_encode($response);
} else {
    // Return an error response if accessed directly
    $response = array(
        "success" => false,
        "error" => "Invalid request",
    );

    header("Content-Type: application/json");
    echo json_encode($response);
}
?>
