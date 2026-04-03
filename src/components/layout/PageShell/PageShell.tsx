import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import './PageShell.css';

interface PageShellProps {
  children: React.ReactNode;
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