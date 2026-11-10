/**
 * Smart Traffic Tracker - Lucknow Metropolitan Telemetry Dataset
 * 
 * IMPORTANT ARCHITECTURAL NOTE:
 * All traffic metrics in this file represent realistic SIMULATED demonstration data.
 * Geographical coordinates are accurate, verified coordinates covering all major
 * zones of Lucknow (Hazratganj, Gomti Nagar, Charbagh, Alambagh, Chowk, Indira Nagar,
 * Shaheed Path, Trans-Gomti, and Airport Corridors).
 * Speeds, vehicle counts, and congestion levels are simulated for demonstration
 * and development of V1 monitoring capabilities.
 */

export const INITIAL_TRAFFIC_DATA = [
  {
    id: 'lko-01',
    name: 'Hazratganj Main Corridor & MG Marg',
    code: 'MG-MARG',
    zone: 'Central Lucknow / Hazratganj',
    // From Capital Cinema crossing past GPO to Mayfair and Vidhan Sabha Marg
    coordinates: [
      [26.8525, 80.9410],
      [26.8490, 80.9445],
      [26.8465, 80.9480],
      [26.8430, 80.9525]
    ],
    center: [26.8475, 80.9470],
    status: 'heavy',
    congestionLevel: 88,
    congestionLabel: 'Heavy Congestion',
    vehicleCount: 2350,
    averageSpeed: 11, // km/h
    speedLimit: 40, // km/h
    delayMinutes: 18,
    lengthKm: 2.1,
    incident: 'Shopper curb parking & pedestrian crossing density near GPO Chauraha',
    trend: 'worsening',
    lastReported: '1 min ago'
  },
  {
    id: 'lko-02',
    name: 'Amar Shaheed Path (Ekana to Kamta)',
    code: 'SH-PATH',
    zone: 'Shaheed Path / Gomti Nagar Ext',
    // Elevated bypass from Kanpur Rd via Ahimamau / Ekana Stadium towards Kamta
    coordinates: [
      [26.7880, 80.9250],
      [26.8040, 80.9750],
      [26.8220, 81.0020],
      [26.8580, 81.0210],
      [26.8720, 81.0250]
    ],
    center: [26.8220, 81.0020],
    status: 'low',
    congestionLevel: 25,
    congestionLabel: 'Free Flow',
    vehicleCount: 1680,
    averageSpeed: 72,
    speedLimit: 80,
    delayMinutes: 2,
    lengthKm: 12.8,
    incident: 'Expressway operating smoothly; minor slowdown near Kamta exit ramp',
    trend: 'stable',
    lastReported: '3 mins ago'
  },
  {
    id: 'lko-03',
    name: 'Lohia Path (1090 Chauraha to Wave Mall)',
    code: 'LOHIA-PATH',
    zone: 'Gomti Nagar / Vibhuti Khand',
    // 6-lane arterial from 1090 Women Power Line intersection through Indira Gandhi Pratishthan
    coordinates: [
      [26.8520, 80.9630],
      [26.8560, 80.9800],
      [26.8590, 80.9950],
      [26.8620, 81.0120]
    ],
    center: [26.8575, 80.9875],
    status: 'moderate',
    congestionLevel: 64,
    congestionLabel: 'Moderate Flow',
    vehicleCount: 2120,
    averageSpeed: 32,
    speedLimit: 60,
    delayMinutes: 7,
    lengthKm: 5.2,
    incident: 'Evening corporate commute surge exiting Vibhuti Khand cyber hub',
    trend: 'improving',
    lastReported: '2 mins ago'
  },
  {
    id: 'lko-04',
    name: 'Charbagh Railway Station & Kanpur Road Junction',
    code: 'NH 27 / CBG',
    zone: 'Charbagh / Hussainganj',
    // Surrounding Lucknow Junction, Charbagh Metro, and Hussainganj approach
    coordinates: [
      [26.8280, 80.9200],
      [26.8320, 80.9230],
      [26.8380, 80.9280],
      [26.8430, 80.9320]
    ],
    center: [26.8340, 80.9250],
    status: 'heavy',
    congestionLevel: 95,
    congestionLabel: 'Severe Bottleneck',
    vehicleCount: 3100,
    averageSpeed: 7,
    speedLimit: 35,
    delayMinutes: 29,
    lengthKm: 2.3,
    incident: 'Auto/e-rickshaw clusters outside Charbagh Station & intercity bus arrivals',
    trend: 'worsening',
    lastReported: 'Just now'
  },
  {
    id: 'lko-05',
    name: 'Polytechnic Chauraha & Faizabad Road',
    code: 'NH 27 / FZD',
    zone: 'Indira Nagar / Polytechnic',
    // Critical trans-Gomti nexus connecting Ring Road, Faizabad Highway & Munshipulia
    coordinates: [
      [26.8680, 80.9850],
      [26.8720, 81.0020],
      [26.8750, 81.0200],
      [26.8810, 81.0450]
    ],
    center: [26.8735, 81.0110],
    status: 'heavy',
    congestionLevel: 91,
    congestionLabel: 'Severe Congestion',
    vehicleCount: 2890,
    averageSpeed: 9,
    speedLimit: 50,
    delayMinutes: 25,
    lengthKm: 6.1,
    incident: 'High-density multi-arm intersection merge and Ayodhya highway traffic',
    trend: 'worsening',
    lastReported: '4 mins ago'
  },
  {
    id: 'lko-06',
    name: 'Chowk & Old Lucknow Heritage Spine',
    code: 'HERITAGE-01',
    zone: 'Old Lucknow / Chowk',
    // KGMU, Medical College Chauraha, Rumi Darwaza, Bada Imambara
    coordinates: [
      [26.8640, 80.9080],
      [26.8680, 80.9130],
      [26.8710, 80.9160],
      [26.8720, 80.9220]
    ],
    center: [26.8685, 80.9145],
    status: 'heavy',
    congestionLevel: 87,
    congestionLabel: 'Heavy Congestion',
    vehicleCount: 1950,
    averageSpeed: 10,
    speedLimit: 30,
    delayMinutes: 19,
    lengthKm: 1.8,
    incident: 'Dense market lane traffic, e-rickshaws, and hospital ambulance arrivals',
    trend: 'stable',
    lastReported: '6 mins ago'
  },
  {
    id: 'lko-07',
    name: 'Alambagh – Airport Highway (Kanpur Road)',
    code: 'NH 27 / AIR',
    zone: 'Alambagh / Amausi',
    // From Alambagh Bus Terminal beneath Metro line to CCS International Airport
    coordinates: [
      [26.8180, 80.9050],
      [26.8020, 80.8920],
      [26.7860, 80.8780],
      [26.7650, 80.8720]
    ],
    center: [26.7920, 80.8840],
    status: 'moderate',
    congestionLevel: 58,
    congestionLabel: 'Moderate Flow',
    vehicleCount: 2240,
    averageSpeed: 38,
    speedLimit: 60,
    delayMinutes: 8,
    lengthKm: 7.4,
    incident: 'Normal arterial movement with brief queues at Alambagh Chauraha',
    trend: 'improving',
    lastReported: '5 mins ago'
  },
  {
    id: 'lko-08',
    name: 'Kisan Path (Outer Ring Road - NH 230)',
    code: 'NH 230',
    zone: 'Outer Ring Road / East',
    // High-speed outer bypass connecting Sultanpur Rd, Deva Rd, and Kursi Rd
    coordinates: [
      [26.8150, 81.0520],
      [26.8520, 81.0650],
      [26.8950, 81.0580],
      [26.9320, 81.0350]
    ],
    center: [26.8735, 81.0615],
    status: 'low',
    congestionLevel: 21,
    congestionLabel: 'Free Flow',
    vehicleCount: 960,
    averageSpeed: 76,
    speedLimit: 80,
    delayMinutes: 1,
    lengthKm: 14.2,
    incident: 'Clear bypass carriageway; smooth inter-state commercial freight movement',
    trend: 'stable',
    lastReported: '7 mins ago'
  },
  {
    id: 'lko-09',
    name: 'Mahanagar & Nishatganj Bridge Corridor',
    code: 'TRANS-GOMTI',
    zone: 'Mahanagar / Nishatganj',
    // Connecting Lucknow University, IT Chauraha, Nishatganj vegetable market
    coordinates: [
      [26.8630, 80.9380],
      [26.8650, 80.9480],
      [26.8670, 80.9590],
      [26.8710, 80.9690]
    ],
    center: [26.8660, 80.9535],
    status: 'moderate',
    congestionLevel: 69,
    congestionLabel: 'Moderate Congestion',
    vehicleCount: 1880,
    averageSpeed: 22,
    speedLimit: 45,
    delayMinutes: 10,
    lengthKm: 3.4,
    incident: 'Evening market crowd spillover near Nishatganj bridge approach',
    trend: 'worsening',
    lastReported: '3 mins ago'
  },
  {
    id: 'lko-10',
    name: 'Tedhi Pulia & Sitapur Road (NH 24)',
    code: 'NH 24 / STP',
    zone: 'Jankipuram / Aliganj',
    // Major northern arterial via Daliganj, Tedhi Pulia flyover towards IET College
    coordinates: [
      [26.8820, 80.9320],
      [26.9020, 80.9380],
      [26.9210, 80.9450],
      [26.9420, 80.9480]
    ],
    center: [26.9115, 80.9415],
    status: 'heavy',
    congestionLevel: 85,
    congestionLabel: 'Heavy Congestion',
    vehicleCount: 2460,
    averageSpeed: 14,
    speedLimit: 50,
    delayMinutes: 17,
    lengthKm: 6.8,
    incident: 'Tedhi Pulia service lane vegetable wholesale market bottleneck',
    trend: 'stable',
    lastReported: '8 mins ago'
  },
  {
    id: 'lko-11',
    name: 'Gomti Riverfront Promenade & Marine Drive',
    code: 'RVR-FRONT',
    zone: 'Riverfront / Samta Mulak',
    // Scenic riverfront stretch between Samta Mulak Chowk and Gomti Barrage
    coordinates: [
      [26.8480, 80.9620],
      [26.8510, 80.9700],
      [26.8540, 80.9790],
      [26.8560, 80.9880]
    ],
    center: [26.8520, 80.9745],
    status: 'low',
    congestionLevel: 28,
    congestionLabel: 'Normal Flow',
    vehicleCount: 880,
    averageSpeed: 44,
    speedLimit: 50,
    delayMinutes: 2,
    lengthKm: 3.1,
    incident: 'Pleasant riverfront movement; normal evening recreational flow',
    trend: 'improving',
    lastReported: '10 mins ago'
  },
  {
    id: 'lko-12',
    name: 'Aliganj Kapoorthala & Purania Chauraha',
    code: 'ALGNJ-01',
    zone: 'Aliganj / Kapoorthala',
    // Connecting Purania flyover, Kapoorthala commercial complex, and Dandiya bazaar
    coordinates: [
      [26.8820, 80.9440],
      [26.8880, 80.9460],
      [26.8950, 80.9430],
      [26.9010, 80.9390]
    ],
    center: [26.8915, 80.9445],
    status: 'moderate',
    congestionLevel: 61,
    congestionLabel: 'Moderate Flow',
    vehicleCount: 1540,
    averageSpeed: 24,
    speedLimit: 40,
    delayMinutes: 6,
    lengthKm: 2.6,
    incident: 'Coaching hub dispersal and Kapoorthala shopping market activity',
    trend: 'stable',
    lastReported: '5 mins ago'
  },
  {
    id: 'lko-13',
    name: 'Ashiyana Main Road & Bangla Bazaar',
    code: 'ASH-RD',
    zone: 'Ashiyana / South Lucknow',
    // Connecting VIP Road / Power House crossing through Bangla Bazaar
    coordinates: [
      [26.8020, 80.9120],
      [26.8040, 80.9230],
      [26.8060, 80.9350],
      [26.8090, 80.9480]
    ],
    center: [26.8055, 80.9290],
    status: 'moderate',
    congestionLevel: 57,
    congestionLabel: 'Moderate Flow',
    vehicleCount: 1390,
    averageSpeed: 26,
    speedLimit: 45,
    delayMinutes: 5,
    lengthKm: 3.9,
    incident: 'Local residential flow with mild queue near Bangla Bazaar crossing',
    trend: 'improving',
    lastReported: '9 mins ago'
  },
  {
    id: 'lko-14',
    name: 'Vibhuti Khand IT Spine & High Court Area',
    code: 'IT-SPINE',
    zone: 'Vibhuti Khand / Gomti Nagar',
    // Commercial hub encircling Cyber Heights, High Court Lucknow Bench, & Titan
    coordinates: [
      [26.8620, 81.0020],
      [26.8650, 81.0090],
      [26.8680, 81.0160],
      [26.8710, 81.0210]
    ],
    center: [26.8665, 81.0115],
    status: 'low',
    congestionLevel: 36,
    congestionLabel: 'Normal Flow',
    vehicleCount: 1120,
    averageSpeed: 39,
    speedLimit: 50,
    delayMinutes: 3,
    lengthKm: 2.2,
    incident: 'High Court session dispersal concluded; wide boulevard moving freely',
    trend: 'stable',
    lastReported: '6 mins ago'
  },
  {
    id: 'lko-15',
    name: 'Sultanpur Road (Arjunganj to HCL IT City)',
    code: 'SH 36',
    zone: 'Sultanpur Road / Cantt',
    // From Arjunganj market past Police Headquarters to HCL IT City & Medanta
    coordinates: [
      [26.8180, 80.9720],
      [26.8140, 80.9910],
      [26.8100, 81.0120],
      [26.8060, 81.0350]
    ],
    center: [26.8120, 81.0030],
    status: 'heavy',
    congestionLevel: 83,
    congestionLabel: 'Heavy Congestion',
    vehicleCount: 2210,
    averageSpeed: 16,
    speedLimit: 50,
    delayMinutes: 16,
    lengthKm: 6.9,
    incident: 'Arjunganj narrow market constriction and Medanta Hospital traffic',
    trend: 'worsening',
    lastReported: '2 mins ago'
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif-1',
    title: 'Severe Bottleneck: Charbagh Station',
    message: 'Charbagh / Hussainganj junction (NH 27) crawl speed down to 7 km/h with ~29 min delay.',
    roadId: 'lko-04',
    type: 'critical',
    time: '1 min ago',
    unread: true
  },
  {
    id: 'notif-2',
    title: 'Polytechnic Chauraha Heavy Queue',
    message: 'Faizabad Road intersection experiencing multi-arm bottleneck (2,890 vph) toward Kamta.',
    roadId: 'lko-05',
    type: 'critical',
    time: '3 mins ago',
    unread: true
  },
  {
    id: 'notif-3',
    title: 'Hazratganj Evening Shopper Rush',
    message: 'MG Marg congestion reached 88% capacity around GPO and Mayfair crossing.',
    roadId: 'lko-01',
    type: 'warning',
    time: '7 mins ago',
    unread: true
  },
  {
    id: 'notif-4',
    title: 'Amar Shaheed Path Operating Freely',
    message: 'Shaheed Path bypass operating at 72 km/h cruise speed from Amausi to Ekana.',
    roadId: 'lko-02',
    type: 'info',
    time: '12 mins ago',
    unread: false
  }
];

