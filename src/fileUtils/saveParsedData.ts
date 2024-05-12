import fs from "fs";
import path from "path";

const allSections = [
    "comments",
    "info",
    "tiles",
    "height",
    "objectives",
    "buildings",
    "landslidefrequency",
    "lavaspread",
    "resources",
    "miners",
    "briefing",
    "briefingsuccess",
    "briefingfailure",
    "vehicles",
    "creatures",
    "blocks",
    "script",
];

export const saveParsedData = (sections: { [key: string]: string }) => {
  const partsDirectory = "./bin/forge/parts";
  fs.mkdirSync(partsDirectory, { recursive: true });

  allSections.forEach(section => {
    const sectionFilename = path.join(partsDirectory, `${section}.part`);
    const content = sections[section] || `${section}{\n}\n`;

    fs.writeFileSync(sectionFilename, content, "utf8");
  });
};
