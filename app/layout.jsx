import './globals.css';
import MetaBar from '@/components/MetaBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'MIN-GEO-AI | National Manganese Mineral Intelligence Platform',
  description: 'Sovereign Earth observation and predictive machine learning system for high-resolution manganese prospectivity mapping under UNFC-1997 guidelines. Ministry of Mines & Geological Survey of India.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link 
          rel="stylesheet" 
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" 
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" 
          crossOrigin=""
        />
      </head>
      <body>
        <MetaBar />
        <Navbar />
        <main style={{ flex: 1 }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