/**
 * Calculates aggregated summary statistics from the current traffic dataset.
 */
export function calculateTrafficStats(roads) {
  if (!roads || roads.length === 0) {
    return {
      totalRoads: 0,
      heavyCount: 0,
      moderateCount: 0,
      lowCount: 0,
      averageSpeed: 0,
      totalVehicles: 0
    };
  }

  const totalRoads = roads.length;
  let heavyCount = 0;
  let moderateCount = 0;
  let lowCount = 0;
  let totalSpeed = 0;
  let totalVehicles = 0;

  roads.forEach((road) => {
    if (road.status === 'heavy') heavyCount += 1;
    else if (road.status === 'moderate') moderateCount += 1;
    else if (road.status === 'low') lowCount += 1;

    totalSpeed += road.averageSpeed;
    totalVehicles += road.vehicleCount;
  });

  return {
    totalRoads,
    heavyCount,
    moderateCount,
    lowCount,
    averageSpeed: Math.round(totalSpeed / totalRoads),
    totalVehicles
  };
}

/**
 * Generates an updated simulated traffic snapshot with realistic fluctuations.
 * Simulates micro-variations in speed, volume, and congestion levels.
 */
export function generateSimulatedTrafficUpdate(currentData) {
  return currentData.map((road) => {
    // Realistic fluctuation factors (-6% to +6%)
    const speedDelta = Math.floor(Math.random() * 7) - 3;
    const vehicleDelta = Math.floor(Math.random() * 141) - 70;

    const newSpeed = Math.max(5, Math.min(road.speedLimit + 5, road.averageSpeed + speedDelta));
    const newVehicles = Math.max(400, road.vehicleCount + vehicleDelta);

    // Re-evaluate congestion status based on speed vs speed limit ratio
    const speedRatio = newSpeed / road.speedLimit;
    let newStatus;
    let newCongestionLevel;
    let newLabel;

    if (speedRatio < 0.45) {
      newStatus = 'heavy';
      newCongestionLevel = Math.min(99, Math.max(75, Math.round((1 - speedRatio) * 100)));
      newLabel = newCongestionLevel > 90 ? 'Severe Bottleneck' : 'Heavy Congestion';
    } else if (speedRatio < 0.72) {
      newStatus = 'moderate';
      newCongestionLevel = Math.min(74, Math.max(40, Math.round((1 - speedRatio) * 100)));
      newLabel = 'Moderate Flow';
    } else {
      newStatus = 'low';
      newCongestionLevel = Math.min(39, Math.max(15, Math.round((1 - speedRatio) * 80)));
      newLabel = 'Free Flow';
    }

    const calculatedDelay = Math.max(1, Math.round((road.lengthKm / newSpeed) * 60 - (road.lengthKm / road.speedLimit) * 60));

    return {
      ...road,
      averageSpeed: newSpeed,
      vehicleCount: newVehicles,
      status: newStatus,
      congestionLevel: newCongestionLevel,
      congestionLabel: newLabel,
      delayMinutes: calculatedDelay,
      lastReported: 'Just now'
    };
  });
}
