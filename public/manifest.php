<?php
header("Access-Control-Allow-Origin: *");
// Set the headers to prevent caching
header('Cache-Control: no-cache, must-revalidate');

// Capture all query parameters from the URL
$queryParams = $_SERVER['QUERY_STRING']; 

$manifest = [
    "name" => "Indibet",
    "short_name" => "Indibet",
    "start_url" => "/?" . $queryParams, 
    "display" => "standalone",
    "background_color" => "#0d6efd",
    "theme_color" => "#0d6efd",
    "description" => "Indibet is a rapidly growing online gambling and betting platform with a focus on sports betting and casino gaming.",
    "icons" => [
        [
            "src" => "/icon-192.png",
            "sizes" => "192x192",
            "type" => "image/png"
        ],
        [
            "src" => "/icon-512.png",
            "sizes" => "512x512",
            "type" => "image/png"
        ]
    ]
];


header('Content-Type: application/json');


echo json_encode($manifest);
?>
