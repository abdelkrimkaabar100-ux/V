import { City } from './types';

export const moroccoCities: City[] = [
  { id: 'casablanca', name: { ar: 'الدار البيضاء', es: 'Casablanca' }, country: 'MA', avgPricePerMeter: 8500 },
  { id: 'rabat', name: { ar: 'الرباط', es: 'Rabat' }, country: 'MA', avgPricePerMeter: 9200 },
  { id: 'marrakech', name: { ar: 'مراكش', es: 'Marrakech' }, country: 'MA', avgPricePerMeter: 7500 },
  { id: 'fes', name: { ar: 'فاس', es: 'Fes' }, country: 'MA', avgPricePerMeter: 6200 },
  { id: 'tangier', name: { ar: 'طنجة', es: 'Tangier' }, country: 'MA', avgPricePerMeter: 7800 },
  { id: 'agadir', name: { ar: 'أغادير', es: 'Agadir' }, country: 'MA', avgPricePerMeter: 6800 },
];

export const spainCities: City[] = [
  { id: 'madrid', name: { ar: 'مدريد', es: 'Madrid' }, country: 'ES', avgPricePerMeter: 4500 },
  { id: 'barcelona', name: { ar: 'برشلونة', es: 'Barcelona' }, country: 'ES', avgPricePerMeter: 5200 },
  { id: 'valencia', name: { ar: 'فالنسيا', es: 'Valencia' }, country: 'ES', avgPricePerMeter: 3200 },
  { id: 'seville', name: { ar: 'إشبيلية', es: 'Sevilla' }, country: 'ES', avgPricePerMeter: 2800 },
  { id: 'malaga', name: { ar: 'مالقة', es: 'Malaga' }, country: 'ES', avgPricePerMeter: 3500 },
  { id: 'bilbao', name: { ar: 'بيلباو', es: 'Bilbao' }, country: 'ES', avgPricePerMeter: 3800 },
];

export const allCities = [...moroccoCities, ...spainCities];

export function getCityById(id: string): City | undefined {
  return allCities.find(c => c.id === id);
}