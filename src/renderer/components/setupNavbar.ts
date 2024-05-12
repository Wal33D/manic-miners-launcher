export function setupNavbar(navbarId: string, toggleFunction: () => void): void {
  const navbar = document.getElementById(navbarId);
  if (navbar) {
    navbar.addEventListener('click', toggleFunction);
  } else {
    console.error('Navbar not found:', navbarId);
  }
}
