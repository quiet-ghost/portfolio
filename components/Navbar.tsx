import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="p-4 text-white bg-gray-800">
      <ul className="flex space-x-4">
        <li><Link href="/" className="hover:underline">Home</Link></li>
        <li><Link href="/about" className="hover:underline">About</Link></li>
        <li><Link href="/projects" className="hover:underline">Projects</Link></li>
        <li><Link href="/contact" className="hover:underline">Contact</Link></li>
      </ul>
    </nav>
  );
}