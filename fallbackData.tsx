export const fallbackInstructionsData = {
  skip: "Skip",
  content: [
    "Hold and Drag to look around",
    "Click on floor to move",
    "Hover or Click on objects to learn more",
  ],
};

export const fallbackWelcomeData = {
  collectionImage: "https://picsum.photos/500/500",
  collectionTitle: "Collection Title",
  jumboTitle: "Big Title",
  tagline: "The tagline goes here",
  enterCTA: "Enter",
};

export const fallbackInfoData = {
  image: "https://picsum.photos/500/500",
  title: "Title",
  subtitle: "Subtitle",
  description: "The description goes here",
  moreCTA: "Learn More",
};

export const fallOverlayData = [
  {
    key: "changeRooms", //hardcode this
    text: "Change Rooms",
    content: [
      {
        roomName: "Room 1",
        description: "Desc Room1",
        scene: "room_1",
      },
    ],
  },
  {
    key: "instructions", //hardcode this
    text: "Instructions",
    content: ["First", "Second", "Third"],
  },
  {
    key: "sound", //hardcode this
    text: "Sound : ON",
    textAlternate: "Sound : OFF",
    content: [
      {
        name: "Sound 1",
        fileURL: "",
      },
    ],
  },
  {
    key: "languages", //hardcode this
    text: "Languages",
    content: ["Lang1", "Lang2"],
  },
  {
    key: "share", //hardcode this
    text: "Share",
  },
];
