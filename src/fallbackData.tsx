import { FallBackData } from './interfaces';

export const fallbackData: FallBackData = {
  data: {
    ui: {
      uiConfig: {
        overlay: {
          changeRooms: {
            content: [
              {
                roomName: 'Room 1',
                description: 'The first room.',
                scene: 'room_1',
              },
              {
                roomName: 'Room 2',
                description: 'The second room.',
                scene: 'room_2',
              },
            ],
            hotspot: 'None',
            key: 'changeRooms',
            text: 'Change Rooms',
            textAlternate: '',
          },
          instructionsOverlay: {
            content: ['First', 'Second', 'Third'],
            key: 'instructions',
            text: 'Instructions',
            textAlternate: '',
          },
          languages: {
            content: [
              {
                key: 'English',
                locale: 'en',
              },
              {
                key: 'French',
                locale: 'fr',
              },
            ],
            key: 'languages',
            text: 'Languages',
            textAlternate: '',
          },
          sounds: {
            content: [
              {
                name: 'Sound 1',
                fileURL: '',
              },
              {
                name: 'Sound 2',
                fileURL: '',
              },
            ],
            key: 'sound',
            text: 'Sound : ON',
            textAlternate: 'Sound : OFF',
          },
          share: {
            key: 'share',
            text: 'Share',
            textAlternate: '',
          },
        },
        welcome: {
          collectionImage: 'https://picsum.photos/600/600',
          collectionTitle: 'Experience Title',
          jumboTitle: 'Experience Name',
          tagline: 'Short Experience description',
          enterCTA: 'Enter',
        },
        instructions: {
          skip: 'Skip',
          content: [
            'Hold and Drag to look around',
            'Click on floor to move',
            'Hover or click on objects to learn more',
          ],
        },
      },
      infoModels: [
        {
          id: '000100',
          infoModel: {
            image: 'https://picsum.photos/500/500',
            title: 'Title now',
            subtitle: 'Subtitle',
            description:
              'Description Iconic medium shoulder bag with monogram motif and silver chain. Versatile design with detachable handle and shoulder strap. Crafted metalware details.',
            buttonTitle: 'Learn More',
            linkToOpen: 'https://emperiavr.com/emperia-creator-tools',
            mediaURLs: [
              'https://www.youtube.com/watch?v=wrz7WabVP5A',
              'https://images.pexels.com/photos/2079246/pexels-photo-2079246.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
              'https://www.youtube.com/embed/zXfzzxH1q8o?si=V662_OI_MLg-Q9T5',
              'https://placehold.co/600x400.jpg',
              'https://picsum.photos/800.jpg',
              'https://www.w3schools.com/html/movie.mp4',
            ],
          },
        },
        {
          id: '000101',
          infoModel: {
            image: 'https://picsum.photos/600/600',
            title: 'Title ok',
            subtitle: 'Subtitle',
            description: 'Description',
            buttonTitle: 'Learn More',
            linkToOpen: 'https://emperiavr.com/emperia-creator-tools',
            mediaURLs: [
              'https://fastly.picsum.photos/id/0/5000/3333.jpg?hmac=_j6ghY5fCfSD6tvtcV74zXivkJSPIfR9B8w34XeQmvU',
              'https://fastly.picsum.photos/id/1/5000/3333.jpg?hmac=Asv2DU3rA_5D1xSe22xZK47WEAN0wjWeFOhzd13ujW4',
              'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ',
              'https://fastly.picsum.photos/id/4/5000/3333.jpg?hmac=ghf06FdmgiD0-G4c9DdNM8RnBIN7BO0-ZGEw47khHP4',
              'https://fastly.picsum.photos/id/7/4728/3168.jpg?hmac=c5B5tfYFM9blHHMhuu4UKmhnbZoJqrzNOP9xjkV4w3o',
            ],
          },
        },
      ],
      mediaModels: [
        {
          id: '71654',
          mediaModel: {
            mediaURLs: [
              'https://youtu.be/sgyveSnlnR4?si=bsD_N-wqkJjxrbOh',
              'https://images.pexels.com/photos/2079246/pexels-photo-2079246.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
              'https://picsum.photos/800.jpg',
              'https://www.youtube.com/embed/zXfzzxH1q8o?si=V662_OI_MLg-Q9T5',
              'https://www.w3schools.com/html/movie.mp4',
            ],
          },
        },
      ],
      iframeModels: [
        {
          id: '71660',
          iFrameModel: {
            uRL: 'https://emperiavr.com/emperia-creator-tools/',
          },
        },
      ],
      arModels: [
        {
          id: '71666',
          aRModel: {
            meshURL: 'https://walmart.emperia-staging.com/AR/index.html?name=WalkerEdisonSideboard',
          },
        },
      ],
      pdpModels: [
        {
          id: '000112',
          pdpModel: {
            parent_id: '000100',
            parent_sku: '000100',
            market: 'Test',
            retail_price: 499,
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
            base_price: 399,
            variants_selection_order: ['size', 'color'],
            imageURLs: [
              'https://picsum.photos/802/802',
              'https://picsum.photos/902/902',
              'https://picsum.photos/1002/1002',
            ],
            turnTableURL:
              'https://walmart.emperia-staging.com/assets/4c769101-b9e7-475b-b5a4-47499d4619f1/public/media/images/3DDE7110_1000x1000_36_imagesheet.png',
            variants: [
              {
                bDefault: true,
                variant_id: '000112',
                variant_sku: '000112',
                short_description: 'Variant Short Description',
                long_description: 'Variant Long Description',
                in_stock: true,
                color_swatch_url: 'https://picsum.photos/200/200',
                variants: [
                  {
                    name: 'Color 1',
                    variant_type: 'color',
                    value: '#ff0000',
                    imageURLs: ['https://picsum.photos/800/800', 'https://picsum.photos/900/900'],
                  },
                  {
                    variant_type: 'size',
                    value: 'S',
                    price: '399',
                    available_stock: 10,
                    variant_sku: '000112A',
                    imageURLs: ['https://picsum.photos/800/800', 'https://picsum.photos/900/900'],
                  },
                  {
                    variant_type: 'size',
                    value: 'M',
                    price: '399',
                    available_stock: 10,
                    variant_sku: '000112B',
                    imageURLs: ['https://picsum.photos/800/800', 'https://picsum.photos/900/900'],
                  },
                  {
                    variant_type: 'size',
                    value: 'L',
                    price: '399',
                    available_stock: 0,
                    variant_sku: '000112C',
                    imageURLs: ['https://picsum.photos/800/800', 'https://picsum.photos/900/900'],
                  },
                  {
                    variant_type: 'size',
                    value: 'XL',
                    price: '399',
                    available_stock: 10,
                    variant_sku: '000112D',
                    imageURLs: ['https://picsum.photos/800/800', 'https://picsum.photos/900/900'],
                  },
                ],
                available_stock: 100,
                imageURLs: [
                  'https://picsum.photos/800/800',
                  'https://picsum.photos/900/900',
                  'https://picsum.photos/1000/1000',
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
                retail_price: 499,
                sale_price: 359,
              },
              {
                bDefault: false,
                variant_id: '000113',
                variant_sku: '000113',
                short_description: 'Variant Short Description',
                long_description: 'Variant Long Description',
                in_stock: true,
                color_swatch_url: 'https://picsum.photos/200/200',
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
                imageURLs: [
                  'https://picsum.photos/802/802',
                  'https://picsum.photos/902/902',
                  'https://picsum.photos/1002/1002',
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
                retail_price: 499,
                sale_price: 359,
              },
              {
                bDefault: false,
                variant_id: '000114',
                variant_sku: '000114',
                in_stock: true,
                color_swatch_url: 'https://picsum.photos/200/200',
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
                imageURLs: [
                  'https://picsum.photos/803/803',
                  'https://picsum.photos/903/903',
                  'https://picsum.photos/1003/1003',
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
                retail_price: 499,
                sale_price: 359,
              },
            ],
          },
        },
      ],
    },
  },
};

export const ARPCUrls = {
  '1172288913': 'AR/index.html?name=WalkerEdisonSideboard',
  '2795761532': 'AR/index.html?name=Oaklee6DrawerDresser',
  '5325854900': 'AR/index.html?name=GuyiCloudCoffeeTable',
  '532121642': 'AR/index.html?name=DecModeAccentTable',
  '2001343371': 'AR/index.html?name=ChesterfieldSofa',
  '384053648': 'AR/index.html?name=bigjoejoeybeanbagchair',
  '521928725': 'AR/index.html?name=mainstaysfauxfurplush',
  '5105358640': 'AR/index.html?name=urbanshoppurpleflowerdecorativepillow',
  '5261193145': 'AR/index.html?name=betterhomegardensmiraswivelchair',
  '42338382': 'AR/index.html?name=mainstaysrosette',
  '1670734640': 'AR/index.html?name=mainstays',
  '5113233021': 'AR/index.html?name=pacman',
  '674371865': 'AR/index.html?name=zenstyle',
  '5587806211': 'AR/index.html?name=durablemarsbookcase',
  '606463417': 'AR/index.html?name=mainstayssquare',
  '6053161268': 'AR/index.html?name=bigjoejoey',
  '5305297350': 'AR/index.html?name=urbanshopdiscoballdecorativepillow',
  '1528649331': 'AR/index.html?name=betterhomesgardenstabletoppictureframe',
  '3977610044': 'AR/index.html?name=dyson',
  '1926602169': 'AR/index.html?name=retroglasslamp',
};

export const ARAndoirdUrls = {
  '1172288913': 'AR/WalkerEdisonSideboard_Android.glb',
  '2795761532': 'AR/Oaklee6DrawerDresser_Android.glb',
  '5325854900': 'AR/GuyiCloudCoffeeTable_Android.glb',
  '532121642': 'AR/DecModeAccentTable_Android.glb',
  '2001343371': 'AR/ChesterfieldSofa_Android.glb',
  '384053648': 'AR/bigjoejoeybeanbagchair_Android.glb',
  '521928725': 'AR/mainstaysfauxfurplush_Android.glb',
  '5105358640': 'AR/urbanshoppurpleflowerdecorativepillow_Android.glb',
  '5261193145': 'AR/betterhomegardensmiraswivelchair_Android.glb',
  '42338382': 'AR/mainstaysrosette_Android.glb',
  '1670734640': 'AR/mainstays_Android.glb',
  '5113233021': 'AR/pacman_Android.glb',
  '674371865': 'AR/zenstyle_Android.glb',
  '5587806211': 'AR/durablemarsbookcase_Android.glb',
  '606463417': 'AR/mainstayssquare_Android.glb',
  '6053161268': 'AR/bigjoejoey_Android.glb',
  '5305297350': 'AR/urbanshopdiscoballdecorativepillow_Android.glb',
  '1528649331': 'AR/betterhomesgardenstabletoppictureframe_Android.glb',
  '3977610044': 'AR/dyson_Android.glb',
  '1926602169': 'AR/retroglasslamp_Android.glb',
};

export const ARIOSUrls = {
  '1172288913': 'AR/WalkerEdisonSideboard_iOS.usdz',
  '2795761532': 'AR/Oaklee6DrawerDresser_iOS.usdz',
  '5325854900': 'AR/GuyiCloudCoffeeTable_iOS.usdz',
  '532121642': 'AR/DecModeAccentTable_iOS.usdz',
  '2001343371': 'AR/ChesterfieldSofa_iOS.usdz',
  '384053648': 'AR/bigjoejoeybeanbagchair_iOS.usdz',
  '521928725': 'AR/mainstaysfauxfurplush_iOS.usdz',
  '5105358640': 'AR/urbanshoppurpleflowerdecorativepillow_iOS.usdz',
  '5261193145': 'AR/betterhomegardensmiraswivelchair_iOS.usdz',
  '42338382': 'AR/mainstaysrosette_iOS.usdz',
  '1670734640': 'AR/mainstays_iOS.usdz',
  '5113233021': 'AR/pacman_iOS.usdz',
  '674371865': 'AR/zenstyle_iOS.usdz',
  '5587806211': 'AR/durablemarsbookcase_iOS.usdz',
  '606463417': 'AR/mainstayssquare_iOS.usdz',
  '6053161268': 'AR/bigjoejoey_iOS.usdz',
  '5305297350': 'AR/urbanshopdiscoballdecorativepillow_iOS.usdz',
  '1528649331': 'AR/betterhomesgardenstabletoppictureframe_iOS.usdz',
  '3977610044': 'AR/dyson_iOS.usdz',
  '1926602169': 'AR/retroglasslamp_iOS.usdz',
};

export const turnTableUrls = {
  '3410987982': 'assets/4c769101-b9e7-475b-b5a4-47499d4619f1/public/media/images/4E8D48DA_1000x1000_36_imagesheet.png',
  '3745131645': 'assets/4c769101-b9e7-475b-b5a4-47499d4619f1/public/media/images/FCFB881D_1000x1000_36_imagesheet.png',
  '2991887439': 'assets/4c769101-b9e7-475b-b5a4-47499d4619f1/public/media/images/684F917F_1000x1000_36_imagesheet.png',
  '1302133438': 'assets/4c769101-b9e7-475b-b5a4-47499d4619f1/public/media/images/63FC7B44_1000x1000_36_imagesheet.png',
  '2093729564': 'assets/4c769101-b9e7-475b-b5a4-47499d4619f1/public/media/images/3DDE7110_1000x1000_36_imagesheet.png',
  '703312492': ' assets/4c769101-b9e7-475b-b5a4-47499d4619f1/public/media/images/E803C0BC_1000x1000_36_imagesheet.png',
  '1542459628': 'assets/4c769101-b9e7-475b-b5a4-47499d4619f1/public/media/images/548DC48C_1000x1000_36_imagesheet.png',
  '1475836284': 'assets/4c769101-b9e7-475b-b5a4-47499d4619f1/public/media/images/7C0E11A2_1000x1000_36_imagesheet.png',
  '741465834': 'assets/4c769101-b9e7-475b-b5a4-47499d4619f1/public/media/images/0D543C07_1000x1000_36_imagesheet.png',
  '5090946815': 'assets/4c769101-b9e7-475b-b5a4-47499d4619f1/public/media/images/0A8B6A8D_1000x1000_36_imagesheet.png',
  '3252943322': 'assets/4c769101-b9e7-475b-b5a4-47499d4619f1/public/media/images/6026A265_1000x1000_36_imagesheet.png',
  '3004910950': 'assets/4c769101-b9e7-475b-b5a4-47499d4619f1/public/media/images/FD9C2541_1000x1000_36_imagesheet.png',
  '210623249': 'assets/4c769101-b9e7-475b-b5a4-47499d4619f1/public/media/images/E843EAE9_1000x1000_36_imagesheet.png',
  '1868578848': 'assets/4c769101-b9e7-475b-b5a4-47499d4619f1/public/media/images/F51021DF_1000x1000_36_imagesheet.png',
  '19757575': 'assets/4c769101-b9e7-475b-b5a4-47499d4619f1/public/media/images/21D34564_1000x1000_36_imagesheet.png',
  '2530109598': 'assets/4c769101-b9e7-475b-b5a4-47499d4619f1/public/media/images/2C6545CC_1000x1000_36_imagesheet.png',
  '5057102669': 'assets/4c769101-b9e7-475b-b5a4-47499d4619f1/public/media/images/CCA10091_1000x1000_36_imagesheet.png',
  '5057367882': 'assets/4c769101-b9e7-475b-b5a4-47499d4619f1/public/media/images/DEDC8ACB_1000x1000_36_imagesheet.png',
  '776206598': 'assets/4c769101-b9e7-475b-b5a4-47499d4619f1/public/media/images/87DF13FB_1000x1000_36_imagesheet.png',
  '2399701926': 'assets/4c769101-b9e7-475b-b5a4-47499d4619f1/public/media/images/C5927BC2_1000x1000_36_imagesheet.png',
  '3446350708': 'assets/4c769101-b9e7-475b-b5a4-47499d4619f1/public/media/images/EFDC45D4_1000x1000_36_imagesheet.png',
  '2816207564': 'assets/4c769101-b9e7-475b-b5a4-47499d4619f1/public/media/images/3B70F50E_1000x1000_36_imagesheet.png',
  '5212541455': 'assets/4c769101-b9e7-475b-b5a4-47499d4619f1/public/media/images/A1C19FB5_1000x1000_36_imagesheet.png',
  '5240340759': 'assets/4c769101-b9e7-475b-b5a4-47499d4619f1/public/media/images/C3224037_1000x1000_36_imagesheet.png',
  '2118072155': 'assets/4c769101-b9e7-475b-b5a4-47499d4619f1/public/media/images/8B49E212_1000x1000_36_imagesheet.png',
  '2165968012': 'assets/4c769101-b9e7-475b-b5a4-47499d4619f1/public/media/images/52E87846_1000x1000_36_imagesheet.png',
  '567851542': 'assets/4c769101-b9e7-475b-b5a4-47499d4619f1/public/media/images/DA2770DC_1000x1000_36_imagesheet.png',
  '1211812612': 'assets/4c769101-b9e7-475b-b5a4-47499d4619f1/public/media/images/044E9669_1000x1000_36_imagesheet.png',
  '5105358640': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/67DCC858_1000x1000_36_imagesheet.png',
  '5105358641': 'assets/4c769101-b9e7-475b-b5a4-47499d4619f1/public/media/images/AE9E4D93_1000x1000_36_imagesheet.png',
  '5325854900': 'assets/4c769101-b9e7-475b-b5a4-47499d4619f1/public/media/images/396A3184_1000x1000_36_imagesheet.png',
  '3757193187': 'assets/4c769101-b9e7-475b-b5a4-47499d4619f1/public/media/images/BD9D3F08_1000x1000_36_imagesheet.png',
  '5277520358': 'assets/4c769101-b9e7-475b-b5a4-47499d4619f1/public/media/images/966A41AC_1000x1000_36_imagesheet.png',
  '1172288913': 'assets/4c769101-b9e7-475b-b5a4-47499d4619f1/public/media/images/7C272B13_1000x1000_36_imagesheet.png',
  '3969915984': 'assets/4c769101-b9e7-475b-b5a4-47499d4619f1/public/media/images/4B2CD6BA_1000x1000_36_imagesheet.png',
  '303962032': 'assets/c32303ef-003b-48a2-9a07-9369d039b6ae/public/media/images/FBC4ACA0_1000x1000_36_imagesheet.png',
  '2964212724': 'assets/c32303ef-003b-48a2-9a07-9369d039b6ae/public/media/images/836D3634_1000x1000_36_imagesheet.png',
  '1445034249': 'assets/c32303ef-003b-48a2-9a07-9369d039b6ae/public/media/images/81C76761_1000x1000_36_imagesheet.png',
  '1298643909': 'assets/c32303ef-003b-48a2-9a07-9369d039b6ae/public/media/images/A99FFACC_1000x1000_36_imagesheet.png',
  '695474400': 'assets/c32303ef-003b-48a2-9a07-9369d039b6ae/public/media/images/70B24154_1000x1000_36_imagesheet.png',
  '3477973294': 'assets/c32303ef-003b-48a2-9a07-9369d039b6ae/public/media/images/00932CE4_1000x1000_36_imagesheet.png',
  '3703012610': 'assets/4c769101-b9e7-475b-b5a4-47499d4619f1/public/media/images/575CC6EE_1000x1000_36_imagesheet.png',
  '106793713': 'assets/c32303ef-003b-48a2-9a07-9369d039b6ae/public/media/images/54C0D7E9_1000x1000_36_imagesheet.png',
  '978580932': 'assets/c32303ef-003b-48a2-9a07-9369d039b6ae/public/media/images/75CE8BF6_1000x1000_36_imagesheet.png',
  '2112373552': 'assets/c32303ef-003b-48a2-9a07-9369d039b6ae/public/media/images/B042E351_1000x1000_36_imagesheet.png',
  '2293377908': 'assets/c32303ef-003b-48a2-9a07-9369d039b6ae/public/media/images/45BD2B64_1000x1000_36_imagesheet.png',
  '100913048': 'assets/c32303ef-003b-48a2-9a07-9369d039b6ae/public/media/images/8C278A30_1000x1000_36_imagesheet.png',
  '2001343371': 'assets/4c769101-b9e7-475b-b5a4-47499d4619f1/public/media/images/26798253_1000x1000_36_imagesheet.png',
  '750472972': 'assets/c32303ef-003b-48a2-9a07-9369d039b6ae/public/media/images/EC5A8589_1000x1000_36_imagesheet.png',
  '5023829363': 'assets/c32303ef-003b-48a2-9a07-9369d039b6ae/public/media/images/6A14DEF4_1000x1000_36_imagesheet.png',
  '620253684': 'assets/c32303ef-003b-48a2-9a07-9369d039b6ae/public/media/images/8A0F1C88_1000x1000_36_imagesheet.png',
  '1494098835': 'assets/c32303ef-003b-48a2-9a07-9369d039b6ae/public/media/images/83F15D79_1000x1000_36_imagesheet.png',
  '2795761532': 'assets/c32303ef-003b-48a2-9a07-9369d039b6ae/public/media/images/EF9473DE_1000x1000_36_imagesheet.png',
  '43397162': 'assets/c32303ef-003b-48a2-9a07-9369d039b6ae/public/media/images/835434D5_1000x1000_36_imagesheet.png',
  '2001685026': 'assets/c32303ef-003b-48a2-9a07-9369d039b6ae/public/media/images/AB2BFE17_1000x1000_36_imagesheet.png',
  '1687000831': 'assets/c32303ef-003b-48a2-9a07-9369d039b6ae/public/media/images/3D9DF796_1000x1000_36_imagesheet.png',
  '501949554': 'assets/c32303ef-003b-48a2-9a07-9369d039b6ae/public/media/images/9359FCB8_1000x1000_36_imagesheet.png',
  '175009571': 'assets/f5013feb-bef4-442c-968f-63972ea793bb/public/media/images/F4CBA61A_1000x1000_36_imagesheet.png',
  '980548682': 'assets/f5013feb-bef4-442c-968f-63972ea793bb/public/media/images/8D34CC73_1000x1000_36_imagesheet.png',
  '34122521': 'assets/f5013feb-bef4-442c-968f-63972ea793bb/public/media/images/5DBF349E_1000x1000_36_imagesheet.png',
  '633730728': 'assets/f5013feb-bef4-442c-968f-63972ea793bb/public/media/images/D13A9E95_1000x1000_36_imagesheet.png',
  '248684108': 'assets/f5013feb-bef4-442c-968f-63972ea793bb/public/media/images/7517EDAA_1000x1000_36_imagesheet.png',
  '1122829395': 'assets/f5013feb-bef4-442c-968f-63972ea793bb/public/media/images/45DB70A3_1000x1000_36_imagesheet.png',
  '5077345433': 'assets/f5013feb-bef4-442c-968f-63972ea793bb/public/media/images/33A9C090_1000x1000_36_imagesheet.png',
  '659915513': 'assets/f5013feb-bef4-442c-968f-63972ea793bb/public/media/images/78CAD5CC_1000x1000_36_imagesheet.png',
  '506343265': 'assets/f5013feb-bef4-442c-968f-63972ea793bb/public/media/images/FE754C74_1000x1000_36_imagesheet.png',
  '1120895305': 'assets/f5013feb-bef4-442c-968f-63972ea793bb/public/media/images/845E4230_1000x1000_36_imagesheet.png',
  '5059177308': 'assets/f5013feb-bef4-442c-968f-63972ea793bb/public/media/images/CF9DF5BD_1000x1000_36_imagesheet.png',
  '532121642': 'assets/f5013feb-bef4-442c-968f-63972ea793bb/public/media/images/EDD0BF40_1000x1000_36_imagesheet.png',
  '1395224117': 'assets/f5013feb-bef4-442c-968f-63972ea793bb/public/media/images/782ABC15_1000x1000_36_imagesheet.png',
  '222413953': 'assets/f5013feb-bef4-442c-968f-63972ea793bb/public/media/images/F96A552B_1000x1000_36_imagesheet.png',
  '54739537': 'assets/f5013feb-bef4-442c-968f-63972ea793bb/public/media/images/7BEA5E1D_1000x1000_36_imagesheet.png',
  '461163089': 'assets/f5013feb-bef4-442c-968f-63972ea793bb/public/media/images/F86C6AA0_1000x1000_36_imagesheet.png',
  '919203139': 'assets/f5013feb-bef4-442c-968f-63972ea793bb/public/media/images/804779C2_1000x1000_36_imagesheet.png',
  '958850628': 'assets/f5013feb-bef4-442c-968f-63972ea793bb/public/media/images/F638C51F_1000x1000_36_imagesheet.png',
  '1341921231': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/C523ACD9_1000x1000_36_imagesheet.png',
  '5122403610': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/DF2B91FF_1000x1000_36_imagesheet.png',
  '521928725': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/B4813386_1000x1000_36_imagesheet.png',
  '1641599555': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/036E1A94_1000x1000_36_imagesheet.png',
  '1899301558': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/4E0B51FA_1000x1000_36_imagesheet.png',
  '1204613655': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/17AD12E1_1000x1000_36_imagesheet.png',
  '5229777510': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/E170FD93_1000x1000_36_imagesheet.png',
  '610166339': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/8B7821A3_1000x1000_36_imagesheet.png',
  '5102841486': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/B315FF9F_1000x1000_36_imagesheet.png',
  '5570750684': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/BC2D2244_1000x1000_36_imagesheet.png',
  '518601445': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/624EAB9F_1000x1000_36_imagesheet.png',
  '3227672033': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/292F2752_1000x1000_36_imagesheet.png',
  '5481203505': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/972AE24D_1000x1000_36_imagesheet.png',
  '1705930863': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/2D2C0305_1000x1000_36_imagesheet.png',
  L1900: 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/B294079E_1000x1000_36_imagesheet.png',
  '5471665092': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/FEEBB879_1000x1000_36_imagesheet.png',
  '2131868669': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/CD9AEABF_1000x1000_36_imagesheet.png',
  'UNRELEASED PRODUCT':
    'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/CF61B4C1_1000x1000_36_imagesheet.png',
  '3507378503': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/3C1FE7C6_1000x1000_36_imagesheet.png',
  '2432195716': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/303CCD2C_1000x1000_36_imagesheet.png',
  '5591407893': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/956BA76D_1000x1000_36_imagesheet.png',
  '356071296': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/0CC8BD08_1000x1000_36_imagesheet.png',
  '5472864163': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/4FC2478A_1000x1000_36_imagesheet.png',
  '5150226262': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/F27F8C50_1000x1000_36_imagesheet.png',
  '1837683038': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/60EDB4B6_1000x1000_36_imagesheet.png',
  '657235238': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/ECDDBBF7_1000x1000_36_imagesheet.png',
  '1670734640': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/6140177F_1000x1000_36_imagesheet.png',
  '1687816270': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/DC66325A_1000x1000_36_imagesheet.png',
  '842375222': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/8610BB8E_1000x1000_36_imagesheet.png',
  '42338382': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/A39876F4_1000x1000_20_imagesheet.png',
  '5284740155': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/23C36116_1000x1000_36_imagesheet.png',
  '328390455': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/62D79BBF_1000x1000_36_imagesheet.png',
  '5418357176': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/D7E17037_1000x1000_36_imagesheet.png',
  '5164703395': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/8AED1A86_1000x1000_36_imagesheet.png',
  '5284740154': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/3CEC0908_1000x1000_36_imagesheet.png',
  '585225061': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/EBF7AA6E_1000x1000_36_imagesheet.png',
  '1302118627': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/CBBCFB78_1000x1000_36_imagesheet.png',
  '5058418320': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/87D9C954_1000x1000_36_imagesheet.png',
  '5261547453': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/AFCF30FC_1000x1000_36_imagesheet.png',
  '3361329306': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/8EA3DBE3_1000x1000_36_imagesheet.png',
  '692612080': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/1130482B_1000x1000_36_imagesheet.png',
  '377408574': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/07D1EA7A_1000x1000_36_imagesheet.png',
  '2715667671': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/F0A6DF6D_1000x1000_36_imagesheet.png',
  '532011297': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/229D0ADA_1000x1000_36_imagesheet.png',
  '310157752': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/B18EA238_1000x1000_36_imagesheet.png',
  '815789938': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/EE93E2A1_1000x1000_36_imagesheet.png',
  '5258440302': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/112A3340_1000x1000_36_imagesheet.png',
  '1320235829': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/16FEA014_1000x1000_36_imagesheet.png',
  '3314689771': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/194B1F69_1000x1000_36_imagesheet.png',
  L1600: 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/BC61402D_1000x1000_36_imagesheet.png',
  '808385677': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/1EAEC3FC_1000x1000_36_imagesheet.png',
  '674371865': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/CCEDEFBE_1000x1000_36_imagesheet.png',
  '5587806211': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/7FE087F5_1000x1000_36_imagesheet.png',
  '5394406388': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/D9E19A8B_1000x1000_36_imagesheet.png',
  '376770374': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/17D5E29F_1000x1000_36_imagesheet.png',
  '5098686683': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/6466EDA2_1000x1000_36_imagesheet.png',
  '5113233021': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/B99DB162_1000x1000_36_imagesheet.png',
  '933584047': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/294D8C25_1000x1000_36_imagesheet.png',
  '1330138177': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/9BB1F05E_1000x1000_36_imagesheet.png',
  '721812889': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/1F6C8DB1_1000x1000_36_imagesheet.png',
  '2768475726': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/C61E641E_1000x1000_36_imagesheet.png',
  '204753035': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/7E19D37F_1000x1000_36_imagesheet.png',
  '747584156': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/CB25F3E5_1000x1000_36_imagesheet.png',
  '2916695406': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/29454BE4_1000x1000_36_imagesheet.png',
  '606463417': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/1ECAAF1B_1000x1000_36_imagesheet.png',
  '5305297350': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/5FDB0F34_1000x1000_36_imagesheet.png',
  '5080177399': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/414C0DE5_1000x1000_36_imagesheet.png',
  '5107299604': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/E294CAD1_1000x1000_36_imagesheet.png',
  '5285700180': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/1EC8B92F_1000x1000_36_imagesheet.png',
  '5505932502': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/92F89DA8_1000x1000_36_imagesheet.png',
  '5298196606': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/9921D286_1000x1000_36_imagesheet.png',
  '5332703727': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/5244C6A4_1000x1000_36_imagesheet.png',
  '5229777513': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/A2B08E5E_1000x1000_36_imagesheet.png',
  '5226743314': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/EACDAF26_1000x1000_36_imagesheet.png',
  '5226743317': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/D91B6FC5_1000x1000_36_imagesheet.png',
  '598189800': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/AD9F60E5_1000x1000_36_imagesheet.png',
  '667585597': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/7C9F5035_1000x1000_36_imagesheet.png',
  '5060014542': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/C2E43139_1000x1000_36_imagesheet.png',
  '1159472934': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/B22FD370_1000x1000_36_imagesheet.png',
  '25475810': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/12ADF12C_1000x1000_36_imagesheet.png',
  '1020921431': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/CF550BB5_1000x1000_36_imagesheet.png',
  '5332753297': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/083A007F_1000x1000_36_imagesheet.png',
  '1860038081': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/C01CDB5E_1000x1000_36_imagesheet.png',
  '773849787': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/8D6D28CA_1000x1000_36_imagesheet.png',
  '5316176930': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/EC24B5F6_1000x1000_36_imagesheet.png',
  '5223602392': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/D7F4B050_1000x1000_36_imagesheet.png',
  '5202940614': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/2BFA78F2_1000x1000_36_imagesheet.png',
  '5096127326': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/86494412_1000x1000_36_imagesheet.png',
  '5080177385': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/4AA6C7B5_1000x1000_36_imagesheet.png',
  '2290765622': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/A6EB7E42_1000x1000_36_imagesheet.png',
  '2118965613': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/F6CFB5EC_1000x1000_36_imagesheet.png',
  '1528649331': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/18D07B83_1000x1000_36_imagesheet.png',
  '3977610044': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/31E57ACE_1000x1000_36_imagesheet.png',
  '1926602169': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/103385A8_1000x1000_36_imagesheet.png',
  '5152670558': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/83B561CF_1000x1000_36_imagesheet.png',
  '5392323230': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/C81EA43E_1000x1000_36_imagesheet.png',
  '896733560': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/C976DCB6_1000x1000_36_imagesheet.png',
  '196004687': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/FAC8DB1B_1000x1000_36_imagesheet.png',
  '48322712': 'assets/d0743cea-793c-4e8c-9b33-2e99e28e3ef8/public/media/images/2EFDFCBA_1000x1000_36_imagesheet.png',
};
