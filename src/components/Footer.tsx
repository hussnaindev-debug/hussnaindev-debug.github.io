import Link from "next/link";
import { Mail } from "lucide-react";
import { LinkedinIcon } from "@/components/BrandIcons";
import Year from "@/components/Year";

const LINKEDIN = "https://www.linkedin.com/in/hussnain-sajjad-4129302b7";
const MAIL =
  "https://mail.google.com/mail/?view=cm&fs=1&to=hussnain.devcodes@gmail.com&su=Let%27s%20work%20together";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-id">
          <div className="f-name">Hussnain Sajjad</div>
          <div className="f-role">Game Developer · Unity &amp; Roblox</div>
        </div>
        <div className="footer-links">
          <a className="nav-icon" href={LINKEDIN} target="_blank" rel="noopener" aria-label="LinkedIn" data-cursor="OPEN">
            <LinkedinIcon size={18} />
          </a>
          <a className="nav-icon" href={MAIL} target="_blank" rel="noopener" aria-label="Email" data-cursor="EMAIL">
            <Mail size={18} />
          </a>
        </div>
      </div>
      <div className="footer-copy">
        © <Year /> Hussnain Sajjad · Built with Next.js · <Link href="/#home">Home</Link>
      </div>
    </footer>
  );
}
