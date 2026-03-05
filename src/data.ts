export interface SafeZone {
  id: string;
  name: string;
  lat: number;
  lng: number;
  capacity: 'Safe/Available' | 'Full';
  description: string;
}

export interface LandslideZone {
  id: string;
  name: string;
  coordinates: [number, number][];
}

export interface EarthquakeMarker {
  id: string;
  lat: number;
  lng: number;
  magnitude: number;
  time: string;
}

export const BAGUIO_CENTER: [number, number] = [16.4023, 120.5960];

export const SAFE_ZONES: SafeZone[] = [
  {
    id: '1',
    name: 'Melvin Jones Grandstand',
    lat: 16.4116,
    lng: 120.5947,
    capacity: 'Safe/Available',
    description: 'Open field area, primary evacuation site.'
  },
  {
    id: '2',
    name: 'UC Gymnasium',
    lat: 16.4145,
    lng: 120.5992,
    capacity: 'Safe/Available',
    description: 'Indoor facility, high capacity.'
  },
  {
    id: '3',
    name: 'Wright Park',
    lat: 16.4162,
    lng: 120.6135,
    capacity: 'Full',
    description: 'Open park area, currently at capacity.'
  },
  {
    id: '4',
    name: 'Baguio City Hall Grounds',
    lat: 16.4132,
    lng: 120.5905,
    capacity: 'Safe/Available',
    description: 'Government center evacuation point.'
  },
  {
    id: '5',
    name: 'PMA Parade Ground',
    lat: 16.3785,
    lng: 120.6225,
    capacity: 'Safe/Available',
    description: 'Large open field, southern Baguio.'
  }
];

export const LANDSLIDE_ZONES: LandslideZone[] = [
  {
    id: 'lz1',
    name: 'Kennon Road Slopes',
    coordinates: [
      [16.385, 120.585],
      [16.390, 120.595],
      [16.380, 120.605],
      [16.375, 120.590]
    ]
  },
  {
    id: 'lz2',
    name: 'Irisan High-Risk Area',
    coordinates: [
      [16.415, 120.555],
      [16.425, 120.565],
      [16.420, 120.575],
      [16.410, 120.560]
    ]
  },
  {
    id: 'lz3',
    name: 'Quirino Hill Steep Slopes',
    coordinates: [
      [16.425, 120.595],
      [16.435, 120.605],
      [16.430, 120.615],
      [16.420, 120.600]
    ]
  }
];

export const EARTHQUAKE_MARKERS: EarthquakeMarker[] = [
  {
    id: 'eq1',
    lat: 16.405,
    lng: 120.610,
    magnitude: 3.2,
    time: '2 hours ago'
  },
  {
    id: 'eq2',
    lat: 16.395,
    lng: 120.580,
    magnitude: 2.8,
    time: '5 hours ago'
  }
];
