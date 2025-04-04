export default function (eleventyConfig) {
  // Input directory: src
  // Output directory: _site

  eleventyConfig.addPassthroughCopy("style.css");
  eleventyConfig.addPassthroughCopy("script.js");

  eleventyConfig.addGlobalData("layout", "layouts/default.njk");

  // // This is relative to the demos in the demos folder.
  // eleventyConfig.setIncludesDirectory("../_includes");
  // eleventyConfig.setOutputDirectory("../../_site");
}

export const config = {
  templateFormats: ["njk"],
  dir: {
    includes: "../_includes",
    output: "../../public",
  },
};
