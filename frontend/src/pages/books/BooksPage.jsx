import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import SectionHeader from '@/components/common/SectionHeader';
import SearchBar from '@/components/common/SearchBar';
import DataTable from '@/components/tables/DataTable';
import StatusBadge from '@/components/common/StatusBadge';
import useDebounce from '@/hooks/useDebounce';

const seedBooks = [
  { id: 1, title: 'Clean Code', isbn: '9780132350884', author: 'Robert Martin', category: 'Technology', quantity: 5, available: 4, status: 'ACTIVE' },
  { id: 2, title: '1984', isbn: '9780451524935', author: 'George Orwell', category: 'Fiction', quantity: 3, available: 1, status: 'ACTIVE' },
  { id: 3, title: 'Zero to One', isbn: '9780062315007', author: 'Peter Thiel', category: 'Business', quantity: 4, available: 4, status: 'ACTIVE' },
];

export default function BooksPage() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState(seedBooks);
  const debouncedQuery = useDebounce(query, 250);

  const filteredBooks = useMemo(() => {
    const search = debouncedQuery.toLowerCase();
    return books.filter((book) =>
      [book.title, book.isbn, book.author, book.category].some((value) => value.toLowerCase().includes(search)),
    );
  }, [books, debouncedQuery]);

  const handleDelete = (id) => {
    setBooks((current) => current.filter((book) => book.id !== id));
    toast.success('Book deleted locally');
  };

  const columns = [
    { key: 'title', title: 'Title' },
    { key: 'isbn', title: 'ISBN' },
    { key: 'author', title: 'Author' },
    { key: 'category', title: 'Category' },
    { key: 'quantity', title: 'Quantity' },
    { key: 'available', title: 'Availability', render: (row) => `${row.available}/${row.quantity}` },
    { key: 'status', title: 'Status', render: (row) => <StatusBadge value={row.status} /> },
    {
      key: 'actions',
      title: 'Actions',
      render: (row) => (
        <div className="flex items-center gap-2">
          <Link to={`/books/${row.id}/edit`} className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50">
            <Pencil size={16} />
          </Link>
          <button onClick={() => handleDelete(row.id)} className="rounded-lg border border-rose-200 p-2 text-rose-600 hover:bg-rose-50">
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Catalog"
        title="Books Management"
        description="Manage library inventory, authors, category mapping, quantity, and availability from one clean interface."
        actions={[
          <SearchBar key="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search books..." />,
          <Link key="add" to="/books/new" className="btn-primary">
            <Plus size={16} />
            Add Book
          </Link>,
        ]}
      />

      <DataTable columns={columns} data={filteredBooks} emptyMessage="No books found for your search." />
    </div>
  );
}
