export interface ShopInfo {
    name: string;
    nameMarathi: string;
    tagline: string;
    phone1: string;
    phone2: string;
    whatsapp: string;
    email: string;
    address: {
        line1: string;
        line2: string;
        city: string;
        state: string;
        pin: string;
        full: string;
    };
    workingHours: {
        weekdays: string;
        sunday: string;
    };
    brandsServiced: string[];
    googleMapsUrl: string;
    socialMedia: {
        facebook: string;
        instagram: string;
        whatsapp: string;
    };
}

export const SHOP_INFO: ShopInfo = {
    name: "Ravi Auto Service",
    nameMarathi: "रवी ऑटो सर्व्हिस",
    tagline: "All Two Wheeler Spare Parts, Mechanical Work & Service is Done Here",
    phone1: process.env.NEXT_PUBLIC_SHOP_PHONE1 || "8097901003",
    phone2: process.env.NEXT_PUBLIC_SHOP_PHONE2 || "8850527356",
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918097901003",
    email: "ravindravishwakarma987@gmail.com",
    address: {
        line1: "Shop No. 1243/001, Devghar Ali",
        line2: "40+ Maidan Jawal, Ghansoli Gaon",
        city: process.env.NEXT_PUBLIC_SHOP_CITY || "Navi Mumbai",
        state: "Maharashtra",
        pin: process.env.NEXT_PUBLIC_SHOP_PIN || "400701",
        full: process.env.NEXT_PUBLIC_SHOP_ADDRESS || "Shop No. 1243/001, Devghar Ali, 40+ Maidan Jawal, Ghansoli Gaon, Navi Mumbai - 400701"
    },
    workingHours: {
        weekdays: "Mon - Thu, Sat - Sun: 9:00 AM – 10:00 PM",
        sunday: "Friday: 9:00 AM – 1:00 PM"
    },
    brandsServiced: ["Hero", "Honda", "Yamaha", "Bajaj", "TVS", "Royal Enfield", "KTM", "Suzuki", "Other"],
    googleMapsUrl: process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL || "https://maps.google.com/?q=Ghansoli+Gaon+Navi+Mumbai",
    socialMedia: {
        facebook: "#",
        instagram: "#",
        whatsapp: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918097901003"}`
    }
};

export interface Service {
    id: string;
    name: string;
    description: string;
    icon: string;
    startingPrice: string;
}

export const SERVICES: Service[] = [
    {
        id: 'general-servicing',
        name: 'General Servicing',
        description: 'Engine oil change, filter cleaning, chain lubrication and overall checkup.',
        icon: 'wrench',
        startingPrice: '₹1000'
    },
    {
        id: 'engine-repair',
        name: 'Engine Repair',
        description: 'Engine overhaul, piston work, cylinder boring and performance tuning.',
        icon: 'settings',
        startingPrice: '₹2000'
    },
    {
        id: 'brake-service',
        name: 'Brake Service',
        description: 'Brake pad replacement, drum cleaning and brake adjustment.',
        icon: 'disc',
        startingPrice: '₹199'
    },
    {
        id: 'tyre-replacement',
        name: 'Tyre Replacement',
        description: 'Quality tubeless and tube tyre fitting for all brands.',
        icon: 'circle',
        startingPrice: '₹899'
    },
    {
        id: 'electrical-repair',
        name: 'Electrical Repair',
        description: 'Battery, wiring, horn, lights and self-start motor repair.',
        icon: 'zap',
        startingPrice: '₹299'
    },
    {
        id: 'denting-painting',
        name: 'Denting & Painting',
        description: 'Scratch repair, dent removal and professional full body painting.',
        icon: 'palette',
        startingPrice: '₹999'
    },
    {
        id: 'suspension-repair',
        name: 'Suspension Repair',
        description: 'Front fork service and rear shock absorber replacement.',
        icon: 'arrow-up-down',
        startingPrice: '₹599'
    },
    {
        id: 'carburetor-fi',
        name: 'Carburetor/FI Service',
        description: 'Expert cleaning and tuning for better mileage and performance.',
        icon: 'droplet',
        startingPrice: '₹399'
    },
    {
        id: 'wash-polish',
        name: 'Wash & Polish',
        description: 'Full bike cleaning with premium polish and shine.',
        icon: 'sparkles',
        startingPrice: '₹249'
    },
    {
        id: 'pickup-drop',
        name: 'Pickup & Drop Service',
        description: 'Convenient doorstep service available across Navi Mumbai.',
        icon: 'truck',
        startingPrice: '₹149'
    }
];
