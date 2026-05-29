<?php
header('Content-Type: application/json');

// Get the user message from the request
$inputData = file_get_contents('php://input');
$data = json_decode($inputData, true);
$userMessage = strtolower(trim($data['message'] ?? ''));

if (empty($userMessage)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Message is required']);
    exit;
}

// Knowledge base
$responses = [
    // Greetings
    ['keywords' => ['hello', 'hi', 'hey', 'greetings', 'howdy'], 
     'response' => "Hello! 👋 I'm Rhizmon's AI assistant. Feel free to ask me anything about Rhizmon's skills, projects, or experience!"],
    
    // Skills and expertise
    ['keywords' => ['skill', 'skills', 'expertise', 'what can you do', 'what do you know'],
     'response' => "Rhizmon has expertise in:\n• Frontend: HTML, CSS, JavaScript, UI/UX design\n• Backend: PHP, Firebase, MySQL\n• Other: Python, Dart, Java, AI\n\nWhat would you like to know more about?"],
    
    // Projects
    ['keywords' => ['project', 'projects', 'portfolio', 'work', 'portfolio item', 'build', 'created'],
     'response' => "Rhizmon has 4 main projects:\n1. Tapsilugaw Website - Restaurant ordering system\n2. PLV-Share App - Android lending app for students\n3. Singko O Tres - Educational game\n4. Valcitizen - A web-based survey platform for improving Valenzuela City’s LGU services.\n\nWhich one interests you?"],
    
    // Specific projects
    ['keywords' => ['tapsilugaw', 'restaurant'],
     'response' => "Tapsilugaw Website: A full-featured restaurant website built with HTML, CSS, and PHP. It includes menu display, online ordering, admin moderation system, and responsive UI design."],
    
    ['keywords' => ['plv-share', 'android', 'app', 'lending'],
     'response' => "PLV-Share App: An Android application for students to lend and borrow academic items. Built with Dart, Firebase, and Node.js. Perfect for students who need to share resources!"],
    
    ['keywords' => ['singko', 'game', 'tres'],
     'response' => "Singko O Tres: An educational game where the main character defeats low grades as enemies to pass the course. Built with Java and AI mechanics. A creative way to make learning fun!"],

    ['keywords' => ['valcitizen', 'survey', 'valenzuela', 'city'],
     'response' => "Valcitizen: A web-based survey platform designed to improve Valenzuela City's LGU services. Built with HTML, CSS, JavaScript, and Firebase. It allows citizens to provide feedback and helps the city government enhance public services."],
    
    // Frontend development
    ['keywords' => ['frontend', 'web', 'html', 'css', 'javascript', 'ui', 'design', 'responsive'],
     'response' => "Rhizmon excels in frontend development with:\n• Responsive design\n• CSS animations and effects\n• Modern UI/UX principles\n• JavaScript interactivity\n• Accessibility best practices\n\nThis chatbot is actually an example of frontend-backend integration!"],
    
    // Backend development
    ['keywords' => ['backend', 'php', 'server', 'database', 'mysql', 'firebase', 'authentication'],
     'response' => "Rhizmon's backend skills include:\n• PHP development\n• MySQL database management\n• Firebase integration\n• Authentication systems\n• Server-side deployment\n\nRight now you're talking to a PHP backend!"],
    
    // Game testing
    ['keywords' => ['game', 'test', 'testing', 'qa', 'quality assurance', 'tester'],
     'response' => "Rhizmon has experience as a **Game Tester** with skills in:\n• Bug identification and reporting\n• Gameplay mechanics feedback\n• Quality assurance testing\n• User experience optimization\n\nThis experience complements web and game development!"],
    
    // Education
    ['keywords' => ['education', 'study', 'degree', 'college', 'university', 'certificate'],
     'response' => "Rhizmon is:\n• Currently pursuing BS in Information Technology\n• Cisco Networking Academy certified\n• Continuously learning new technologies\n\nWhat aspect of tech are you interested in?"],
    
    // Contact
    ['keywords' => ['contact', 'reach out', 'email', 'facebook', 'instagram', 'linkedin', 'github', 'social'],
     'response' => "You can reach Rhizmon on:\n📧 Email: rhizmonpoquiz@gmail.com\n🐙 GitHub: erizuu\n💼 LinkedIn: Poquiz Rhizmon\n📱 Instagram: riiiizu_/\n👍 Facebook: eriiiizuuuu\n💬 Discord: Available\n\nCheck the Contacts page for direct links!"],
    
    // About
    ['keywords' => ['about', 'who', 'rhizmon', 'introduce', 'tell me about'],
     'response' => "I'm an AI assistant for Rhizmon's portfolio! Rhizmon is a passionate Developer and AI Enthusiast who loves creating modern web applications, interactive systems, and AI-integrated solutions. Currently studying Information Technology with a focus on web development and artificial intelligence."],
    
    // AI interest
    ['keywords' => ['ai', 'artificial intelligence', 'machine learning', 'ml', 'future'],
     'response' => "Rhizmon is very interested in AI and machine learning! The fact that you're talking to an AI chatbot right now is an example of Rhizmon's passion for AI integration. Always exploring ways to incorporate AI into projects!"],
    
    // Tools
    ['keywords' => ['tools', 'software', 'technology', 'framework', 'language'],
     'response' => "Rhizmon uses:\n• Editors: VS Code\n• **Version Control**: Git\n• **Backend**: Firebase, PHP, MySQL\n• **Languages**: HTML, CSS, JavaScript, Python, Dart, Java\n• **Design**: Responsive design, UI/UX principles\n\nAlways learning new tools!"],
    
    // Availability/Hiring
    ['keywords' => ['hire', 'available', 'freelance', 'job', 'opportunity', 'work with'],
     'response' => "Rhizmon is open to opportunities! For project inquiries or collaboration, please reach out through the Contacts page. You can send a message directly or connect on social media. Looking forward to hearing from you!"],
];

// Function to calculate similarity
function calculateSimilarity($input, $keywords) {
    $matchCount = 0;
    foreach ($keywords as $keyword) {
        if (strpos($input, $keyword) !== false) {
            $matchCount++;
        }
    }
    return $matchCount;
}

// Find the best response
$bestResponse = null;
$bestScore = 0;

foreach ($responses as $responseData) {
    $score = calculateSimilarity($userMessage, $responseData['keywords']);
    if ($score > $bestScore) {
        $bestScore = $score;
        $bestResponse = $responseData['response'];
    }
}

// Default response if no match found
if ($bestResponse === null) {
    $defaultResponses = [
        "That's an interesting question! Feel free to ask me about Rhizmon's skills, projects, or experience. You can also ask about specific technologies or how to get in touch!",
        "I'm here to help! Try asking about Rhizmon's projects, skills, or background.",
        "I'm not sure about that, but I'd love to tell you more about Rhizmon's work! Ask about projects or experience.",
        "Great question! To give you the best answer, try asking about specific areas like frontend, backend, or the projects Rhizmon has built.",
    ];
    $bestResponse = $defaultResponses[array_rand($defaultResponses)];
}

http_response_code(200);
echo json_encode(['success' => true, 'message' => $bestResponse]);
?>
