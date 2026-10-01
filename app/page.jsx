'use client';

import React from 'react';
import HorizontalDeck from '@/components/HorizontalDeck';

export default function HomePage() {
  return (
    <div style={{ width: '100%', height: 'calc(100vh - 92px)', background: 'var(--bg-deep)', overflow: 'hidden' }}>
      <HorizontalDeck />
    </div>
  );
}
