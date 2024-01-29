import { ProductData } from './interfaces';

export const fallbackInstructionsData = {
  skip: 'Skip',
  content: ['Hold and Drag to look around', 'Click on floor to move', 'Hover or Click on objects to learn more'],
};

export const fallbackWelcomeData = {
  collectionImage: 'https://picsum.photos/500/500',
  collectionTitle: 'The Bicester Collection',
  jumboTitle: 'VIRTUAL VOYAGE ',
  tagline: 'Explore The Bicester Collection universe and immerse yourself in a 360 journey of delight.',
  enterCTA: 'Enter',
};

export const fallbackInfoData = {
  image: 'https://picsum.photos/500/700',
  title: 'Title',
  subtitle: 'Subtitle',
  description:
    'Iconic medium shoulder bag with monogram motif and silver chain. Versatile design with detachable handle and shoulder strap. Crafted metalware details. Made in Italy.',
  moreCTA: 'Learn More',
};

export const fallOverlayData = [
  {
    key: 'changeRooms', //hardcode this
    text: 'Change Rooms',
    content: [
      {
        roomName: 'Room 1',
        description: 'Desc Room1',
        scene: 'room_1',
      },
      {
        roomName: 'Room 2',
        description: 'Desc Room2',
        scene: 'room_2',
      },
      {
        roomName: 'Room 3',
        description: 'Desc Room3',
        scene: 'room_3',
      },
      {
        roomName: 'Room 4',
        description: 'Desc Room4',
        scene: 'room_4',
      },
      {
        roomName: 'Room 5',
        description: 'Desc Room5',
        scene: 'room_5',
      },
    ],
  },
  {
    key: 'instructions', //hardcode this
    text: 'Instructions',
    content: ['Hold and Drag to look around', 'Click on floor to move', 'Hover or Click on objects to learn more'],
  },
  {
    key: 'sound', //hardcode this
    text: 'Sound : ON',
    textAlternate: 'Sound : OFF',
    content: [
      {
        name: 'Sound 1',
        fileURL: '',
      },
      {
        name: 'Sound 2',
        fileURL: '',
      },
      {
        name: 'Sound 3',
        fileURL: '',
      },
      {
        name: 'Sound 5',
        fileURL: '',
      },
      {
        name: 'Sound 6',
        fileURL: '',
      },
      {
        name: 'Sound 7',
        fileURL: '',
      },
      {
        name: 'Sound 8',
        fileURL: '',
      },
    ],
  },
  {
    key: 'languages', //hardcode this
    text: 'Languages',
    content: ['Lang1', 'Lang2', 'Lang3', 'Lang4', 'Lang5', 'Lang6', 'Lang7', 'Lang8', 'Lang9'],
  },
  {
    key: 'share', //hardcode this
    text: 'Share',
  },
];

