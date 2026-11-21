export type MenuItem = {
  id: string;
  name: { en: string; ar: string };
  description: { en: string; ar: string };
  price: string;
};

export type MenuCategory = {
  id: string;
  labelKey: string;
  kickerKey: string;
  description: { en: string; ar: string };
  items: MenuItem[];
};

export const MENU: MenuCategory[] = [
  {
    id: "aperitifs",
    labelKey: "cat.aperitifs",
    kickerKey: "cat.aperitifs",
    description: {
      en: "Golden-hour cocktails built for the rooftop — rare spirits, smoke, and citrus oils stirred over hand-cut ice.",
      ar: "كوكتيلات ساعة الغروب صُمّمت للسطح — أرواح نادرة، دخان، وزيوك حمضيّة فوق ثلج مقطوع يدوياً.",
    },
    items: [
      {
        id: "aurelia-spritz",
        name: { en: "Aurelia Spritz", ar: "سبريتز أوريليا" },
        description: {
          en: "Champagne, blood orange cordial, Salers gentian, smoked sea salt rim.",
          ar: "شمبانيا، كورديال برتقال دموي، جنتيان سالير، حافة ملح بحري مدخّن.",
        },
        price: "22",
      },
      {
        id: "midnight-negroni",
        name: { en: "Midnight Negroni", ar: "نيغروني منتصف الليل" },
        description: {
          en: "Bourbon-barrel gin, Campari, Carpano Antica, orange peel oils.",
          ar: "جين برميل بوربون، كامباري، كاربانو أنتيكا، زيوك قشر برتقال.",
        },
        price: "20",
      },
      {
        id: "sky-champagne",
        name: { en: "Sky Pour — Krug Grande Cuvée", ar: "سكاي بور — كروغ غران كوفيه" },
        description: {
          en: "170-ème Édition, served beside a quartz of aged Parmesan and honeycomb.",
          ar: "إصدار 170، يُقدَّم بجانب قطعة بارميزان معيّنة وقرص العسل.",
        },
        price: "48",
      },
      {
        id: "amber-gimlet",
        name: { en: "Amber Gimlet", ar: "جيملت أمبر" },
        description: {
          en: "Mezcal, dry curaçao, lime leaf, salted honey, charred rosemary.",
          ar: "ميزكال، كوراسو جاف، ورق لايم، عسل مملّح، إكليل جبل محمّص.",
        },
        price: "19",
      },
    ],
  },
  {
    id: "raw",
    labelKey: "cat.raw",
    kickerKey: "cat.raw",
    description: {
      en: "A bar of ice, a single oyster, a curl of citrus. The purest expression of the kitchen.",
      ar: "حاجز من الثلج، محارة واحدة، لفافة حمضيّة. أنقى تعبير عن المطبخ.",
    },
    items: [
      {
        id: "kumamoto",
        name: { en: "Kumamoto Oyster", ar: "محارة كوماموتو" },
        description: {
          en: "Half-shell, mignonette of champagne vinegar, finger lime, bronze leaf.",
          ar: "نصف صدفة، ميونيت خل شمبانيا، لايم إصبعي، ورق برونزي.",
        },
        price: "9",
      },
      {
        id: "hamachi-crudo",
        name: { en: "Hamachi Crudo", ar: "هاماتشي كرودو" },
        description: {
          en: "Yellowtail, blood orange, fennel pollen, Castelvetrano olive, Sicilian oil.",
          ar: "ذيل أصفر، برتقال دموي، لقاح الشمر، زيتون كاستلفيترانو، زيت صقلي.",
        },
        price: "26",
      },
      {
        id: "wagyu-tartare",
        name: { en: "Wagyu Tartare", ar: "تارتار واغيو" },
        description: {
          en: "Hand-cut A5, smoked yolk, capers, mustard flower, toasted brioche.",
          ar: "A5 مقطوع يدوياً، صفار مدخّن، كابرز، زهرة الخردل، بريوش محمّص.",
        },
        price: "32",
      },
      {
        id: "caviar-service",
        name: { en: "Caviar Service", ar: "تقديم الكافيار" },
        description: {
          en: "Kaluga Reserve, crème fraîche, warm blini, chive blossom.",
          ar: "كالوغا ريزرف، كريم فريش، بليني دافئ، زهرة الكرّاث.",
        },
        price: "145",
      },
    ],
  },
  {
    id: "small",
    labelKey: "cat.small",
    kickerKey: "cat.small",
    description: {
      en: "Cooked over olive wood and embers. For sharing at the rail as the city lights come up.",
      ar: "مطبوخ على خشب الزيتون والجمر. للمشاركة عند الحاجز مع إضاءة المدينة.",
    },
    items: [
      {
        id: "bruschetta",
        name: { en: "Heirloom Bruschetta", ar: "بروشيتا هيرلووم" },
        description: {
          en: "Sourdough, smoked tomato, stracciatella, basil oil, Maldon.",
          ar: "خبز خميرة، طماطم مدخّنة، ستراتشاتيلا، زيت ريحان، مالدون.",
        },
        price: "18",
      },
      {
        id: "burrata",
        name: { en: "Burrata di Andria", ar: "بوراتا دي أندريا" },
        description: {
          en: "Pugliese burrata, white peach, prosciutto di Parma, aged balsamic.",
          ar: "بوراتا بولييزي، خوخ أبيض، بروسكيوتو دي بارما، بلسميك معتّق.",
        },
        price: "24",
      },
      {
        id: "octopus",
        name: { en: "Galician Octopus", ar: "أخطبوط غاليسي" },
        description: {
          en: "Charred tentacle, smoked paprika, confit potato, romesco, lemon ash.",
          ar: "مِخلب محمّص، بابريكا مدخّنة، بطاطا كونفيت، روميسكو، رمّ ليمون.",
        },
        price: "28",
      },
      {
        id: "garden-salad",
        name: { en: "Garden at Dusk", ar: "حديقة الغسق" },
        description: {
          en: "Roasted heritage beet, whipped goat cheese, candied walnut, sherry.",
          ar: "شمندر مُحمَّص، جبن ماعز مخفوق، جوز مكرمل، شيري.",
        },
        price: "16",
      },
    ],
  },
  {
    id: "mains",
    labelKey: "cat.mains",
    kickerKey: "cat.mains",
    description: {
      en: "Aged over embers, finished under the sky. Each plate composed to be eaten slowly, with the view.",
      ar: "معتّق على الجمر، منتهٍ تحت السماء. كل طبق مركّب ليُؤكل ببطء، مع الإطلالة.",
    },
    items: [
      {
        id: "dry-age-ribeye",
        name: { en: "45-Day Dry-Aged Ribeye", ar: "ريب آي جاف ٤٥ يوماً" },
        description: {
          en: "12 oz, olive wood smoke, bone marrow butter, charred shallot.",
          ar: "٣٤٠ غرام، دخان خشب الزيتون، زبدة نقي العظم، شالوت محمّص.",
        },
        price: "76",
      },
      {
        id: "milk-lamb",
        name: { en: "Milk-Fed Lamb", ar: "حمل بليب اللبن" },
        description: {
          en: "Rack, lamb shoulder croquette, aubergine purée, sumac, mint oil.",
          ar: "ضلع، كروكييت كتف الحمل، بوريه باذنجان، سماق، زيت نعناع.",
        },
        price: "58",
      },
      {
        id: "saffron-risotto",
        name: { en: "Saffron Risotto", ar: "ريزوتو الزعفران" },
        description: {
          en: "Carnaroli, Persian saffron, Parmigiano 36 mo., brown butter, gold leaf.",
          ar: "كارنارولي، زعفران فارسي، بارميجانو ٣٦ شهراً، زبدة بنية، ورق ذهب.",
        },
        price: "38",
      },
      {
        id: "sea-bass",
        name: { en: "Wild Sea Bass", ar: "قاروص بري" },
        description: {
          en: "Whole fish, fennel, preserved lemon, harissa, charred herb oil.",
          ar: "سمكة كاملة، شمر، ليمون محفوظ، هريسة، زيت أعشاب محمّص.",
        },
        price: "52",
      },
    ],
  },
  {
    id: "sweets",
    labelKey: "cat.sweets",
    kickerKey: "cat.sweets",
    description: {
      en: "Desserts composed for the moment the sun leaves the sky.",
      ar: "حلويات مركّبة للحظة مغادرة الشمس للسماء.",
    },
    items: [
      {
        id: "dark-chocolate",
        name: { en: "70% Venezuela", ar: "فنزويلا ٧٠٪" },
        description: {
          en: "Single-origin ganache, smoked sea salt, cocoa nib, olive oil.",
          ar: "غاناش أصلي واحد، ملح بحري مدخّن، كاكاو نيب، زيت زيتون.",
        },
        price: "18",
      },
      {
        id: "citrus-soleil",
        name: { en: "Citrus Soleil", ar: "سيترك سولاي" },
        description: {
          en: "Blood orange, mandarin sorbet, vanilla cream, candied zest.",
          ar: "برتقال دموي، سوربيه يوسفي، كريم فانيليا، قشر مكرمل.",
        },
        price: "16",
      },
      {
        id: "tarte-citron",
        name: { en: "Tarte au Citron", ar: "تارت أو سيتر" },
        description: {
          en: "Meyer lemon curd, toasted meringue, basil, shortbread crumb.",
          ar: "كورد ليمون ماير، ميرانغ محمّص، ريحان، فُتات شورتبريد.",
        },
        price: "17",
      },
      {
        id: "gelato-trio",
        name: { en: "Gelato Trio", ar: "ثلاثية جيلاتو" },
        description: {
          en: "Pistachio di Bronte, amarena cherry, dark chocolate crumble.",
          ar: "فستاق برونتي، كرز أمارينا، فُتات شوكولاتة داكنة.",
        },
        price: "15",
      },
    ],
  },
];

