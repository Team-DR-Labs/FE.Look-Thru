'use client';

import { useEffect } from 'react';
import '../lib/mixpanel'; // Import to initialize Mixpanel

const MixpanelProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    // The mixpanel library is initialized when imported.
    // This component ensures it's done on the client side.
  }, []);

  return <>{children}</>;
};

export default MixpanelProvider;
