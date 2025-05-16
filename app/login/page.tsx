// app/login/page.tsx
import LoginForm from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gold mb-8">Login</h1>
      <LoginForm />
    </div>
  );
}