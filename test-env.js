const fs = require('fs');
const path = require('path');

const envPath = path.resolve(process.cwd(), '.env.local');

console.log('Checking .env.local at:', envPath);

if (fs.existsSync(envPath)) {
    console.log('File exists.');
    const content = fs.readFileSync(envPath, 'utf8');
    console.log('Content length:', content.length);
    console.log('First 20 chars:', content.substring(0, 20));

    // Simple parse check
    const lines = content.split('\n');
    const uriLine = lines.find(l => l.startsWith('MONGODB_URI='));
    if (uriLine) {
        console.log('Found MONGODB_URI entry (masked):', uriLine.substring(0, 20) + '...');
    } else {
        console.log('MONGODB_URI entry NOT found in file content.');
    }
} else {
    console.error('File does NOT exist.');
}
