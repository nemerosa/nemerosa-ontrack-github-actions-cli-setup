const core = require('@actions/core');
const tc = require('@actions/tool-cache');
const os = require('os');

try {
    // Gets the version, if available
    let version = core.getInput('version');
    // TODO If the version is not provided, computes the latest
    if (!version) {
        console.log("No version provided. Getting the latest version from GitHub.")
        version = '0.0.9';
    }
    console.log(`Using version: ${version}`);

    // Information about the OS
    const osPlatform = mapOS(os.platform());
    const osArch = mapArch(os.arch());
    console.log(`For OS platform: ${osPlatform}`);
    console.log(`For OS arch: ${osArch}`);

    // Getting the URL to the CLI
    const url = `https://github.com/nemerosa/ontrack-cli/releases/download/${version}/ontrack-cli-${osPlatform}-${osArch}`;
    console.log(`Downloading CLI from ${url}`);

    // Downloading
    const cliPath = tc.downloadTool(url);
    console.log(`Downloaded at ${cliPath}`)
} catch (error) {
    core.setFailed(error.message);
}

// arch in [arm, x32, x64...] (https://nodejs.org/api/os.html#os_os_arch)
// return value in [amd64, 386, arm]
function mapArch (arch) {
    const mappings = {
        x32: '386',
        x64: 'amd64'
    };
    return mappings[arch] || arch;
}

// os in [darwin, linux, win32...] (https://nodejs.org/api/os.html#os_os_platform)
// return value in [darwin, linux, windows]
function mapOS (os) {
    const mappings = {
        win32: 'windows'
    };
    return mappings[os] || os;
}
