<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $first_name = htmlspecialchars(strip_tags(trim($_POST["first_name"])));
    $last_name = htmlspecialchars(strip_tags(trim($_POST["last_name"])));
    $phone = htmlspecialchars(strip_tags(trim($_POST["phone"])));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $message = htmlspecialchars(strip_tags(trim($_POST["message"])));

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Invalid email address.";
        exit;
    }

    $to = "patriciamdatu@gmail.com;  
    $subject = "NEW INQUIRY SUBMISSION | $first_name $last_name";
    $body = "First Name: $first_name\nLast Name: $last_name\nPhone: $phone\nEmail: $email\n\nMessage:\n$message";
    $headers = "From: $email";

    if (mail($to, $subject, $body, $headers)) {
        echo "Message sent successfully!";
    } else {
        echo "Failed to send message.";
    }
} else {
    echo "Invalid request.";
}
?>
