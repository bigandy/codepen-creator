#!/usr/bin/env zx
$.verbose = true;

const demoTitle = (await question("Demo Title? ")).trim();

const demoTitleHyphenated = demoTitle.replaceAll(" ", "-");

const newFileLocation = `src/demos/${demoTitleHyphenated.toLowerCase()}`;

await $`cp boilerplate ${newFileLocation}`;

const tempFile = tmpfile();
await $`awk -v demoTitle=${demoTitle} '{sub(/TITLE/,demoTitle)}1' ${newFileLocation} | awk -v pubDate=${PUB_DATE} '{sub(/PUBDATE/,pubDate)}1' > ${tempFile} && mv ${tempFile} ${newFileLocation}`;

await $(`open ${`http://localhost:1980`}`);

await $`code ${newFileLocation}:8:7 -g`;
await $`npm run dev -- --port 1234`;
