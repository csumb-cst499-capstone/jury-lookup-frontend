import { Logo } from "@/components/logo";

export function Footer() {
  return (
    <>
      <footer className="flex flex-col items-center py-4 bg-gray-100">
        <div className="mb-2">
          <Logo width={200} height={32} color="blue" aria-label="JuryUp Logo" />
        </div>
        <p className="text-center text-gray-600 text-sm">
          &copy; {new Date().getFullYear()} JuryUp by CSUMB Students. All rights
          reserved.
        </p>
      </footer>
    </>
  );
}

export default Footer;
