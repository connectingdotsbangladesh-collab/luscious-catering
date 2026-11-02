import { fetchMenuItems, fetchCateringPackages } from '../lib/firebase/firestoreService';
import { HomeClientView } from '../components/home/HomeClientView';

// Revalidate data periodically (Incremental Static Regeneration / SSR)
export const revalidate = 60;

export default async function HomePage() {
  // Server-Side Rendering (SSR) data fetching
  const [menuItems, packages] = await Promise.all([
    fetchMenuItems(),
    fetchCateringPackages(),
  ]);

  return (
    <HomeClientView
      initialMenuItems={menuItems}
      initialPackages={packages}
    />
  );
}
