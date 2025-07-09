import * as p from "@clack/prompts";

import { setTimeout } from "node:timers/promises";
// import color from "picocolors";

async function main() {
    console.clear();

    // const spin = p.spinner();

    // p.intro("spinner start...");

    // spin.start();

    // await setTimeout(1000);

    // p.confirm({
    //     message: "Install dependencies?",
    //     initialValue: false,
    // });
    const select = await p.multiselect({
        message: "Select additional tools.",
        initialValues: ["prettier", "eslint"],
        options: [
            {
                value: "prettier",
                label: "Prettier",
                hint: "recommended",
            },
            {
                value: "eslint",
                label: "ESLint",
                hint: "recommended",
            },
        ],
    });

    console.log({ select });

    p.text({
        message: "Where should we create your project?",
        placeholder: "./sparkling-solid",
        validate: (value) => {
            if (!value) return "Please enter a path.";
            if (value[0] !== ".")
                return "Please enter a relative path.";
        },
    });

    const countries = [
        { value: "us", label: "United States", hint: "NA" },
        { value: "ca", label: "Canada", hint: "NA" },
        { value: "mx", label: "Mexico", hint: "NA" },
        { value: "br", label: "Brazil", hint: "SA" },
        { value: "ar", label: "Argentina", hint: "SA" },
        { value: "uk", label: "United Kingdom", hint: "EU" },
        { value: "fr", label: "France", hint: "EU" },
        { value: "de", label: "Germany", hint: "EU" },
        { value: "it", label: "Italy", hint: "EU" },
        { value: "es", label: "Spain", hint: "EU" },
        { value: "pt", label: "Portugal", hint: "EU" },
        { value: "ru", label: "Russia", hint: "EU/AS" },
        { value: "cn", label: "China", hint: "AS" },
        { value: "jp", label: "Japan", hint: "AS" },
        { value: "in", label: "India", hint: "AS" },
        { value: "kr", label: "South Korea", hint: "AS" },
        { value: "au", label: "Australia", hint: "OC" },
        { value: "nz", label: "New Zealand", hint: "OC" },
        { value: "za", label: "South Africa", hint: "AF" },
        { value: "eg", label: "Egypt", hint: "AF" },
    ];

    const result = await p.autocompleteMultiselect({
        message: "Select a country",
        options: countries,
        placeholder: "Type to search countries...",
        maxItems: 8,
    });

    if (p.isCancel(result)) {
        p.cancel("Operation cancelled.");
        process.exit(0);
    }

    p.outro("all done");
}
// $.verbose = true;

// const demoTitle = (await question("Demo Title? ")).trim();

// const demoTitleHyphenated = demoTitle.replaceAll(" ", "-");

// const newFileLocation = `src/demos/${demoTitleHyphenated.toLowerCase()}`;

// await $`cp boilerplate ${newFileLocation}`;

// const tempFile = tmpfile();
// await $`awk -v demoTitle=${demoTitle} '{sub(/TITLE/,demoTitle)}1' ${newFileLocation} | awk -v pubDate=${PUB_DATE} '{sub(/PUBDATE/,pubDate)}1' > ${tempFile} && mv ${tempFile} ${newFileLocation}`;

// await $(`open ${`http://localhost:1980`}`);

// await $`code ${newFileLocation}:8:7 -g`;
// await $`npm run dev -- --port 1234`;

main().catch(console.error);
