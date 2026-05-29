<?php
header('Content-Type: application/json');

$apiKey = 'AIzaSyBJL5d14_tx8UqVP_2_AxlT5R-du350Qew';

// Get the user message from the request
$data = json_decode(file_get_contents('php://input'), true);
$userMessage = $data['message'] ?? '';

if (empty($userMessage)) {
    echo json_encode(['error' => 'Message is required']);
    exit;
}

// System prompt with portfolio context
$systemPrompt = "You are an AI assistant for Rhizmon's portfolio. You are helpful, friendly, and knowledgeable about Rhizmon's skills, projects, and experience. 

Rhizmon is a Developer and AI Enthusiast with the following experience:
- Frontend Development: HTML, CSS, JavaScript, responsive design, animations, UI/UX and accessibility
- Backend Development: PHP, Firebase, MySQL, authentication systems, and deployment workflows
- Game Tester: Quality assurance and testing for games, identifying bugs, providing feedback on gameplay mechanics

Projects:
1. Tapsilugaw Website - Restaurant website with full functionality, including menu display, online ordering, admin moderation system, and responsive UI (HTML, CSS, PHP)
2. PLV-Share App - An Android app for lending and borrowing academic items for students (Dart, Firebase, Node.js)
3. Singko O Tres - A game where the main character is a student who defeats failing/low grades as the enemy (Java, AI)

Education: BS in Information Technology (ongoing)
Certificates: Cisco Networking Academy
Tools: VS Code, Firebase, Git

When users ask about Rhizmon's work, projects, or skills, provide helpful and accurate information. Keep responses concise and friendly. If asked about something not in the portfolio, politely redirect the conversation back to Rhizmon's work and expertise.";

// Prepare the API request
$apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' . $apiKey;

$payload = [
    'contents' => [
        [
            'role' => 'user',
            'parts' => [
                [
                    'text' => $systemPrompt . "\n\nUser message: " . $userMessage
                ]
            ]
        ]
    ],
    'generationConfig' => [
        'maxOutputTokens' => 500,
        'temperature' => 0.7
    ]
];

// Make the API request
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $apiUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode !== 200) {
    echo json_encode(['error' => 'Failed to get AI response']);
    exit;
}

$responseData = json_decode($response, true);

if (isset($responseData['candidates'][0]['content']['parts'][0]['text'])) {
    $aiMessage = $responseData['candidates'][0]['content']['parts'][0]['text'];
    echo json_encode(['success' => true, 'message' => $aiMessage]);
} else {
    echo json_encode(['error' => 'Invalid response from AI']);
}
?>
