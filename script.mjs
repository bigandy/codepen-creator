import { select, text, outro, note, isCancel } from "@clack/prompts";

import { $ } from "execa";

import fs from "fs-extra";

// import { setTimeout } from "node:timers/promises";
// import color from "picocolors";

async function main() {
  console.clear();

  // Which Path to take?
  // 1. [x] Create new Pen
  // 2. [x] Develop Existing Pen
  // 3. [ ] [future] publish pen

  const selection = await select({
    message: "What do you want to do first?",
    initialValue: "develop",
    maxItems: 1,
    options: [
      {
        value: "create",
        label: "Create",
      },
      {
        value: "develop",
        label: "Develop",
      },
    ],
  });

  if (selection === "develop") {
    const files = await fs.readdir('./src/demos');

    const demosSelection = await select({
      message: "Select the demo you want to develop",
      initialValue: "",
      maxItems: 1,
      options: files.map(demo => ({
        value: demo,
        label: demo
      })),
    });

    console.log({demosSelection})

    const newDirectory = `src/demos/${demosSelection}`;

    try {
      // AHTODO: can this be done in serial?
      await Promise.all([
        runDevServer(newDirectory),
        openSiteInBrowser(),
        openCodeInVSCode(newDirectory),
        showSuccessMessage(),
      ]);
    } catch (error) {
      console.error(error);
    }
  }

  if (selection === "create") {
    const name = await text({
      message: "Enter your pen name (letters and spaces only)",
      initialValue: "pen-name-1",
      validate: (value) => {
        if (!value) {
          return "Please enter a PEN name.";
        }

        if (!/^[a-zA-Z0-9-]+$/.test(value)) {
          return "Name can only contain letters, numbers, and hyphens ";
        }

        const newDirectory = `src/demos/${value}`;

        if (fs.existsSync(newDirectory)) {
          return "folder exists already, edit your name and try again";
        }

        // TODO: validate that there is a minimum of 3 letters, a hyphen and a number e.g. pen-1
        return undefined;
      },
    });

    if (!isCancel(name)) {
      note(`Valid name: ${name}`, "Success");
    }

    const newDirectory = `src/demos/${name}`;
    await createProjectFolder(newDirectory);

    try {
      // AHTODO: can this be done in serial?
      await Promise.all([
        runDevServer(newDirectory),
        openSiteInBrowser(),
        openCodeInVSCode(newDirectory),
        showSuccessMessage(),
      ]);
    } catch (error) {
      console.error(error);
    }
  }

  outro("all done");
}

const showSuccessMessage = () => {
  note(
    `opening vs code to edit you the code
    opening default browser on http://localhost:1980
    running dev server on http://localhost:1980
    `,
    "Success",
    {}
  );
};

const openCodeInVSCode = async (newDirectory) => {
  return await $`code ${newDirectory}/index.njk:2:5 -g`;
};

const openSiteInBrowser = async () => {
  return await $`open http://localhost:1980`;
};

const runDevServer = async (cwd) => {
  // cwd: set the current working directory and then run the dev server

  return await $({
    cwd,
  })`npx @11ty/eleventy --serve --config=../../eleventy.config.mjs --port=1980`;
};

const createProjectFolder = async (newDirectory) => {
  if (!fs.existsSync(newDirectory)) {
    fs.mkdirSync(newDirectory);
  } else {
    throw new Error("folder exists already. Show error");
  }

  try {
    await fs.copy("./boilerplate", newDirectory);

    note("success! New Pen files created");
  } catch (err) {
    console.error(err);
  }
};

main().catch(console.error);

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

// text({
//     message: "Where should we create your project?",
//     placeholder: "./sparkling-solid",
//     validate: (value) => {
//         if (!value) return "Please enter a path.";
//         if (value[0] !== ".")
//             return "Please enter a relative path.";
//     },
// });

// const countries = [
//     { value: "us", label: "United States", hint: "NA" },
//     { value: "ca", label: "Canada", hint: "NA" },
//     { value: "mx", label: "Mexico", hint: "NA" },
//     { value: "br", label: "Brazil", hint: "SA" },
//     { value: "ar", label: "Argentina", hint: "SA" },
//     { value: "uk", label: "United Kingdom", hint: "EU" },
//     { value: "fr", label: "France", hint: "EU" },
//     { value: "de", label: "Germany", hint: "EU" },
//     { value: "it", label: "Italy", hint: "EU" },
//     { value: "es", label: "Spain", hint: "EU" },
//     { value: "pt", label: "Portugal", hint: "EU" },
//     { value: "ru", label: "Russia", hint: "EU/AS" },
//     { value: "cn", label: "China", hint: "AS" },
//     { value: "jp", label: "Japan", hint: "AS" },
//     { value: "in", label: "India", hint: "AS" },
//     { value: "kr", label: "South Korea", hint: "AS" },
//     { value: "au", label: "Australia", hint: "OC" },
//     { value: "nz", label: "New Zealand", hint: "OC" },
//     { value: "za", label: "South Africa", hint: "AF" },
//     { value: "eg", label: "Egypt", hint: "AF" },
// ];

// const result = await p.autocompleteMultiselect({
//     message: "Select a country",
//     options: countries,
//     placeholder: "Type to search countries...",
//     maxItems: 8,
// });

// if (p.isCancel(result)) {
//     p.cancel("Operation cancelled.");
//     process.exit(0);
// }

// const spin = p.spinner();

// p.intro("spinner start...");

// spin.start();

// await setTimeout(1000);

// p.confirm({
//     message: "Install dependencies?",
//     initialValue: false,
// });
