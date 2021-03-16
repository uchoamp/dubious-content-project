const path = require("path");
const fs = require("fs-extra");
const  Game = require("../models/Game"); 

updateSitemap()

async function updateSitemap() {
    try {
        const games = await Game.find({}).sort();

        let lastmod = new Date();
        lastmod = lastmod.toISOString().split('.')[0]+"+00:00";

let template = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
        xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
<!-- created with Free Online Sitemap Generator www.xml-sitemaps.com -->


<url>
    <loc>https://www.h-natsu.com.br/</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>1.00</priority>
</url>
<url>
    <loc>https://www.h-natsu.com.br/login</loc>
    <lastmod>2021-03-05T05:05:16+00:00</lastmod>
    <priority>0.80</priority>
</url>
<url>
    <loc>https://www.h-natsu.com.br/signup</loc>
    <lastmod>2021-03-05T05:05:16+00:00</lastmod>
    <priority>0.80</priority>
</url>
<url>
    <loc>https://www.h-natsu.com.br/tutorial/textractor</loc>
    <lastmod>2021-03-06T04:39:39+00:00</lastmod>
    <priority>0.80</priority>
</url>`;
        for (game of games) {

            lastmod = game.updatedAt.toISOString().split('.')[0]+"+00:00";

            template += `
<url>
<loc>https://www.h-natsu.com.br/game/${game.gameURL}</loc>
<lastmod>${lastmod}</lastmod>
<priority>0.80</priority>
</url>`;
        }
        template+= "\n\n\n</urlset>"
        
        await fs.outputFile(path.join(__dirname, "../public/sitemap.xml"), template);

    } catch (err) {
        console.error(err)
    }
}