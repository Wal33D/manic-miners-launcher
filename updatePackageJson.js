const fs = require('fs');
const path = require('path');

// Path to the .git/config and package.json files
const gitConfigPath = path.join(__dirname, '.git', 'config');
const packageJsonPath = path.join(__dirname, 'package.json');

const updateRepositoryUrl = () => {
  try {
    // Read the .git/config file
    const gitConfigContent = fs.readFileSync(gitConfigPath, 'utf8');
    // Extract the URL using a regex that finds the remote origin url
    const urlMatch = gitConfigContent.match(/url = (.+)/);
    if (!urlMatch) {
      throw new Error('Git repository URL not found in .git/config');
    }
    const repositoryUrl = urlMatch[1];

    // Read and parse the package.json file
    const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf8');
    const packageJson = JSON.parse(packageJsonContent);

    // Update the repository URL in package.json
    packageJson.repository = packageJson.repository || {};
    packageJson.repository.type = 'git';
    packageJson.repository.url = repositoryUrl;

    // Write the updated package.json back to the file system
    fs.writeFileSync(
      packageJsonPath,
      JSON.stringify(packageJson, null, 2),
      'utf8'
    );
    console.log('Updated repository URL in package.json successfully.');
  } catch (error) {
    console.error('Error updating package.json:', error);
  }
};

// Call the function to update the repository URL
updateRepositoryUrl();
