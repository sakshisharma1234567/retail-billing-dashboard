import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Plus,
  Receipt,
  Search,
  X,
} from "lucide-react";

interface BillingProps {
  onBack: () => void;
}

interface Bill {
  id: string;
  customer: string;
  product: string;
  quantity: number;
  amount: number;
  status: "Paid" | "Pending";
  time: string;
}

interface BillForm {
  customer: string;
  product: string;
  quantity: string;
  price: string;
}

const BILLS_PER_PAGE = 5;

const initialBills: Bill[] = [
  {
    id: "#INV-1024",
    customer: "Walk-in Customer",
    product: "Wireless Mouse",
    quantity: 2,
    amount: 2450,
    status: "Paid",
    time: "10 min ago",
  },
  {
    id: "#INV-1023",
    customer: "Rahul Sharma",
    product: "Office Chair",
    quantity: 1,
    amount: 1899,
    status: "Paid",
    time: "35 min ago",
  },
  {
    id: "#INV-1022",
    customer: "Priya Verma",
    product: "Mechanical Keyboard",
    quantity: 1,
    amount: 3250,
    status: "Paid",
    time: "1 hour ago",
  },
  {
    id: "#INV-1021",
    customer: "Walk-in Customer",
    product: "Notebook",
    quantity: 5,
    amount: 799,
    status: "Paid",
    time: "2 hours ago",
  },
  {
    id: "#INV-1020",
    customer: "Aman Gupta",
    product: "Desk Lamp",
    quantity: 2,
    amount: 2598,
    status: "Pending",
    time: "3 hours ago",
  },
  {
    id: "#INV-1019",
    customer: "Neha Singh",
    product: "Backpack",
    quantity: 1,
    amount: 1599,
    status: "Paid",
    time: "4 hours ago",
  },
];

