import { useAuth } from '../contexts/AuthContext';
import { useEffect, useState } from 'react';
import { searchServicios } from '../services/servicios';
import { getResenas, Resena } from '../services/resenas';
import ReviewCard from '../components/ReviewCard';

export default function ProviderReviewsPage() {
  const { userId } = useAuth();
  const [reviews, setReviews] = useState<Resena[]>([]);

  useEffect(() => {
    async function load() {
      if (!userId) return;
      const servicios = await searchServicios({ proveedorId: userId });
      const all: Resena[] = [];
      for (const s of servicios) {
        const r = await getResenas(s.id);
        all.push(...r);
      }
      setReviews(all);
    }
    load();
  }, [userId]);

  return (
    <div className="p-4 space-y-2">
      {reviews.map(r => (
        <ReviewCard key={r.id} resena={r} />
      ))}
    </div>
  );
}
