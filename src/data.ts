export interface SafeZone {
  id: string;
  name: string;
  lat: number;
  lng: number;
  capacity: 'Safe/Available' | 'Full';
  description: string;
  boundary?: [number, number][];
}

export interface LandslideZone {
  id: string;
  name: string;
  coordinates: [number, number][];
}

export interface EmergencyRoute {
  id: string;
  name: string;
  path: [number, number][];
}

export interface EmergencyContact {
  id: string;
  name: string;
  number: string;
  type: 'Police' | 'Medical' | 'Rescue' | 'Fire';
}

export const CAMP_7_CENTER: [number, number] = [16.38168, 120.60687];

export const SAFE_ZONES: SafeZone[] = [
  {
    id: '1',
    name: 'Camp 7 Barangay Hall',
    lat: 16.38168,
    lng: 120.60687,
    capacity: 'Safe/Available',
    description: 'Primary evacuation center and command post.',
    boundary: [
      [16.38188, 120.60667],
      [16.38188, 120.60707],
      [16.38148, 120.60707],
      [16.38148, 120.60667]
    ]
  },
  {
    id: '3',
    name: 'Camp 7 National High School',
    lat: 16.38078,
    lng: 120.60552,
    capacity: 'Safe/Available',
    description: 'School grounds and buildings for temporary shelter.',
    boundary: [
      [16.38098, 120.60532],
      [16.38098, 120.60572],
      [16.38058, 120.60572],
      [16.38058, 120.60532]
    ]
  },
  {
    id: '4',
    name: 'Woodsgate Open Space',
    lat: 16.3861,
    lng: 120.6052,
    capacity: 'Safe/Available',
    description: 'Open field suitable for tents and temporary evacuation.',
    boundary: [
      [16.3863, 120.6050],
      [16.3863, 120.6054],
      [16.3859, 120.6054],
      [16.3859, 120.6050]
    ]
  },
  {
    id: '5',
    name: 'Eagle Crest Park',
    lat: 16.3905,
    lng: 120.6012,
    capacity: 'Safe/Available',
    description: 'Community park designated as a safe assembly area.',
    boundary: [
      [16.3907, 120.6010],
      [16.3907, 120.6014],
      [16.3903, 120.6014],
      [16.3903, 120.6010]
    ]
  }
];

export const LANDSLIDE_ZONES: LandslideZone[] = [
  {
    id: 'lz1',
    name: 'Kennon Road Steep Curve',
    coordinates: [
      [16.3791, 120.6110],
      [16.3791, 120.6060],
      [16.3591, 120.6050],
      [16.3591, 120.6100]
    ]
  },
  {
    id: 'fz1',
    name: 'Flood Risk Zone',
    coordinates: [
      [16.38573, 120.60155],
      [16.38498, 120.60055],
      [16.38098, 120.60355],
      [16.38173, 120.60455]
    ]
  }
];

export const EMERGENCY_ROUTES: EmergencyRoute[] = [
  {
    id: 'er1',
    name: 'Kennon Road to Barangay Hall',
    path: [
      [16.3791, 120.6085],
      [16.3840, 120.6050],
      [16.38168, 120.60687]
    ]
  }
];

export const EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    id: 'c1',
    name: 'Baguio City Police Office',
    number: '911 / (074) 442-1211',
    type: 'Police'
  },
  {
    id: 'c2',
    name: 'Baguio CDRRMO (Rescue)',
    number: '(074) 442-1900 / 0927-628-0498',
    type: 'Rescue'
  },
  {
    id: 'c3',
    name: 'Baguio General Hospital (ER)',
    number: '(074) 442-4234',
    type: 'Medical'
  },
  {
    id: 'c4',
    name: 'Baguio Fire Station',
    number: '(074) 442-2222',
    type: 'Fire'
  },
  {
    id: 'c5',
    name: 'Philippine Red Cross Baguio',
    number: '(074) 442-4036',
    type: 'Medical'
  }
];
