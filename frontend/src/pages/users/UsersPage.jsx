import { useMemo, useState } from 'react';
import { Trash2, Pencil } from 'lucide-react';
import toast from 'react-hot-toast';
import SectionHeader from '@/components/common/SectionHeader';
import SearchBar from '@/components/common/SearchBar';
import DataTable from '@/components/tables/DataTable';
import StatusBadge from '@/components/common/StatusBadge';
import useDebounce from '@/hooks/useDebounce';

const seedUsers = [
  { id: 1, name: 'System Admin', email: 'admin@library.local', role: 'ADMIN', status: 'ACTIVE' },
  { id: 2, name: 'Aarav Sharma', email: 'aarav.sharma@example.com', role: 'USER', status: 'ACTIVE' },
  { id: 3, name: 'Meera Iyer', email: 'meera.iyer@example.com', role: 'USER', status: 'ACTIVE' },
];

export default function UsersPage() {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState(seedUsers);
  const debouncedQuery = useDebounce(query, 250);

  const filteredUsers = useMemo(() => {
    const search = debouncedQuery.toLowerCase();
    return users.filter((user) => [user.name, user.email, user.role, user.status].some((value) => value.toLowerCase().includes(search)));
  }, [debouncedQuery, users]);

  const columns = [
    { key: 'name', title: 'Name' },
    { key: 'email', title: 'Email' },
    { key: 'role', title: 'Role' },
    { key: 'status', title: 'Status', render: (row) => <StatusBadge value={row.status} /> },
    {
      key: 'actions',
      title: 'Actions',
      render: (row) => (
        <div className="flex items-center gap-2">
          <button className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50">
            <Pencil size={16} />
          </button>
          <button
            onClick={() => {
              setUsers((current) => current.filter((item) => item.id !== row.id));
              toast.success('User deleted locally');
            }}
            className="rounded-lg border border-rose-200 p-2 text-rose-600 hover:bg-rose-50"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Administration"
        title="Users Management"
        description="Search, view, update, and remove user accounts with role-aware controls."
        actions={<SearchBar value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search users..." />}
      />
      <DataTable columns={columns} data={filteredUsers} emptyMessage="No users match the current search." />
    </div>
  );
}
