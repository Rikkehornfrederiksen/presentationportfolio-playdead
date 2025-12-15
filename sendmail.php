<?php
if($_SERVER['REQUEST_METHOD'] == 'POST') {

    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    $to = "happyoflife2@gmail.com";
    $subject = "New message from your website";
    $body = "Name: $name\nEmail: $email\n\nMessage:\n$message";
    $headers = "From: $email";

    mail($to, $subject, $body, $headers);

    echo "Thank you! Your message has been sent.";
}
?>
