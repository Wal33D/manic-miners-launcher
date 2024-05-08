export const progressBarElement = `
<nav class="navbar navbar-expand-lg navbar-dark py-3 fixed-bottom footer draggableArea">
  <div class="container-fluid footer-container">
    <div class="progress custom-progress not-draggable">
      <div
        id="downloadProgress"
        class="progress-bar progress-bar-striped progress-bar-animated"
        role="progressbar"
        style="width: 1%;"
        aria-valuenow="1"
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
      <span id="progressText" class="progress-text">
        1%
      </span>
    </div>
  </div>
</nav>
`;
