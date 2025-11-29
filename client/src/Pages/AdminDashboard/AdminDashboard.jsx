import React, { useMemo } from "react";
import {
  ArrowUpRight,
  BarChart as BarChartIcon,
  LineChart as LineChartIcon,
} from "lucide-react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

// ==========================
// Admin Dashboard Content
// Only main content, no header/sidebar
// ==========================
export default function AdminDashboard() {
  // Mock data
  const stats = useMemo(
    () => [
      { id: 1, title: "Total Users", value: 124, trend: "+4.2%" },
      { id: 2, title: "Total Orders", value: 320, trend: "+1.1%" },
      { id: 3, title: "Total Revenue", value: "$8,420", trend: "+8.6%" },
      { id: 4, title: "Total Products", value: 84, trend: "-0.4%" },
    ],
    []
  );

  const monthlySales = [
    { month: "Jan", sales: 40 },
    { month: "Feb", sales: 300 },
    { month: "Mar", sales: 50 },
    { month: "Apr", sales: 40 },
    { month: "May", sales: 62 },
    { month: "Jun", sales: 53 },
    { month: "Jul", sales: 68 },
    { month: "Aug", sales: 72 },
    { month: "Sep", sales: 66 },
    { month: "Oct", sales: 78 },
    { month: "Nov", sales: 82 },
    { month: "Dec", sales: 90 },
  ];

  const userGrowth = [
    { month: "Jan", users: 120 },
    { month: "Feb", users: 90 },
    { month: "Mar", users: 150 },
    { month: "Apr", users: 130 },
    { month: "May", users: 190 },
    { month: "Jun", users: 170 },
    { month: "Jul", users: 210 },
    { month: "Aug", users: 230 },
    { month: "Sep", users: 200 },
    { month: "Oct", users: 240 },
    { month: "Nov", users: 260 },
    { month: "Dec", users: 300 },
  ];

  const recentOrders = [
    { id: "#1001", customer: "AsMa", total: "$120.00", status: "Delivered" },
    { id: "#1002", customer: "AsMaa", total: "$89.99", status: "Shipped" },
    { id: "#1003", customer: "Ahmed", total: "$45.50", status: "Processing" },
    { id: "#1004", customer: "Dave", total: "$230.00", status: "Cancelled" },
  ];

  const recentUsers = [
    { id: 1, name: "Emily", email: "emily@example.com", role: "Customer" },
    { id: 2, name: "Frank", email: "frank@example.com", role: "Seller" },
    { id: 3, name: "Gina", email: "gina@example.com", role: "Customer" },
  ];

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h2 className="text-2xl font-semibold">Overview</h2>
        <p className="text-sm text-primary">
          Welcome back — here’s what happened recently.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <StatCard
            key={s.id}
            title={s.title}
            value={s.value}
            trend={s.trend}
          />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {/* Monthly Sales Chart */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <LineChartIcon />
                <h3 className="text-lg font-medium">Monthly Sales</h3>
              </div>
              <div className="text-sm text-primary">Last 12 months</div>
            </div>
            <div className="w-full">
              <ResponsiveContainer width="100%" aspect={2}>
                <LineChart data={monthlySales}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="sales"
                    stroke="#3c6300"
                    strokeWidth={3}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* User Growth Chart */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <BarChartIcon />
                <h3 className="text-lg font-medium">User Growth</h3>
              </div>
              <div className="text-sm text-primary">Monthly</div>
            </div>
            <div className="w-full">
              <ResponsiveContainer width="100%" aspect={1.5}>
                <BarChart data={userGrowth}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="users" barSize={12} radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Recent Orders and Users */}
        <div className="space-y-6">
          <Card>
            <h3 className="mb-3 text-lg font-medium">Recent Orders</h3>
            <Table columns={["Order", "Customer", "Total", "Status"]}>
              {recentOrders.map((o) => (
                <tr key={o.id}>
                  <td>{o.id}</td>
                  <td>{o.customer}</td>
                  <td>{o.total}</td>
                  <td>{o.status}</td>
                </tr>
              ))}
            </Table>
          </Card>

          <Card>
            <h3 className="mb-3 text-lg font-medium">Recent Users</h3>
            <Table columns={["Name", "Email", "Role"]}>
              {recentUsers.map((u) => (
                <tr key={u.id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                </tr>
              ))}
            </Table>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ==========================
// Reusable components
// ==========================
function Card({ children }) {
  return (
    <div className="p-4 border bg-lime-50 border-lime-100 rounded-xl shadow-soft">
      {children}
    </div>
  );
}

function StatCard({ title, value, trend }) {
  return (
    <div className="flex items-center justify-between p-4 border shadow-sm bg-lime-50 border-lime-100 rounded-xl">
      <div>
        <div className="text-sm text-primary">{title}</div>
        <div className="text-2xl font-semibold">{value}</div>
      </div>
      <div className="flex items-center gap-1 text-sm text-primary">
        <ArrowUpRight size={14} />
        {trend}
      </div>
    </div>
  );
}

function Table({ columns = [], children }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm table-auto">
        <thead>
          <tr className="text-left text-primary">
            {columns.map((c) => (
              <th key={c} className="px-4 py-2 font-medium">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}
