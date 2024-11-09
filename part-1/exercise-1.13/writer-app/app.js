const axios = require('axios');
const fs = require('fs');
const path = require('path');


const imageDir = path.join('/', 'usr', 'src', 'app', 'img');
//const imageDir = path.join('.', 'target');
const imagePath = path.join(imageDir, 'image.jpg');


if (!fs.existsSync(imageDir)) {
    fs.mkdirSync(imageDir, { recursive: true });
}

const fetchImage = async () => {
    try {
        console.log('Fetching new image from Lorem Picsum...');
        const response = await axios({
            url: 'https://picsum.photos/1200',
            responseType: 'stream',
        });

        const writeStream = fs.createWriteStream(imagePath);
        response.data.pipe(writeStream);
        
        await new Promise((resolve) => writeStream.on('finish', resolve));
        console.log('Image saved successfully!');
    } catch (error) {
        console.error('Error fetching image:', error);
    }
};

const TIME_INTERVAL = 60 * 60 * 1000;

fetchImage(); // Initial fetch
setInterval(fetchImage, TIME_INTERVAL);
