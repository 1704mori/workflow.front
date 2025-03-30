import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="w-full max-w-4xl text-center space-y-12">
        <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
          Visual Workflow Builder
        </h1>
        
        <p className="mx-auto max-w-2xl text-xl text-slate-600">
          Create, manage, and execute automated workflows with our intuitive visual editor.
          Connect nodes, transform data, and streamline your processes.
        </p>
        
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link href="/auth/login">
            <Button size="lg" className="font-semibold">
              Login
            </Button>
          </Link>
          <Link href="/auth/register">
            <Button variant="outline" size="lg" className="font-semibold">
              Register
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}