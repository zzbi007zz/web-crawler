const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');
const url = require('url');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

// Simple in-memory storage for crawled data
let crawledData = [];

// Function to crawl a website and extract all links with thumbnails
async function crawlWebsite(baseUrl) {
    try {
        const response = await axios.get(baseUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });
        const $ = cheerio.load(response.data);

        const title = $('title').text();

        // Extract all links and associated thumbnails from the page
        const links = [];
        $('a').each((index, element) => {
            const link = $(element).attr('href');
            const linkText = $(element).text().trim();
            if (link && !link.startsWith('#') && !link.startsWith('javascript:')) {
                let thumbnail = '';

                // Check for an img tag within the anchor tag
                const img = $(element).find('img').first();
                if (img.length > 0) {
                    thumbnail = img.attr('src');
                } else {
                    // If no img inside anchor, look for the nearest img tag
                    const nearestImg = $(element).closest('div').find('img').first();
                    if (nearestImg.length > 0) {
                        thumbnail = nearestImg.attr('src');
                    }
                }

                // Resolve relative URLs to absolute URLs
                const absoluteUrl = new URL(link, baseUrl).href;
                if (thumbnail) {
                    thumbnail = new URL(thumbnail, baseUrl).href;
                }

                links.push({
                    url: absoluteUrl,
                    title: linkText || 'No title',
                    thumbnail: thumbnail || ''
                });
            }
        });

        console.log(`Found ${links.length} links on ${baseUrl}`);

        return { url: baseUrl, title, links };
    } catch (error) {
        console.error(`Error crawling ${baseUrl}:`, error.message);
        return { url: baseUrl, error: error.message };
    }
}

// API endpoint to start crawling
app.post('/api/crawl', async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    try {
        const result = await crawlWebsite(url);
        crawledData = [result]; // Replace existing data with new result
        res.json(result);
    } catch (error) {
        console.error('Error in /api/crawl:', error);
        res.status(500).json({ error: 'Failed to crawl the URL' });
    }
});

// API endpoint to get all crawled data
app.get('/api/crawled-data', (req, res) => {
    res.json(crawledData);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});