import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { useEffect, useState } from 'react';
import { Guest } from '@/types/Guest.ts';
import { ScheduleMap } from '@/types/ScheduleMap.ts';
import { getDatesInRange } from '@/lib/utils.ts';

export default function MealSchedule() {
	const [schedule, setSchedule] = useState<ScheduleMap>({});

	useEffect(()=> {
		fetchGuests().catch(console.error);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const fetchGuests = async () => {
		const res = await fetch('http://localhost:3001/guests');
		const data: Guest[] = await res.json();
		generateSchedule(data);
	};

	const generateSchedule = (guests: Guest[]) => {
		const schedule = guests
			.flatMap((guest) =>
				getDatesInRange(guest.startDate, guest.endDate).map((date) => ({
					date,
					name: guest.name,
				}))
			)
			.reduce<ScheduleMap>((acc, { date, name }) => {
				if (!acc[date]) acc[date] = [];
				acc[date].push(name);
				return acc;
			}, {});
		setSchedule(schedule);
	};

	const sortedDates = Object.keys(schedule).sort();

	return (
		<div className="mx-auto mt-10 w-full overflow-hidden rounded-lg border border-gray-200 shadow-lg">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="font-bold">Date</TableHead>
						<TableHead className="font-bold">Breakfast</TableHead>
						<TableHead className="font-bold">Lunch</TableHead>
						<TableHead className="font-bold">Dinner</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{sortedDates.map((date) => (
						<TableRow key={date}>
							<TableCell data-test-id={`date-${date}`}>{date}</TableCell>
							{['breakfast', 'lunch', 'dinner'].map((meal) => (
								<TableCell
									key={meal}
									data-test-id={`${meal}-cell-${date}`}
								>
									<ul data-test-id={`${meal}-list-${date}`}>
										{schedule[date].map((name, i) => (
											<li key={i}>{name}</li>
										))}
									</ul>
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
