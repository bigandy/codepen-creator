export default function (eleventyConfig) {
    // Input directory: src
    // Output directory: _site

    eleventyConfig.addPassthroughCopy("style.css");
    eleventyConfig.addPassthroughCopy("script.js");

    eleventyConfig.addGlobalData(
        "layout",
        "layouts/default.njk",
    );

    eleventyConfig.setServerOptions({
        // Default values are shown:

        // Whether the live reload snippet is used
        // liveReload: true,

        // Whether DOM diffing updates are applied where possible instead of page reloads
        domDiff: false,

        // The starting port number
        // Will increment up to (configurable) 10 times if a port is already in use.
        // port: 8080,
    });

    // // This is relative to the demos in the demos folder.
    // eleventyConfig.setIncludesDirectory("../_includes");
    // eleventyConfig.setOutputDirectory("../../_site");
}

export const config = {
    templateFormats: ["njk"],
    dir: {
        includes: "../../_includes",
        output: "../../../_site",
    },
};
