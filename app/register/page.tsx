// app/register/page.tsx
import RegisterForm from '@/components/auth/RegisterForm';

export default function RegisterPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gold mb-8">Register</h1>
      <RegisterForm />
    </div>
  );
}