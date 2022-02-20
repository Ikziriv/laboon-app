import type { TemperatureInfo } from '../models';

export const temperatureConverter = (valNum: string): TemperatureInfo => {
	const val = parseFloat(valNum);
	const celsius = val - 273;
	const fahrenheit = Math.floor(celsius * (9 / 5) + 32);
	return { celsius: Math.round(celsius).toFixed(2), fahrenheit: Math.round(fahrenheit).toFixed(2) };
};