export const fallbackProductData: ProductData = {
  parent_id: '000100',
  parent_sku: '000100',
  market: 'Test',
  title: 'Product Name',
  short_description: 'Short Description',
  long_description: 'Long Description',
  category: 'Category',
  brand: 'Brand',
  collection: 'Collection Name',
  currency: '$',
  gender: '',
  age_group: '',
  default_url: '',
  tags: '',
  base_price: '399',
  variants_selection_order: ['size', 'color'],
  variants: [
    {
      default: true,
      variant_id: '000112',
      variant_sku: '000112',
      short_description: 'Variant Short Description',
      long_description: 'Variant Long Description',
      variants: [
        {
          name: 'Color 1',
          variant_type: 'color',
          value: '#ff0000',
        },
        {
          variant_type: 'size',
          value: 'S',
          price: '399',
          available_stock: 10,
          variant_sku: '000112A',
        },
        {
          variant_type: 'size',
          value: 'M',
          price: '399',
          available_stock: 10,
          variant_sku: '000112B',
        },
        {
          variant_type: 'size',
          value: 'L',
          price: '399',
          available_stock: 0,
          variant_sku: '000112C',
        },
        {
          variant_type: 'size',
          value: 'XL',
          price: '399',
          available_stock: 10,
          variant_sku: '000112D',
        },
      ],
      available_stock: 100,
      media: [
        {
          url: 'https://picsum.photos/800/800',
          main: true,
          thumbnail_url: 'https://picsum.photos/800/800',
          media_type: 'image',
          mobile_version_url: 'https://picsum.photos/800/800',
        },
        {
          url: 'https://picsum.photos/900/900',
          main: false,
          thumbnail_url: 'https://picsum.photos/900/900',
          media_type: 'image',
          mobile_version_url: 'https://picsum.photos/900/900',
        },
        {
          url: 'https://picsum.photos/1000/1000',
          main: false,
          thumbnail_url: 'https://picsum.photos/1000/1000',
          media_type: 'image',
          mobile_version_url: 'https://picsum.photos/1000/1000',
        },
      ],
      media_plugin_integration: [],
      color_swatch: '#ff0000',
      momenti_url: {
        url: '',
        sound_effect: false,
      },
      three_dimension_model: {
        url: '',
      },
      retail_price: '499',
      sale_price: '359',
    },
    {
      default: false,
      variant_id: '000113',
      variant_sku: '000113',
      short_description: 'Variant Short Description',
      long_description: 'Variant Long Description',
      variants: [
        {
          name: 'Color 2',
          variant_type: 'color',
          value: '#00ddff',
        },
        {
          variant_type: 'size',
          value: 'S',
          price: '399',
          available_stock: 10,
          variant_sku: '000113A',
        },
        {
          variant_type: 'size',
          value: 'M',
          price: '399',
          available_stock: 0,
          variant_sku: '000113B',
        },
        {
          variant_type: 'size',
          value: 'L',
          price: '399',
          available_stock: 10,
          variant_sku: '000113C',
        },
        {
          variant_type: 'size',
          value: 'XL',
          price: '399',
          available_stock: 0,
          variant_sku: '000113D',
        },
      ],
      available_stock: 100,
      media: [
        {
          url: 'https://picsum.photos/802/802',
          main: true,
          thumbnail_url: 'https://picsum.photos/802/802',
          media_type: 'image',
          mobile_version_url: 'https://picsum.photos/802/802',
        },
        {
          url: 'https://picsum.photos/902/902',
          main: false,
          thumbnail_url: 'https://picsum.photos/902/902',
          media_type: 'image',
          mobile_version_url: 'https://picsum.photos/902/902',
        },
        {
          url: 'https://picsum.photos/1002/1002',
          main: false,
          thumbnail_url: 'https://picsum.photos/1002/1002',
          media_type: 'image',
          mobile_version_url: 'https://picsum.photos/1002/1002',
        },
      ],
      media_plugin_integration: [],
      color_swatch: '#00ddff',
      momenti_url: {
        url: '',
        sound_effect: false,
      },
      three_dimension_model: {
        url: '',
      },
      retail_price: '499',
      sale_price: '359',
    },
    {
      default: false,
      variant_id: '000114',
      variant_sku: '000114',
      short_description: 'Variant Short Description',
      long_description: 'Variant Long Description',
      variants: [
        {
          name: 'Color 3',
          variant_type: 'color',
          value: '#0c0c0c',
        },
        {
          variant_type: 'size',
          value: 'S',
          price: '399',
          available_stock: 0,
          variant_sku: '000114A',
        },
        {
          variant_type: 'size',
          value: 'M',
          price: '399',
          available_stock: 0,
          variant_sku: '000114B',
        },
        {
          variant_type: 'size',
          value: 'L',
          price: '399',
          available_stock: 0,
          variant_sku: '000114C',
        },
        {
          variant_type: 'size',
          value: 'XL',
          price: '399',
          available_stock: 0,
          variant_sku: '000114D',
        },
      ],
      available_stock: 100,
      media: [
        {
          url: 'https://picsum.photos/801/801',
          main: true,
          thumbnail_url: 'https://picsum.photos/801/801',
          media_type: 'image',
          mobile_version_url: 'https://picsum.photos/801/801',
        },
        {
          url: 'https://picsum.photos/901/901',
          main: false,
          thumbnail_url: 'https://picsum.photos/901/901',
          media_type: 'image',
          mobile_version_url: 'https://picsum.photos/901/901',
        },
        {
          url: 'https://picsum.photos/1001/1001',
          main: false,
          thumbnail_url: 'https://picsum.photos/1001/1001',
          media_type: 'image',
          mobile_version_url: 'https://picsum.photos/1001/1001',
        },
      ],
      media_plugin_integration: [],
      color_swatch: '#0c0c0c',
      momenti_url: {
        url: '',
        sound_effect: false,
      },
      three_dimension_model: {
        url: '',
      },
      retail_price: '499',
      sale_price: '359',
    },
  ],
};
