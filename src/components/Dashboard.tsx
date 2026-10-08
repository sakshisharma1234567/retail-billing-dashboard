import { useState } from "react";
import {
  IndianRupee,
  Receipt,
  Package,
  AlertTriangle,
  LayoutDashboard,
  ShoppingCart,
  LogOut,
  Bell,
  TrendingUp,
  ArrowUpRight,
  Menu,
  X,
} from "lucide-react";

interface DashboardProps {
  onProducts: () => void;
  onBilling: () => void;
  onLogout: () => void;
}

function Dashboard({
  onProducts,
  onBilling,
  onLogout,
}: DashboardProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const stats = [
    {
      title: "Total Sales",
      value: "₹1,24,500",
      change: "+12.5%",
      icon: IndianRupee,
    },
    {
      title: "Total Bills",
      value: "248",
      change: "+8.2%",
      icon: Receipt,
    },
    {
      title: "Total Products",
      value: "120",
      change: "+4.5%",
      icon: Package,
    },
    {
      title: "Low Stock Products",
      value: "8",
      change: "Needs attention",
      icon: AlertTriangle,
    },
  ];

  const recentBills = [
    {
      id: "#INV-1024",
      customer: "Walk-in Customer",
      amount: "₹2,450",
      status: "Paid",
      time: "10 min ago",
    },
    {
      id: "#INV-1023",
      customer: "Rahul Sharma",
      amount: "₹1,899",
      status: "Paid",
      time: "35 min ago",
    },
    {
      id: "#INV-1022",
      customer: "Priya Verma",
      amount: "₹3,250",
      status: "Paid",
      time: "1 hour ago",
    },
    {
      id: "#INV-1021",
      customer: "Walk-in Customer",
      amount: "₹799",
      status: "Paid",
      time: "2 hours ago",
    },
  ];

  const handleProducts = () => {
    setIsMobileMenuOpen(false);
    onProducts();
  };

  const handleBilling = () => {
    setIsMobileMenuOpen(false);
    onBilling();
  };

  const handleLogout = () => {
    setIsMobileMenuOpen(false);
    onLogout();
  };

  return (
    <div className="min-h-screen bg-[#F6F3ED]">

      {/* Desktop Sidebar */}
      <aside className="fixed left-0 top-0 hidden h-screen w-64 border-r border-[#343A40] bg-[#20252B] lg:flex lg:flex-col">

        {/* Logo */}
        <div className="flex h-20 items-center gap-3 border-b border-[#343A40] px-6">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D97706] text-white">
            <ShoppingCart size={21} />
          </div>

          <div>
            <h1 className="text-lg font-bold text-white">
              RetailPro
            </h1>

            <p className="text-xs text-[#AEB5BD]">
              Billing Dashboard
            </p>
          </div>

        </div>

        {/* Desktop Navigation */}
        <nav className="flex-1 px-4 py-6">

          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-[#89919A]">
            Main Menu
          </p>

          {/* Dashboard */}
          <button
            type="button"
            className="flex w-full items-center gap-3 rounded-xl bg-[#D97706] px-4 py-3 text-sm font-semibold text-white shadow-sm"
          >
            <LayoutDashboard size={19} />
            Dashboard
          </button>

          {/* Products */}
          <button
            type="button"
            onClick={onProducts}
            className="mt-2 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-[#C8CDD2] transition hover:bg-[#2C3238] hover:text-white"
          >
            <Package size={19} />
            Products
          </button>

          {/* Billing */}
          <button
            type="button"
            onClick={onBilling}
            className="mt-2 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-[#C8CDD2] transition hover:bg-[#2C3238] hover:text-white"
          >
            <Receipt size={19} />
            Billing
          </button>

        </nav>

        {/* Desktop Logout */}
        <div className="border-t border-[#343A40] p-4">

          <button
            type="button"
            onClick={onLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-[#C8CDD2] transition hover:bg-red-500/10 hover:text-red-400"
          >
            <LogOut size={19} />
            Logout
          </button>

        </div>

      </aside>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#20252B]/50 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-72 flex-col bg-[#20252B] shadow-2xl transition-transform duration-200 lg:hidden ${
          isMobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >

        {/* Mobile Logo */}
        <div className="flex h-20 items-center justify-between border-b border-[#343A40] px-5">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D97706] text-white">
              <ShoppingCart size={21} />
            </div>

            <div>
              <h1 className="text-lg font-bold text-white">
                RetailPro
              </h1>

              <p className="text-xs text-[#AEB5BD]">
                Billing Dashboard
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(false)}
            className="rounded-lg p-2 text-[#C8CDD2] transition hover:bg-[#2C3238] hover:text-white"
            aria-label="Close menu"
          >
            <X size={21} />
          </button>

        </div>

        {/* Mobile Navigation */}
        <nav className="flex-1 px-4 py-6">

          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-[#89919A]">
            Main Menu
          </p>

          {/* Dashboard */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex w-full items-center gap-3 rounded-xl bg-[#D97706] px-4 py-3 text-sm font-semibold text-white shadow-sm"
          >
            <LayoutDashboard size={19} />
            Dashboard
          </button>

          {/* Products */}
          <button
            type="button"
            onClick={handleProducts}
            className="mt-2 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-[#C8CDD2] transition hover:bg-[#2C3238] hover:text-white"
          >
            <Package size={19} />
            Products
          </button>

          {/* Billing */}
          <button
            type="button"
            onClick={handleBilling}
            className="mt-2 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-[#C8CDD2] transition hover:bg-[#2C3238] hover:text-white"
          >
            <Receipt size={19} />
            Billing
          </button>

        </nav>

        {/* Mobile Logout */}
        <div className="border-t border-[#343A40] p-4">

          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-[#C8CDD2] transition hover:bg-red-500/10 hover:text-red-400"
          >
            <LogOut size={19} />
            Logout
          </button>

        </div>

      </aside>

      {/* Main Content */}
      <div className="lg:ml-64">

        {/* Header */}
        <header className="sticky top-0 z-30 border-b border-[#E5E0D8] bg-[#F6F3ED]/95 backdrop-blur">

          <div className="flex min-h-20 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">

            <div className="flex items-center gap-3">

              {/* Mobile Menu Button */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#DDD7CE] bg-white text-[#59616A] transition hover:bg-[#F1EEE8] lg:hidden"
                aria-label="Open menu"
              >
                <Menu size={21} />
              </button>

              <div>
                <h2 className="text-xl font-bold text-[#20252B] sm:text-2xl">
                  Dashboard
                </h2>

                <p className="mt-1 text-sm text-[#737B84]">
                  Overview of your retail business
                </p>
              </div>

            </div>

            {/* Notification */}
            <button
              type="button"
              className="relative shrink-0 rounded-xl border border-[#DDD7CE] bg-white p-2.5 text-[#59616A] transition hover:bg-[#F1EEE8]"
              aria-label="Notifications"
            >
              <Bell size={20} />

              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#D97706]" />
            </button>

          </div>

        </header>

        {/* Main */}
        <main className="px-4 py-6 sm:px-6 lg:px-8">

          {/* Welcome */}
          <div className="mb-6 overflow-hidden rounded-2xl bg-[#292E34] p-5 text-white shadow-sm sm:p-6">

            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

              <div>

                <p className="text-sm font-medium text-[#D6DADE]">
                  Welcome back
                </p>

                <h3 className="mt-1 text-2xl font-bold">
                  Good afternoon! 👋
                </h3>

                <p className="mt-2 max-w-xl text-sm text-[#B9C0C7]">
                  Here's what's happening with your retail business today.
                </p>

              </div>

              <div className="hidden rounded-xl bg-[#D97706] p-4 sm:block">
                <TrendingUp size={34} />
              </div>

            </div>

          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

            {stats.map((stat) => {
              const Icon = stat.icon;

              const isWarning =
                stat.title === "Low Stock Products";

              return (
                <div
                  key={stat.title}
                  className="rounded-2xl border border-[#E2DDD5] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >

                  <div className="flex items-start justify-between gap-3">

                    <div>

                      <p className="text-sm font-medium text-[#737B84]">
                        {stat.title}
                      </p>

                      <p className="mt-2 text-2xl font-bold text-[#20252B]">
                        {stat.value}
                      </p>

                      <div className="mt-3 flex items-center gap-1.5 text-xs">

                        {!isWarning && (
                          <TrendingUp
                            size={14}
                            className="text-emerald-600"
                          />
                        )}

                        <span
                          className={
                            isWarning
                              ? "font-medium text-[#D97706]"
                              : "font-medium text-emerald-600"
                          }
                        >
                          {stat.change}
                        </span>

                      </div>

                    </div>

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FFF3E0] text-[#D97706]">
                      <Icon size={21} />
                    </div>

                  </div>

                </div>
              );
            })}

          </div>

          {/* Recent Billing */}
          <div className="mt-6 rounded-2xl border border-[#E2DDD5] bg-white shadow-sm">

            <div className="flex flex-col gap-3 border-b border-[#E8E3DB] px-5 py-5 sm:flex-row sm:items-center sm:justify-between">

              <div>

                <h3 className="font-semibold text-[#20252B]">
                  Recent Billing Activity
                </h3>

                <p className="mt-1 text-sm text-[#737B84]">
                  Latest invoices generated from your store
                </p>

              </div>

              <button
                type="button"
                onClick={onBilling}
                className="inline-flex items-center gap-1.5 self-start text-sm font-semibold text-[#C26200] transition hover:text-[#A64F00] sm:self-auto"
              >
                View all
                <ArrowUpRight size={16} />
              </button>

            </div>

            {/* Desktop Table */}
            <div className="hidden overflow-x-auto md:block">

              <table className="w-full">

                <thead>
                  <tr className="border-b border-[#E8E3DB] bg-[#FAF9F7]">

                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#737B84]">
                      Invoice
                    </th>

                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#737B84]">
                      Customer
                    </th>

                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#737B84]">
                      Amount
                    </th>

                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#737B84]">
                      Status
                    </th>

                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#737B84]">
                      Time
                    </th>

                  </tr>
                </thead>

                <tbody>

                  {recentBills.map((bill) => (
                    <tr
                      key={bill.id}
                      className="border-b border-[#EEEAE4] last:border-0 hover:bg-[#FCFBF9]"
                    >

                      <td className="px-5 py-4 text-sm font-semibold text-[#20252B]">
                        {bill.id}
                      </td>

                      <td className="px-5 py-4 text-sm text-[#59616A]">
                        {bill.customer}
                      </td>

                      <td className="px-5 py-4 text-sm font-semibold text-[#20252B]">
                        {bill.amount}
                      </td>

                      <td className="px-5 py-4">

                        <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600">
                          {bill.status}
                        </span>

                      </td>

                      <td className="px-5 py-4 text-sm text-[#737B84]">
                        {bill.time}
                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>

            {/* Mobile Billing Cards */}
            <div className="divide-y divide-[#EEEAE4] md:hidden">

              {recentBills.map((bill) => (
                <div
                  key={bill.id}
                  className="p-5"
                >

                  <div className="flex items-center justify-between gap-3">

                    <p className="font-semibold text-[#20252B]">
                      {bill.id}
                    </p>

                    <span className="shrink-0 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600">
                      {bill.status}
                    </span>

                  </div>

                  <div className="mt-3 flex items-center justify-between gap-4">

                    <div>

                      <p className="text-sm text-[#59616A]">
                        {bill.customer}
                      </p>

                      <p className="mt-1 text-xs text-[#8A929A]">
                        {bill.time}
                      </p>

                    </div>

                    <p className="shrink-0 font-semibold text-[#20252B]">
                      {bill.amount}
                    </p>

                  </div>

                </div>
              ))}

            </div>

          </div>

          {/* Low Stock Alert */}
          <div className="mt-6 rounded-2xl border border-[#F2D5A8] bg-[#FFF8EC] p-5">

            <div className="flex items-start gap-4">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FDECCF] text-[#D97706]">
                <AlertTriangle size={20} />
              </div>

              <div>

                <h3 className="font-semibold text-[#8A5200]">
                  Low stock alert
                </h3>

                <p className="mt-1 text-sm text-[#A66A13]">
                  You currently have 8 products with low stock.
                  Consider restocking them soon.
                </p>

              </div>

            </div>

          </div>

        </main>

      </div>

    </div>
  );
}

export default Dashboard;