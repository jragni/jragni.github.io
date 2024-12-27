/**
 * Navbar
 */

export default function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <a
            className="text-md tracking-widest text-slate hover:text-teal transition-colors"
            href="#about"
          >
            ABOUT
          </a>
        </li>
        <li>
          <a
            className="text-md tracking-widest text-slate hover:text-teal transition-colors"
            href="#experience"
          >
            EXPERIENCE
          </a>

        </li>
        <li>
          <a
            className="text-md tracking-widest text-slate hover:text-teal transition-colors"
            href="#projects"
          >
            PROJECTS
          </a>
        </li>
      </ul>
    </nav>
  );
}