import { useState } from 'react';
import toast from 'react-hot-toast';
import SectionHeader from '@/components/common/SectionHeader';
import DataTable from '@/components/tables/DataTable';
import StatusBadge from '@/components/common/StatusBadge';
import { currency, dateTime } from '@/utils/formatters';

const seedFines = [
  { id: 1, ref: 'FINE-2026-0001', user: 'Aarav Sharma', amount: 20, status: 'PAID', assessedAt: '2026-05-12T15:35:00Z' },
  { id: 2, ref: 'FINE-2026-0002', user: 'Meera Iyer', amount: 35, status: 'PENDING', assessedAt: '2026-05-18T12:10:00Z' },
];

export default function FinesPage() {
  const [fines, setFines] = useState(seedFines);

  const columns = [
    { key: 'ref', title: 'Reference' },
    { key: 'user', title: 'User' },
    { key: 'amount', title: 'Amount', render: (row) => currency(row.amount) },
    { key: 'status', title: 'Status', render: (row) => <StatusBadge value={row.status} /> },
    { key: 'assessedAt', title: 'Assessed At', render: (row) => dateTime(row.assessedAt) },
    {
      key: 'actions',
      title: 'Actions',
      render: (row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => toast.success(`Marked ${row.ref} as collected locally`)}
            className="btn-secondary py-2"
          >
            Collect
          </button>
          <button
            onClick={() => {
              setFines((current) => current.filter((item) => item.id !== row.id));
              toast.success('Fine waived locally');
            }}
            className="rounded-xl border border-violet-200 bg-violet-50 px-3 py-2 text-sm font-semibold text-violet-700"
          >
            Waive
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Collections"
        title="Fine Management"
        description="Track overdue fines, collection status, and waiver actions with a clear finance-oriented view."
      />
      <DataTable columns={columns} data={fines} emptyMessage="No fines pending review." />
    </div>
  );
}
