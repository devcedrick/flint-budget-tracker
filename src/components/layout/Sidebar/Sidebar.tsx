import './Sidebar.css';

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <nav>
        <div className="navItem">Dashboard</div>
        <div className="navItem">Transactions</div>
      </nav>
    </aside>
  );
}