function Billing({ onBack }: BillingProps) {
  const [bills, setBills] = useState<Bill[]>(initialBills);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [formError, setFormError] = useState("");

  const [form, setForm] = useState<BillForm>({
    customer: "",
    product: "",
    quantity: "",
    price: "",
  });

  const filteredBills = useMemo(() => {
    const value = search.toLowerCase().trim();

    if (!value) {
      return bills;
    }

    return bills.filter(
      (bill) =>
        bill.id.toLowerCase().includes(value) ||
        bill.customer.toLowerCase().includes(value) ||
        bill.product.toLowerCase().includes(value)
    );
  }, [bills, search]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredBills.length / BILLS_PER_PAGE)
  );

  const visibleBills = filteredBills.slice(
    (currentPage - 1) * BILLS_PER_PAGE,
    currentPage * BILLS_PER_PAGE
  );

  const totalSales = bills
    .filter((bill) => bill.status === "Paid")
    .reduce((total, bill) => total + bill.amount, 0);

  const handleCreateBill = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setFormError("");

    const customer = form.customer.trim();
    const product = form.product.trim();
    const quantity = Number(form.quantity);
    const price = Number(form.price);

    if (
      !customer ||
      !product ||
      !form.quantity ||
      !form.price
    ) {
      setFormError("Please fill in all fields.");
      return;
    }

    if (quantity <= 0 || !Number.isInteger(quantity)) {
      setFormError(
        "Quantity must be a whole number greater than 0."
      );
      return;
    }

    if (price <= 0) {
      setFormError("Price must be greater than 0.");
      return;
    }

    const nextInvoiceNumber =
      bills.reduce((max, bill) => {
        const number = Number(
          bill.id.replace("#INV-", "")
        );

        return Number.isFinite(number)
          ? Math.max(max, number)
          : max;
      }, 1024) + 1;

    const newBill: Bill = {
      id: `#INV-${nextInvoiceNumber}`,
      customer,
      product,
      quantity,
      amount: quantity * price,
      status: "Paid",
      time: "Just now",
    };

    setBills((previousBills) => [
      newBill,
      ...previousBills,
    ]);

    setForm({
      customer: "",
      product: "",
      quantity: "",
      price: "",
    });

    setCurrentPage(1);
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-[#F6F3ED]">

      {/* HEADER */}
      <header className="sticky top-0 z-20 border-b border-[#E2DDD5] bg-[#F6F3ED]/95 backdrop-blur">
        <div className="mx-auto flex min-h-[76px] max-w-[1400px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">

          <div className="flex items-center gap-3">

            <button
              type="button"
              onClick={onBack}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#D9D3CA] bg-white text-[#4F565D] transition hover:bg-[#EFEBE4]"
            >
              <ArrowLeft size={19} />
            </button>

            <div>
              <h1 className="text-xl font-bold text-[#20252B] sm:text-2xl">
                Billing
              </h1>

              <p className="mt-0.5 text-sm text-[#737B84]">
                Manage invoices and billing activity
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={() => {
              setFormError("");
              setShowModal(true);
            }}
            className="flex items-center gap-2 rounded-xl bg-[#D97706] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#B85F05]"
          >
            <Plus size={18} />

            <span className="hidden sm:inline">
              Create New Bill
            </span>

            <span className="sm:hidden">
              Create
            </span>
          </button>

        </div>
      </header>

      {/* MAIN */}
      <main className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8">

        {/* SUMMARY */}
        <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-3">

          <SummaryCard
            title="Total Bills"
            value={String(bills.length)}
          />

          <SummaryCard
            title="Paid Bills"
            value={String(
              bills.filter(
                (bill) => bill.status === "Paid"
              ).length
            )}
          />

          <SummaryCard
            title="Paid Sales"
            value={`₹${totalSales.toLocaleString("en-IN")}`}
          />

        </div>

        {/* SEARCH */}
        <section className="rounded-2xl border border-[#E2DDD5] bg-white p-4 shadow-sm">

          <div className="relative">

            <Search
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9299A0]"
            />

            <input
              type="text"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by invoice, customer or product..."
              className="h-11 w-full rounded-xl border border-[#DDD7CE] bg-[#FAF9F7] pl-10 pr-4 text-sm text-[#20252B] outline-none transition placeholder:text-[#9A9FA5] focus:border-[#D97706] focus:bg-white focus:ring-4 focus:ring-[#FDECCF]"
            />

          </div>

        </section>

        {/* BILL TABLE */}
        <section className="mt-5 overflow-hidden rounded-2xl border border-[#E2DDD5] bg-white shadow-sm">

          <div className="border-b border-[#E8E3DB] px-5 py-4">

            <h3 className="font-semibold text-[#20252B]">
              Recent Bills
            </h3>

            <p className="mt-0.5 text-xs text-[#737B84]">
              {filteredBills.length} bills available
            </p>

          </div>

          {filteredBills.length === 0 ? (

            <div className="flex min-h-[300px] flex-col items-center justify-center text-center">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F1EEE8] text-[#8B9299]">
                <Receipt size={25} />
              </div>

              <h3 className="mt-4 font-semibold text-[#20252B]">
                No bills found
              </h3>

              <p className="mt-1 text-sm text-[#737B84]">
                Try changing your search.
              </p>

            </div>

          ) : (

            <>
              {/* DESKTOP */}
              <div className="hidden overflow-x-auto md:block">

                <table className="w-full">

                  <thead>
                    <tr className="border-b border-[#E8E3DB] bg-[#FAF9F7]">

                      <TableHeading text="Invoice" />
                      <TableHeading text="Customer" />
                      <TableHeading text="Product" />
                      <TableHeading text="Amount" />
                      <TableHeading text="Status" />
                      <TableHeading text="Time" />

                    </tr>
                  </thead>

                  <tbody>

                    {visibleBills.map((bill) => (
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

                        <td className="px-5 py-4 text-sm text-[#59616A]">
                          {bill.product}

                          <span className="ml-2 text-xs text-[#969DA4]">
                            × {bill.quantity}
                          </span>
                        </td>

                        <td className="px-5 py-4 text-sm font-semibold text-[#20252B]">
                          ₹{bill.amount.toLocaleString("en-IN")}
                        </td>

                        <td className="px-5 py-4">
                          <StatusBadge status={bill.status} />
                        </td>

                        <td className="px-5 py-4 text-sm text-[#737B84]">
                          {bill.time}
                        </td>

                      </tr>
                    ))}

                  </tbody>

                </table>

              </div>

              {/* MOBILE */}
              <div className="divide-y divide-[#EEEAE4] md:hidden">

                {visibleBills.map((bill) => (
                  <div
                    key={bill.id}
                    className="p-5"
                  >

                    <div className="flex items-center justify-between gap-3">

                      <div>
                        <p className="text-sm font-semibold text-[#20252B]">
                          {bill.id}
                        </p>

                        <p className="mt-1 text-xs text-[#737B84]">
                          {bill.time}
                        </p>
                      </div>

                      <StatusBadge status={bill.status} />

                    </div>

                    <div className="mt-4 rounded-xl bg-[#FAF9F7] p-4">

                      <p className="text-sm font-medium text-[#20252B]">
                        {bill.customer}
                      </p>

                      <p className="mt-1 text-sm text-[#737B84]">
                        {bill.product} × {bill.quantity}
                      </p>

                      <p className="mt-3 text-lg font-bold text-[#20252B]">
                        ₹{bill.amount.toLocaleString("en-IN")}
                      </p>

                    </div>

                  </div>
                ))}

              </div>

              {/* PAGINATION */}
              <div className="flex flex-col gap-3 border-t border-[#E8E3DB] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">

                <p className="text-sm text-[#737B84]">
                  Showing{" "}
                  <span className="font-semibold text-[#4F565D]">
                    {(currentPage - 1) * BILLS_PER_PAGE + 1}
                  </span>{" "}
                  to{" "}
                  <span className="font-semibold text-[#4F565D]">
                    {Math.min(
                      currentPage * BILLS_PER_PAGE,
                      filteredBills.length
                    )}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-[#4F565D]">
                    {filteredBills.length}
                  </span>
                </p>

                <div className="flex items-center gap-2">

                  <button
                    type="button"
                    onClick={() =>
                      setCurrentPage((page) =>
                        Math.max(1, page - 1)
                      )
                    }
                    disabled={currentPage === 1}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#DDD7CE] bg-white text-[#59616A] hover:bg-[#F5F1EB] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ChevronLeft size={17} />
                  </button>

                  <div className="rounded-lg bg-[#F1EEE8] px-3 py-2 text-xs font-semibold text-[#4F565D]">
                    Page {currentPage} of {totalPages}
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setCurrentPage((page) =>
                        Math.min(totalPages, page + 1)
                      )
                    }
                    disabled={currentPage === totalPages}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#DDD7CE] bg-white text-[#59616A] hover:bg-[#F5F1EB] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ChevronRight size={17} />
                  </button>

                </div>

              </div>
            </>
          )}

        </section>
      </main>

      {/* CREATE BILL MODAL */}
      {showModal && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#20252B]/50 px-4 py-6">

          <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">

            <div className="flex items-start justify-between border-b border-[#E5E0D8] px-6 py-5">

              <div>
                <h2 className="text-lg font-bold text-[#20252B]">
                  Create New Bill
                </h2>

                <p className="mt-1 text-sm text-[#737B84]">
                  Enter billing details
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="rounded-lg p-2 text-[#8B9299] hover:bg-[#F1EEE8]"
              >
                <X size={19} />
              </button>

            </div>

            <form
              onSubmit={handleCreateBill}
              className="p-6"
            >

              <div className="space-y-4">

                <FormInput
                  label="Customer Name"
                  value={form.customer}
                  placeholder="e.g. Rahul Sharma"
                  onChange={(value) =>
                    setForm({
                      ...form,
                      customer: value,
                    })
                  }
                />

                <FormInput
                  label="Product"
                  value={form.product}
                  placeholder="e.g. Wireless Mouse"
                  onChange={(value) =>
                    setForm({
                      ...form,
                      product: value,
                    })
                  }
                />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                  <FormInput
                    label="Quantity"
                    type="number"
                    value={form.quantity}
                    placeholder="e.g. 2"
                    onChange={(value) =>
                      setForm({
                        ...form,
                        quantity: value,
                      })
                    }
                  />

                  <FormInput
                    label="Price"
                    type="number"
                    value={form.price}
                    placeholder="e.g. 799"
                    onChange={(value) =>
                      setForm({
                        ...form,
                        price: value,
                      })
                    }
                  />

                </div>

                {form.quantity && form.price && (
                  <div className="rounded-xl bg-[#FFF8EC] p-4">

                    <div className="flex items-center justify-between">

                      <span className="text-sm text-[#8A5200]">
                        Bill Total
                      </span>

                      <span className="text-lg font-bold text-[#20252B]">
                        ₹
                        {(
                          Number(form.quantity) *
                          Number(form.price)
                        ).toLocaleString("en-IN")}
                      </span>

                    </div>

                  </div>
                )}

                {formError && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {formError}
                  </div>
                )}

              </div>

              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-xl border border-[#DDD7CE] px-5 py-2.5 text-sm font-semibold text-[#4F565D] hover:bg-[#F5F1EB]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-[#D97706] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#B85F05]"
                >
                  Create Bill
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}

function SummaryCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-[#E2DDD5] bg-white p-5 shadow-sm">
      <p className="text-sm text-[#737B84]">
        {title}
      </p>

      <p className="mt-2 text-2xl font-bold text-[#20252B]">
        {value}
      </p>
    </div>
  );
}

function TableHeading({
  text,
}: {
  text: string;
}) {
  return (
    <th className="px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-[#737B84]">
      {text}
    </th>
  );
}

function FormInput({
  label,
  value,
  placeholder,
  type = "text",
  onChange,
}: {
  label: string;
  value: string;
  placeholder: string;
  type?: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>

      <label className="mb-2 block text-sm font-medium text-[#4F565D]">
        {label}
      </label>

      <input
        type={type}
        min={type === "number" ? "0" : undefined}
        step={type === "number" ? "any" : undefined}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        className="h-11 w-full rounded-xl border border-[#DDD7CE] bg-[#FAF9F7] px-4 text-sm outline-none focus:border-[#D97706] focus:bg-white focus:ring-4 focus:ring-[#FDECCF]"
      />

    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: "Paid" | "Pending";
}) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
        status === "Paid"
          ? "bg-emerald-50 text-emerald-600"
          : "bg-amber-50 text-amber-600"
      }`}
    >
      {status}
    </span>
  );
}

export default Billing;