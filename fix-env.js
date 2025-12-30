const fs = require('fs');
const path = require('path');

const envPath = path.resolve(process.cwd(), '.env.local');
const content = 'MONGODB_URI=mongodb+srv://vishvambarudavant96:YkNfIvvHrqXc67Mn@cluster0.hppib6y.mongodb.net/social-app?retryWrites=true&w=majority&appName=Cluster0';

fs.writeFileSync(envPath, content, 'utf8');
console.log('Fixed .env.local encoding');
