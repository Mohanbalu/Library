import { useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { CalendarClock, ScanSearch, Send } from 'lucide-react';
import SectionHeader from '@/components/common/SectionHeader';
import FormInput from '@/components/forms/FormInput';
import FormSelect from '@/components/forms/FormSelect';
import { currency, dateOnly } from '@/utils/formatters';

const users = [
  { value: '2', label: 'Aarav Sharma' },
  { value: '3', label: 'Meera Iyer' },
];

const books = [
  { value: '1', label: 'Clean Code' },
  { value: '2', label: '1984' },
];

export default function IssueBookPage() {
  const [form, setForm] = useState({ userId: '2', bookId: '1', dueDate: '2026-05-30' });

  const projectedFine = useMemo(() => 0, [form]);

  const handleSubmit = (event) => {
    event.preventDefault();
    toast.success('Issue request prepared locally');
  };

  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Circulation"
        title="Issue Book"
        description="Assign a physical copy to a user, set the due date, and keep the circulation workflow fast and visible."
      />

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <form onSubmit={handleSubmit} className="dashboard-card space-y-5 p-6">
          <div className="grid gap-5 md:grid-cols-2">
            <FormSelect
              label="User"
              name="userId"
              value={form.userId}
              onChange={(event) => setForm((current) => ({ ...current, userId: event.target.value }))}
              options={users}
            />
            <FormSelect
              label="Book"
              name="bookId"
              value={form.bookId}
              onChange={(event) => setForm((current) => ({ ...current, bookId: event.target.value }))}
              options={books}
            />
            <FormInput
              label="Due Date"
              type="date"
              name="dueDate"
              value={form.dueDate}
              onChange={(event) => setForm((current) => ({ ...current, dueDate: event.target.value }))}
            />
            <FormInput label="Issue Date" value={dateOnly(new Date())} disabled />
          </div>
          <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
            <p className="font-semibold text-slate-900">Issue Policy</p>
            <p className="mt-2">A default due date is recommended for every issue. Overdue returns will generate a fine automatically.</p>
          </div>
          <button type="submit" className="btn-primary">
            <Send size={16} />
            Confirm Issue
          </button>
        </form>

        <aside className="space-y-4 rounded-3xl bg-gradient-to-br from-brand-600 to-emerald-500 p-6 text-white shadow-soft">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm/6 text-white/75">Quick Preview</p>
              <h3 className="mt-1 font-display text-2xl font-bold">Issue Summary</h3>
            </div>
            <ScanSearch />
          </div>
          <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
            <p className="text-sm text-white/75">Selected User</p>
            <p className="mt-1 text-lg font-semibold">Aarav Sharma</p>
          </div>
          <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
            <p className="text-sm text-white/75">Selected Book</p>
            <p className="mt-1 text-lg font-semibold">Clean Code</p>
          </div>
          <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
            <p className="text-sm text-white/75">Expected Fine</p>
            <p className="mt-1 text-lg font-semibold">{currency(projectedFine)}</p>
          </div>
          <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
            <p className="text-sm text-white/75">Due Date</p>
            <p className="mt-1 flex items-center gap-2 text-lg font-semibold">
              <CalendarClock size={18} />
              {form.dueDate}
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
