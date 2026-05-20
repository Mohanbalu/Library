import SectionHeader from '@/components/common/SectionHeader';
import DataTable from '@/components/tables/DataTable';
import StatusBadge from '@/components/common/StatusBadge';
import { currency, dateTime } from '@/utils/formatters';

const transactions = [
  { id: 1, reference: 'TXN-ISSUE-0001', type: 'ISSUE', user: 'Aarav Sharma', amount: 0, date: '2026-05-01T10:00:00Z', status: 'SUCCESS' },
  { id: 2, reference: 'TXN-RETURN-0001', type: 'RETURN', user: 'Aarav Sharma', amount: 0, date: '2026-05-12T15:30:00Z', status: 'SUCCESS' },
  { id: 3, reference: 'TXN-FINE-0001', type: 'FINE_PAYMENT', user: 'Aarav Sharma', amount: 20, date: '2026-05-12T16:00:00Z', status: 'SUCCESS' },
];

export default function TransactionsPage() {
  const columns = [
    { key: 'reference', title: 'Reference' },
    { key: 'type', title: 'Type' },
    { key: 'user', title: 'User' },
    { key: 'amount', title: 'Amount', render: (row) => currency(row.amount) },
    { key: 'date', title: 'Date', render: (row) => dateTime(row.date) },
    { key: 'status', title: 'Status', render: (row) => <StatusBadge value={row.status} /> },
  ];

  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Audit Trail"
        title="Transactions"
        description="Permanent circulation and payment history for all issue, return, and fine operations."
      />
      <DataTable columns={columns} data={transactions} />
    </div>
  );
}
