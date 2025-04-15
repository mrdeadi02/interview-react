import { useState } from 'react';
import GuestForm from './sections/guest-form';
import MealSchedule from './sections/meal-schedule';

function App() {
	const [refreshKey, setRefreshKey] = useState(0);

	const handleGuestAdded = () => {
		setRefreshKey((prev) => prev + 1);
	};

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="container mx-auto max-w-5xl px-4 py-12">
				<GuestForm onGuestAdded={handleGuestAdded} />
				<MealSchedule key={refreshKey} />
			</div>
		</div>
	);
}

export default App;
