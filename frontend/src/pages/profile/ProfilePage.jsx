import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import SectionHeader from '@/components/common/SectionHeader';
import FormInput from '@/components/forms/FormInput';
import { useUser } from '@/context/UserContext';

export default function ProfilePage() {
  const { profile, refreshProfile, updateProfile } = useUser();
  const [form, setForm] = useState({ fullName: '', email: '', phoneNumber: '' });

  useEffect(() => {
    if (!profile) return;
    setForm({
      fullName: profile.fullName || profile.name || '',
      email: profile.email || '',
      phoneNumber: profile.phoneNumber || profile.phone_number || '',
    });
  }, [profile]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateProfile(form);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Account"
        title="User Profile"
        description="Review and update your personal information, contact details, and account identity."
      />

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="dashboard-card p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-100 text-2xl font-bold text-brand-700">
              {(form.fullName || 'S').slice(0, 1)}
            </div>
            <div>
              <h3 className="font-display text-2xl font-bold text-slate-900">{form.fullName || 'Profile'}</h3>
              <p className="text-sm text-slate-500">{form.email}</p>
            </div>
          </div>
          <div className="mt-6 space-y-3 text-sm text-slate-600">
            <p><span className="font-semibold text-slate-900">Role:</span> {profile?.role?.roleCode || profile?.role || 'USER'}</p>
            <p><span className="font-semibold text-slate-900">Email:</span> {form.email || '-'}</p>
            <p><span className="font-semibold text-slate-900">Phone:</span> {form.phoneNumber || '-'}</p>
          </div>
          <button onClick={refreshProfile} className="btn-secondary mt-6">
            Refresh Profile
          </button>
        </div>

        <form onSubmit={handleSubmit} className="dashboard-card space-y-5 p-6">
          <FormInput label="Full Name" value={form.fullName} onChange={(event) => setForm((current) => ({ ...current, fullName: event.target.value }))} />
          <FormInput label="Email" type="email" value={form.email} onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))} />
          <FormInput label="Phone Number" value={form.phoneNumber} onChange={(event) => setForm((current) => ({ ...current, phoneNumber: event.target.value }))} />
          <button type="submit" className="btn-primary">Save Changes</button>
        </form>
      </div>
    </div>
  );
}
