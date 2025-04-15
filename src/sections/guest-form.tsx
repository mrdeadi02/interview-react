import { useState, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DatePicker } from '@/components/ui/date-picker';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';

type GuestFormProps = {
	onGuestAdded?: () => void;
};

export default function GuestForm({onGuestAdded}: GuestFormProps) {
	const [name, setName] = useState('');
	const [startDate, setStartDate] = useState<Date | undefined>();
	const [endDate, setEndDate] = useState<Date | undefined>();

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();

		if(!name || !startDate || !endDate) return;

		const guest = {
			id: uuidv4(),
			name,
			startDate: format(startDate, 'yyyy-MM-dd'),
			endDate: format(endDate, 'yyyy-MM-dd'),
		};

		try {
			await fetch('http://localhost:3001/guests', {
				method: 'POST',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify(guest),
			});

			setName('');
			setStartDate(undefined);
			setEndDate(undefined);

			onGuestAdded?.();
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="mx-auto mt-8 w-full">
			<form className="space-y-6" onSubmit={handleSubmit}>
				<div className="flex flex-wrap gap-4">
					<Input
						type="text"
						placeholder="Guest Name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						data-test-id="name-input"
						required
						className="flex-1"
					/>
					<DatePicker
						date={startDate}
						onDateChange={(date) => date && setStartDate(date)}
						placeholder="Start Date"
						className="flex-1"
						data-test-id="start-date-input"
					/>
					<DatePicker
						date={endDate}
						onDateChange={(date) => date && setEndDate(date)}
						placeholder="End Date"
						className="flex-1"
						data-test-id="end-date-input"
					/>
				</div>
				<div className="flex w-full justify-center">
					<Button type="submit" data-test-id="submit-button" className="w-1/2">
						Add to Menu
					</Button>
				</div>
			</form>
		</div>
	);
}
