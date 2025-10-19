import { existsSync, readFile, writeFileSync } from "fs";
import { parse, format, join, dirname } from "path";
import { exit } from "process";
import markdownit from "markdown-it";
import puppeteer from "puppeteer";
import { unlink } from "fs/promises";
import { fileURLToPath } from "url";
const FILE = parse(process.argv[process.argv.length - 1]);


if (FILE.ext != '.md') {
    console.error('This file is not a markdown file!');
    exit(1);
}

const __dirname =  dirname(fileURLToPath(import.meta.url))
const TMP_FILE = join(__dirname, FILE.name + ".tmp.html");

if (!existsSync(format(FILE))) {
    console.error("File", FILE, "doesn't exist!");
    exit(1);
}

const md = markdownit({
    html: true,
});


readFile(format(FILE), 'utf8', (err, data) => {
    console.log(data);

    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    writeFileSync(TMP_FILE, `<body>${md.render(data)}</body>`, 'utf8');
})

console.log(`Wrote html-content to tmp-file ${TMP_FILE}!`);

const browser = await puppeteer.launch();
const page = await browser.newPage();

await page.goto(`file://${TMP_FILE}`);


const OUT_FILE = join(__dirname, FILE.name + '.pdf');
await page.pdf({
    path: OUT_FILE
});

await browser.close()

await unlink(TMP_FILE);

console.log(`PDF created: ${OUT_FILE}`);
