import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { UserPlus, Mail, LockKeyhole, User } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import FormInput from '@/components/forms/FormInput';
import FormSelect from '@/components/forms/FormSelect';
import { ROLES } from '@/utils/constants';

export default function RegisterPage() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: ROLES.USER,
  });
  const [submitting, setSubmitting] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (form.password !== form.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    setSubmitting(true);
    try {
      await register(form);
      navigate('/dashboard', { replace: true });
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
          <UserPlus size={22} />
        </div>
        <h2 className="mt-5 font-display text-3xl font-bold text-slate-900">Create account</h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Register as a student or admin user for the Smart Library platform.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
        <FormInput
          label="Full Name"
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          placeholder="Your full name"
          icon={<User size={16} />}
          required
        />
        <FormInput
          label="Email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="name@example.com"
          icon={<Mail size={16} />}
          required
        />
        <FormSelect
          label="Role"
          name="role"
          value={form.role}
          onChange={handleChange}
          options={[
            { value: ROLES.USER, label: 'Student / User' },
            { value: ROLES.ADMIN, label: 'Admin' },
          ]}
        />
        <FormInput
          label="Password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Create a strong password"
          icon={<LockKeyhole size={16} />}
          required
        />
        <FormInput
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          placeholder="Repeat your password"
          icon={<LockKeyhole size={16} />}
          required
        />
        <button type="submit" disabled={submitting} className="btn-primary w-full">
          {submitting ? 'Creating account...' : 'Create Account'}
        </button>
        <p className="text-center text-sm text-slate-600">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-brand-700 hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}
