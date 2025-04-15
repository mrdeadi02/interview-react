import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { eachDayOfInterval, format } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const getDatesInRange = (start: string, end: string): string[] => {
	return eachDayOfInterval({
		start: new Date(start),
		end: new Date(end),
	}).map((date) => format(date, 'yyyy-MM-dd'));
};
