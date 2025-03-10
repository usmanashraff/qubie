import AuthCallbackClient from '@/components/AuthCallbackClient';
import { Suspense } from 'react';
// Make sure to import the client component.
export const dynamic = 'force-dynamic'; // Ensure this page is rendered at runtime

export default function page() {
  return (
    <Suspense fallback={<div>Loading authentication...</div>}>
      <AuthCallbackClient />
    </Suspense>
  );
}


