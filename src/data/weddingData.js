import { getAssetUrl } from "../utils/getAssetUrl";

export const weddingData = {
  couple: {
    groom: "Nandu",
    groomFull: "Nandu",
    bride: "Sravya",
    brideFull: "Sravya",
    title: "Nandu & Sravya",
    subtitle: "A Sweet Love Story",
    hashtag: "#NanduWedsSravya",
  },

  eventDate: {
    iso: "2026-09-13T10:00:00+05:30",
    displayDate: "September 13 & 14, 2026",
    dayName: "Sunday & Monday",
    muhurtham: "10:00 AM - 10:30 AM (Thaali Kettu Muhurtham)",
  },

  openingScene: {
    tagline: "Two Hearts, One Journey",
    ctaText: "Explore Our Story",
    locationTeaser: "Mayannur & Ayyampilly • Kerala",
  },

  pinnedJourney: {
    chapter1: {
      title: "Where It All Began",
      subtitle: "Chapter I • First Meeting",
      quote:
        "Like a gentle golden sunrise, two paths met in silence and found a lifetime of warmth.",
    },
    chapter2: {
      title: "Golden Moments Together",
      subtitle: "Chapter II • Shared Smiles",
      quote:
        "Walking together through changing seasons, every quiet moment turned into a cherished memory.",
    },
    chapter3: {
      title: "The Eternal Promise",
      subtitle: "Chapter III • Forever & Always",
      quote:
        "With rings engraved with our names, we step together into an everlasting union.",
    },
  },

  ourStory: [
    {
      id: 1,
      tag: "Chapter I",
      title: "First Encounter",
      period: "Winter 2022",
      description:
        "An unexpected spark that grew into a deep, unbreakable bond of love.",
      imageUrl: getAssetUrl("images/WIL00162.JPG"),
    },
    {
      id: 2,
      tag: "Chapter II",
      title: "Golden Days",
      period: "Autumn 2024",
      description:
        "Moments filled with laughter, warm conversations, and peaceful sunsets.",
      imageUrl: getAssetUrl("images/WIL00236.JPG"),
    },
    {
      id: 3,
      tag: "Chapter III",
      title: "The Proposal",
      period: "Spring 2026",
      description:
        "Under a sky full of stars, Nandu asked, and Sravya happily said YES.",
      imageUrl: getAssetUrl("images/WIL00310.JPG"),
    },
    {
      id: 4,
      tag: "Chapter IV",
      title: "Forever Begins",
      period: "Winter 2026",
      description: "Ready to walk hand in hand as husband and wife.",
      imageUrl: getAssetUrl("images/WIL00411.JPG"),
    },
  ],

  venue: {
    name: "Mayannur Sree Kurumba Temple",
    hall: "Temple Premises",
    city: "Mayannur, Thrissur, Kerala",
    address: "Mayannur, Thrissur, Kerala 679105",
    googleMapsUrl: "https://maps.app.goo.gl/bBAuvWbiqeCWZaTeA",
  },

  eventsList: [
    {
      id: "thaalikettu",
      title: "Thaali Kettu Ceremony",
      subTitle: "Sacred Temple Muhurtham",
      date: "Sunday, 13th September 2026",
      time: "10:00 AM – 10:30 AM",
      venueName: "Mayannur Sree Kurumba Temple",
      location: "Mayannur, Thrissur, Kerala",
      googleMapsUrl: "https://maps.app.goo.gl/bBAuvWbiqeCWZaTeA",
      dressCode: "Traditional Kasavu Attire",
      description:
        "The auspicious Thaali Kettu ceremony at Mayannur Sree Kurumba Temple.",
    },
    {
      id: "weddingFeast",
      title: "Wedding Ceremony & Feast",
      subTitle: "Post-Thaali Celebration",
      date: "Sunday, 13th September 2026",
      time: "11:00 AM Onwards (After Thaali Kettu)",
      venueName: "Vrinda's Auditorium",
      location: "Chirankara, Mayannur, Thrissur, Kerala",
      googleMapsUrl: "https://maps.app.goo.gl/bBAuvWbiqeCWZaTeA",
      dressCode: "Traditional / Festive Indian",
      description:
        "Traditional Sadhya and wedding celebration immediately following the temple ceremony.",
    },
    {
      id: "reception",
      title: "Grand Reception",
      subTitle: "Celebration & Feast",
      date: "Monday, 14th September 2026",
      time: "11:00 AM Onwards",
      venueName: "Ayyampilly Celebration Hall",
      location: "Ayyampilly, Vypin, Kochi, Kerala",
      googleMapsUrl: "https://maps.google.com/?q=Ayyampilly+Kerala",
      dressCode: "Festive Formal",
      description:
        "A joyful reception celebration with family and friends at Ayyampilly.",
    },
  ],

  gallery: [
    {
      id: "g1",
      title: "Nandu & Sravya",
      category: "Pre-Wedding",
      url: getAssetUrl("images/WIL00162.JPG"),
    },
    {
      id: "g2",
      title: "Shared Smiles",
      category: "Moments",
      url: getAssetUrl("images/WIL00236.JPG"),
    },
    {
      id: "g3",
      title: "Golden Sunset",
      category: "Romance",
      url: getAssetUrl("images/WIL00310.JPG"),
    },
    {
      id: "g4",
      title: "Together Forever",
      category: "Celebration",
      url: getAssetUrl("images/WIL00411.JPG"),
    },
  ],

  rsvp: {
    deadline: "September 5, 2026",
  },

  music: {
    trackTitle: "Howl's Moving Castle (OST Theme)",
    src: getAssetUrl("music/wedding-song.mp3"),
  },
};