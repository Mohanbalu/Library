import DataTable from '@/components/tables/DataTable';
import { dateTime, currency } from '@/utils/formatters';

export default function RecentTransactionsTable({ data }) {
  const columns = [
    { key: 'reference', title: 'Reference' },
    { key: 'type', title: 'Type' },
    { key: 'user', title: 'User' },
    { key: 'amount', title: 'Amount', render: (row) => currency(row.amount) },
    { key: 'date', title: 'Date', render: (row) => dateTime(row.date) },
    { key: 'status', title: 'Status' },
  ];

  return <DataTable columns={columns} data={data} emptyMessage="No recent transactions found." />;
}
