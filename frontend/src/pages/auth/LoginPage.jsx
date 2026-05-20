import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { BookOpen, LockKeyhole, Mail } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import FormInput from '@/components/forms/FormInput';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      await login(form);
      const target = location.state?.from?.pathname || '/dashboard';
      navigate(target, { replace: true });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="mb-8 text-center lg:text-left">
        <div className="mx-auto inline-flex rounded-2xl bg-brand-50 p-3 text-brand-700 lg:mx-0">
          <BookOpen size={22} />
        </div>
        <h2 className="mt-5 font-display text-3xl font-bold text-slate-900">Welcome back</h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Sign in to manage books, issue flows, users, and fine operations.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
        <FormInput
          label="Email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="admin@library.local"
          icon={<Mail size={16} />}
          required
        />
        <FormInput
          label="Password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="••••••••"
          icon={<LockKeyhole size={16} />}
          required
        />
        <button type="submit" disabled={submitting} className="btn-primary w-full">
          {submitting ? 'Signing in...' : 'Sign In'}
        </button>
        <p className="text-center text-sm text-slate-600">
          New to Smart Library?{' '}
          <Link to="/register" className="font-semibold text-brand-700 hover:underline">
            Create an account
          </Link>
        </p>
      </form>
    </div>
  );
}
