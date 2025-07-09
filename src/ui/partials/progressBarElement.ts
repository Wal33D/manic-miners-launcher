export const progressBarElement = `
<nav class="navbar bg-neutral text-neutral-content py-3 sticky-bottom draggableArea">
  <div class="w-full flex items-center px-4 draggableArea">
    <progress
      id="downloadProgress"
      class="progress progress-primary w-full"
      value="1"
      max="100"
    ></progress>
    <span id="progressText" class="ml-2 draggableArea">1%</span>
  </div>
</nav>
`;
