import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Save, BookOpen } from 'lucide-react';
import SectionHeader from '@/components/common/SectionHeader';
import FormInput from '@/components/forms/FormInput';
import FormSelect from '@/components/forms/FormSelect';

const categories = [
  { value: 'Technology', label: 'Technology' },
  { value: 'Fiction', label: 'Fiction' },
  { value: 'Business', label: 'Business' },
];

export default function BookFormPage({ mode }) {
  const navigate = useNavigate();
  const params = useParams();
  const [loading, setLoading] = useState(mode === 'edit');
  const [form, setForm] = useState({
    title: '',
    isbn: '',
    author: '',
    category: 'Technology',
    quantity: 1,
    availability: 1,
  });

  useEffect(() => {
    if (mode !== 'edit') return;
    setLoading(true);
    const seed = {
      title: 'Clean Code',
      isbn: '9780132350884',
      author: 'Robert Martin',
      category: 'Technology',
      quantity: 5,
      availability: 4,
    };
    setForm(seed);
    setLoading(false);
  }, [mode, params.bookId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: name === 'quantity' || name === 'availability' ? Number(value) : value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    toast.success(mode === 'edit' ? 'Book updated locally' : 'Book created locally');
    navigate('/books');
  };

  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Inventory"
        title={mode === 'edit' ? 'Edit Book' : 'Add Book'}
        description="Capture the bibliographic and stock details required for circulation and reporting."
      />

      <form onSubmit={handleSubmit} className="dashboard-card space-y-5 p-6">
        <div className="grid gap-5 md:grid-cols-2">
          <FormInput label="Title" name="title" value={form.title} onChange={handleChange} required />
          <FormInput label="ISBN" name="isbn" value={form.isbn} onChange={handleChange} required />
          <FormInput label="Author" name="author" value={form.author} onChange={handleChange} required />
          <FormSelect
            label="Category"
            name="category"
            value={form.category}
            onChange={handleChange}
            options={categories}
          />
          <FormInput label="Quantity" type="number" name="quantity" value={form.quantity} onChange={handleChange} min="0" required />
          <FormInput label="Available Copies" type="number" name="availability" value={form.availability} onChange={handleChange} min="0" required />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button type="submit" className="btn-primary">
            <Save size={16} />
            {mode === 'edit' ? 'Update Book' : 'Save Book'}
          </button>
          <button type="button" onClick={() => navigate('/books')} className="btn-secondary">
            <BookOpen size={16} />
            Back to Books
          </button>
        </div>
        {loading ? <p className="text-sm text-slate-500">Loading book details...</p> : null}
      </form>
    </div>
  );
}
