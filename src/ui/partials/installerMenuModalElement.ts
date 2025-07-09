export const installerMenuModalElement = `
<div class="modal not-draggable" id="navbar-main-menu-modal" tabindex="-1" aria-labelledby="navbar-main-menu-modalLabel" aria-hidden="true" style="display: none">
    <div class="modal-box">
        <button type="button" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" data-bs-dismiss="modal" aria-label="Close">✕</button>
        <h3 class="font-bold text-lg mb-4" id="navbar-main-menu-modalLabel">Navigation</h3>
        <div class="flex flex-col space-y-2">
            <a href="#" class="flex items-center">
                <div id='lmsMenuImg' class="menu-icon mr-2"></div>
                Home
            </a>
            <a href="#" class="flex items-center">
                <div id='levelsMenuImg' class="menu-icon mr-2"></div>
                Levels
            </a>
            <a href="#" class="flex items-center">
                <div id='teleportMenuImg' class="menu-icon mr-2"></div>
                Library
            </a>
            <a href="#" class="flex items-center">
                <div id='tsMenuImg' class="menu-icon mr-2"></div>
                Store
            </a>
            <a href="#" class="flex items-center">
                <div id='extensionsMenuImg' class="menu-icon mr-2"></div>
                Extensions
            </a>
        </div>
    </div>
</div>

`;
