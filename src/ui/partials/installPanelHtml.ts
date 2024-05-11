export const installPanelHtml = `
<div class="bg-dark text-light p-3 rounded draggableArea" id="install-pane">
    <div class="p-3">
        <label for="versionSelect" class="form-label">Select Version</label>
        <select id="versionSelect" class="not-draggable form-select mb-3">
            <option value="" disabled selected>Choose a version:</option>
        </select>
        <label for="installPath" class="not-draggable form-label">Install Directory</label>
        <input type="text" id="installPath" class="not-draggable form-control mb-3" placeholder="Click to select install directory">

        <fieldset class="mb-3">
            <div class="d-flex flex-md-row flex-column mb-3">
                <div class="form-check me-md-2 mb-2 mb-md-0">
                    <input type="checkbox" class="form-check-input not-draggable" id="start-menu-shortcut">
                    <label class="form-check-label" for="start-menu-shortcut">Create Start Menu Shortcut</label>
                </div>
                <div class="form-check">
                    <input type="checkbox" class="form-check-input not-draggable" id="desktop-shortcut">
                    <label class="form-check-label" for="desktop-shortcut">Create Desktop Shortcut</label>
                </div>
            </div>
        </fieldset>
        <button id="installButton" style="display:none;" class="btn btn-dark-green mb-3 w-100 not-draggable">Install</button>
        <hr>
        <!-- Play Button -->
        <button id="playButton" class="btn btn-success w-100 not-draggable">Play Game</button>
    </div>
</div>
`;
