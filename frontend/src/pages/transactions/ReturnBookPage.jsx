import { useState } from 'react';
import toast from 'react-hot-toast';
import { RotateCcw, ReceiptText } from 'lucide-react';
import SectionHeader from '@/components/common/SectionHeader';
import FormInput from '@/components/forms/FormInput';
import FormSelect from '@/components/forms/FormSelect';
import { currency } from '@/utils/formatters';

const activeIssues = [
  { value: '1', label: 'ISSUE-2026-0001 - Aarav Sharma - Clean Code' },
  { value: '2', label: 'ISSUE-2026-0002 - Meera Iyer - 1984' },
];

export default function ReturnBookPage() {
  const [form, setForm] = useState({ issueId: '1', returnDate: '2026-05-12', remarks: '' });
  const fine = 20;

  const handleSubmit = (event) => {
    event.preventDefault();
    toast.success('Return request prepared locally');
  };

  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Circulation"
        title="Return Book"
        description="Capture returned books, calculate fines, and complete the return workflow with a clear summary."
      />

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <form onSubmit={handleSubmit} className="dashboard-card space-y-5 p-6">
          <FormSelect
            label="Issued Record"
            name="issueId"
            value={form.issueId}
            onChange={(event) => setForm((current) => ({ ...current, issueId: event.target.value }))}
            options={activeIssues}
          />
          <div className="grid gap-5 md:grid-cols-2">
            <FormInput
              label="Return Date"
              type="date"
              name="returnDate"
              value={form.returnDate}
              onChange={(event) => setForm((current) => ({ ...current, returnDate: event.target.value }))}
            />
            <FormInput label="Fine Amount" value={currency(fine)} disabled />
          </div>
          <label className="block">
            <span className="label-field">Remarks</span>
            <textarea
              className="input-field min-h-32"
              name="remarks"
              value={form.remarks}
              onChange={(event) => setForm((current) => ({ ...current, remarks: event.target.value }))}
              placeholder="Optional return remarks"
            />
          </label>
          <button type="submit" className="btn-primary">
            <RotateCcw size={16} />
            Complete Return
          </button>
        </form>

        <aside className="dashboard-card p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-brand-50 p-3 text-brand-700">
              <ReceiptText />
            </div>
            <div>
              <p className="text-sm text-slate-500">Fine Preview</p>
              <h3 className="font-display text-2xl font-bold text-slate-900">{currency(fine)}</h3>
            </div>
          </div>
          <div className="mt-5 space-y-4 text-sm text-slate-600">
            <p>Use the issue record to determine return status and generate a fine if the due date has passed.</p>
            <p>The return transaction should be stored permanently for reporting and audit trails.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
