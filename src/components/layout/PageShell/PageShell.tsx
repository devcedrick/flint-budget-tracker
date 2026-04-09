import Navbar from '../Navbar/Navbar';
import type { ReactNode } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import './PageShell.css';

interface PageShellProps {
  children: ReactNode;
}

export default function PageShell({ children }: PageShellProps) {
  return (
    <div className="layout">
      <Navbar />
      <div className="mainContainer">
        <Sidebar />
        <main className="content">
          {children}
        </main>
      </div>
    </div>
  );
}