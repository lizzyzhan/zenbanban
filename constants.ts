
import { Quote, AuthorOption } from './types';

export const INITIAL_QUOTES: Quote[] = [
  // 荣格 (Carl Jung)
  { id: 'jung_1', text: '向外看的人在做梦，向内看的人是清醒的。', author: '卡尔·荣格', source: '书信集' },
  { id: 'jung_2', text: '你没有潜意识，你的命运就会像幽灵一样控制你。', author: '卡尔·荣格', source: '' },
  { id: 'jung_3', text: '孤独并不是来自身边无人，而是感到自己无法与他人交流重要的事情。', author: '卡尔·荣格', source: '回忆、梦、思考' },
  { id: 'jung_4', text: '没得过神经症的人，是无法真正理解痛苦的意义的。', author: '卡尔·荣格', source: '' },
  { id: 'jung_5', text: '一个人毕其一生的努力，就是在整合他自童年时代起就已形成的性格。', author: '卡尔·荣格', source: '' },
  { id: 'jung_6', text: '对于普通人来说，一生最重要的功课就是学会接受自己。', author: '卡尔·荣格', source: '' },
  { id: 'jung_7', text: '所有对他人的恼怒，都通向对自己的理解。', author: '卡尔·荣格', source: '' },
  { id: 'jung_8', text: '思想的动摇并非懦弱，而是理智的体现。', author: '卡尔·荣格', source: '' },
  { id: 'jung_9', text: '没有任何一种觉醒是不带着痛苦的。', author: '卡尔·荣格', source: '' },
  { id: 'jung_10', text: '我们看待事物的方式，决定了事物对我们的意义。', author: '卡尔·荣格', source: '' },
  { id: 'jung_11', text: '假如你具有天赋，那并不是什么值得骄傲的事，因为那不是你的成就，而是你的义务。', author: '卡尔·荣格', source: '' },
  { id: 'jung_12', text: '由于我们拒绝承认阴影，阴影便在潜意识中疯狂生长。', author: '卡尔·荣格', source: '' },
  { id: 'jung_13', text: '性格决定命运。', author: '卡尔·荣格', source: '' },
  { id: 'jung_14', text: '生活也是一种艺术，想要把生活过得好，就得像艺术家一样投入。', author: '卡尔·荣格', source: '' },
  { id: 'jung_15', text: '只有当这种生活方式与我们内心的本性相一致时，我们才能感到幸福。', author: '卡尔·荣格', source: '' },

  // 埃里希·佛罗姆 (Erich Fromm)
  { id: 'fromm_1', text: '如果你不能爱你自己，你就无法爱别人。自爱不是自私，它是爱别人的基础。', author: '埃里希·佛罗姆', source: '爱的艺术' },
  { id: 'fromm_2', text: '真正的自由不是摆脱外在的束缚，而是拥有对自己行为的真实选择权。', author: '埃里希·佛罗姆', source: '逃避自由' },
  { id: 'fromm_3', text: '爱不是一种情感，而是一种决断，一种判断，一种承诺。', author: '埃里希·佛罗姆', source: '爱的艺术' },
  { id: 'fromm_4', text: '现代人生活在幻觉中，他以为自己知道自己想要什么，而实际上他想要的只是别人期望他要的东西。', author: '埃里希·佛罗姆', source: '' },
  { id: 'fromm_5', text: '创造力需要有勇气放弃确定性。', author: '埃里希·佛罗姆', source: '' },
  { id: 'fromm_6', text: '如果不时刻警惕地捍卫自己的自由，我们就会失去它。', author: '埃里希·佛罗姆', source: '' },
  { id: 'fromm_7', text: '成熟的爱是：我需要你，因为我爱你。不成熟的爱是：我爱你，因为我需要你。', author: '埃里希·佛罗姆', source: '爱的艺术' },
  { id: 'fromm_8', text: '只有能够独立自主的人，才能在爱中保持自我，而不是在爱中迷失。', author: '埃里希·佛罗姆', source: '' },
  { id: 'fromm_9', text: '人们对自由的渴望，常常被对安全的渴望所掩盖。', author: '埃里希·佛罗姆', source: '' },
  { id: 'fromm_10', text: '尊重意味着关注对方让其以自己的个性成长和发展。', author: '埃里希·佛罗姆', source: '' },
  { id: 'fromm_11', text: '大多数人并非因为爱而结合，而是因为无法忍受孤独。', author: '埃里希·佛罗姆', source: '' },
  { id: 'fromm_12', text: '生命的任务就是赋予生命以意义。', author: '埃里希·佛罗姆', source: '' },
  { id: 'fromm_13', text: '贪婪是一个无底洞，它耗尽了人无穷的精力，却永远无法满足。', author: '埃里希·佛罗姆', source: '' },
  { id: 'fromm_14', text: '并不是拥有很多的人富有，而是给予很多的人富有。', author: '埃里希·佛罗姆', source: '' },
  { id: 'fromm_15', text: '生而为人的冒险，就是从被动状态走向主动状态。', author: '埃里希·佛罗姆', source: '' },

  // 尼采 (Friedrich Nietzsche)
  { id: 'nietzsche_1', text: '每一个不曾起舞的日子，都是对生命的辜负。', author: '弗里德里希·尼采', source: '查拉图斯特拉如是说' },
  { id: 'nietzsche_2', text: '凡杀不死我的，必使我更强大。', author: '弗里德里希·尼采', source: '偶像的黄昏' },
  { id: 'nietzsche_3', text: '当你凝视深渊时，深渊也在凝视你。', author: '弗里德里希·尼采', source: '善恶的彼岸' },
  { id: 'nietzsche_4', text: '一个人知道自己为什么而活，就可以忍受任何一种生活。', author: '弗里德里希·尼采', source: '' },
  { id: 'nietzsche_5', text: '其实人跟树是一样的，越是向往高处的阳光，它的根就越要伸向黑暗的地底。', author: '弗里德里希·尼采', source: '查拉图斯特拉如是说' },
  { id: 'nietzsche_6', text: '对待生命不妨大胆冒险一点，因为好歹你要失去它。', author: '弗里德里希·尼采', source: '' },
  { id: 'nietzsche_7', text: '受苦的人，没有悲观的权利。', author: '弗里德里希·尼采', source: '' },
  { id: 'nietzsche_8', text: '不能听命于自己者，就要受命于他人。', author: '弗里德里希·尼采', source: '' },
  { id: 'nietzsche_9', text: '高贵的灵魂，是自己尊敬自己。', author: '弗里德里希·尼采', source: '' },
  { id: 'nietzsche_10', text: '没有可怕的深度，就没有美丽的水面。', author: '弗里德里希·尼采', source: '' },
  { id: 'nietzsche_11', text: '谁终将声震人间，必长久深自缄默。', author: '弗里德里希·尼采', source: '' },
  { id: 'nietzsche_12', text: '要破坏一件事，最刁钻的办法是：故意用歪理去辩护。', author: '弗里德里希·尼采', source: '' },
  { id: 'nietzsche_13', text: '一知半解比无知更危险。', author: '弗里德里希·尼采', source: '' },
  { id: 'nietzsche_14', text: '自从我厌倦了寻找，便学会了找到。', author: '弗里德里希·尼采', source: '' },
  { id: 'nietzsche_15', text: '你的良知在说什么？——“你要成为你自己。”', author: '弗里德里希·尼采', source: '快乐的科学' },

  // 弗洛伊德 (Sigmund Freud)
  { id: 'freud_1', text: '未被表达的情绪永远不会消失。它们只是被活埋了，并将在未来以更丑陋的方式涌现。', author: '西格蒙德·弗洛伊德', source: '' },
  { id: 'freud_2', text: '人生有两大悲剧：一个是没有得到你心爱的东西；另一个是得到了。', author: '西格蒙德·弗洛伊德', source: '' },
  { id: 'freud_3', text: '精神健康的人，总是努力的工作及爱人。', author: '西格蒙德·弗洛伊德', source: '' },
  { id: 'freud_4', text: '没有口误这回事，所有的口误都是潜意识的真情流露。', author: '西格蒙德·弗洛伊德', source: '' },
  { id: 'freud_5', text: '人之所以会感到痛苦，是因为我们在追求一种不存在的圆满。', author: '西格蒙德·弗洛伊德', source: '' },
  { id: 'freud_6', text: '在这个世界上，没有所谓的玩笑，所有的玩笑都有认真的成分。', author: '西格蒙德·弗洛伊德', source: '' },
  { id: 'freud_7', text: '良心是一种内心的知觉，它是我们在做每件事时，对这一行为是否正确的一种情感反应。', author: '西格蒙德·弗洛伊德', source: '' },
  { id: 'freud_8', text: '梦是愿望的达成。', author: '西格蒙德·弗洛伊德', source: '梦的解析' },
  { id: 'freud_9', text: '大部分人并不真的想要自由，因为自由包含责任，而大多数人害怕责任。', author: '西格蒙德·弗洛伊德', source: '' },
  { id: 'freud_10', text: '我们对自己越坦诚，就越能了解别人。', author: '西格蒙德·弗洛伊德', source: '' },
  { id: 'freud_11', text: '禁欲是焦虑的根源。', author: '西格蒙德·弗洛伊德', source: '' },
  { id: 'freud_12', text: '任何人都无法保守秘密。如果他的嘴唇紧闭，他的指尖也会说话。', author: '西格蒙德·弗洛伊德', source: '' },
  { id: 'freud_13', text: '爱和工作是人性的基石。', author: '西格蒙德·弗洛伊德', source: '' },

  // 森田正马 (Shoma Morita)
  { id: 'morita_1', text: '对于既成事实，要顺其自然；对于即将来临的事，要听其自然。', author: '森田正马', source: '森田疗法' },
  { id: 'morita_2', text: '带着症状生活，为所当为。', author: '森田正马', source: '森田疗法' },
  { id: 'morita_3', text: '情绪如天气，变幻无常是自然的；行为如土地，是可以耕耘和改变的。', author: '森田正马', source: '' },
  { id: 'morita_4', text: '接受不安，正如接受寒冷和炎热一样。', author: '森田正马', source: '' },
  { id: 'morita_5', text: '痛苦是因为我们试图去消除那些无法消除的东西。', author: '森田正马', source: '' },
  { id: 'morita_6', text: '事实唯真。不要欺骗自己，承认当下的真实感受。', author: '森田正马', source: '' },
  { id: 'morita_7', text: '想睡就睡，睡不着就醒着，不要强迫自己。', author: '森田正马', source: '' },
  { id: 'morita_8', text: '放弃对“正常”的执念，接纳“异常”的自己。', author: '森田正马', source: '' },
  { id: 'morita_9', text: '行动是治疗恐惧的良药。', author: '森田正马', source: '' },
  { id: 'morita_10', text: '与其在脑海中进行千万次思想斗争，不如动手做一件小事。', author: '森田正马', source: '' },
  { id: 'morita_11', text: '纯洁的心不是没有杂念，而是不被杂念所束缚。', author: '森田正马', source: '' },
  { id: 'morita_12', text: '越是抗拒，越是存在。', author: '森田正马', source: '' },

  // 其他哲学/心理学
  { id: 'misc_1', text: '人不是被事情本身困扰，而是被对事情的看法困扰。', author: '爱比克泰德', source: '斯多葛学派' },
  { id: 'misc_2', text: '我们最大的光荣不在于从不跌倒，而在于每次跌倒后都能站起来。', author: '孔子', source: '' },
  { id: 'misc_3', text: '知人者智，自知者明。', author: '老子', source: '道德经' },
  { id: 'misc_4', text: '未经审视的人生是不值得过的。', author: '苏格拉底', source: '' },
  { id: 'misc_5', text: '生活不是等待风暴过去，而是学会在雨中跳舞。', author: '塞内卡', source: '' },
  { id: 'misc_6', text: '你所抵抗的，会持续存在。', author: '卡尔·荣格', source: '' }, // Duplicate theme but popular
  { id: 'misc_7', text: '为了发现海洋的新领域，你必须有勇气迷失岸边的视线。', author: '安德烈·纪德', source: '' },
];

export const AUTHORS: AuthorOption[] = [
  { id: 'jung', name: '荣格 (Carl Jung)', style: '深入潜意识、梦境分析、集体潜意识、内省' },
  { id: 'fromm', name: '佛罗姆 (Erich Fromm)', style: '爱、自由、人本主义、社会心理' },
  { id: 'morita', name: '森田正马 (Shoma Morita)', style: '顺其自然、为所当为、接纳焦虑' },
  { id: 'freud', name: '弗洛伊德 (Sigmund Freud)', style: '潜意识、本我自我超我、童年影响' },
  { id: 'nietzsche', name: '尼采 (Friedrich Nietzsche)', style: '超人哲学、权力意志、生命的肯定' },
];

// 30+ Curated Meditation Backgrounds (Unsplash)
export const BACKGROUND_IMAGES = [
  'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?q=80&w=2574&auto=format&fit=crop', // Rain/Window
  'https://images.unsplash.com/photo-1448375240586-dfd8f3f1d8db?q=80&w=2574&auto=format&fit=crop', // Forest
  'https://images.unsplash.com/photo-1505118380757-91f5f6aa59fe?q=80&w=2574&auto=format&fit=crop', // Ocean
  'https://images.unsplash.com/photo-1479030160180-b1860951d6ec?q=80&w=2574&auto=format&fit=crop', // Zen Stone
  'https://images.unsplash.com/photo-1528353518132-131198606d5d?q=80&w=2574&auto=format&fit=crop', // Japan Temple
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2574&auto=format&fit=crop', // Beach Calm
  'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=2574&auto=format&fit=crop', // Foggy Forest
  'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?q=80&w=2574&auto=format&fit=crop', // Starry Night
  'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?q=80&w=2576&auto=format&fit=crop', // Dark Forest
  'https://images.unsplash.com/photo-1501854140884-074cf2b2c7c8?q=80&w=2670&auto=format&fit=crop', // Mountain Lake
  'https://images.unsplash.com/photo-1499722613198-ff7599696200?q=80&w=2574&auto=format&fit=crop', // Minimalist Sky
  'https://images.unsplash.com/photo-1535025639604-9a804c092faa?q=80&w=2573&auto=format&fit=crop', // Light through leaves
  'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?q=80&w=2571&auto=format&fit=crop', // Tea Ceremony
  'https://images.unsplash.com/photo-1605125235593-69874e94e125?q=80&w=2670&auto=format&fit=crop', // Bonsai
  'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2670&auto=format&fit=crop', // Snowy Mountain
  'https://images.unsplash.com/photo-1508672019048-805c27617bc8?q=80&w=2574&auto=format&fit=crop', // Autumn Path
  'https://images.unsplash.com/photo-1526725702345-bdda2b97ef73?q=80&w=2667&auto=format&fit=crop', // Architecture Steps
  'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?q=80&w=2670&auto=format&fit=crop', // Green leaves
  'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=2574&auto=format&fit=crop', // Wheat field
  'https://images.unsplash.com/photo-1504608524841-42032aaa9c74?q=80&w=2670&auto=format&fit=crop', // Concrete Minimal
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2670&auto=format&fit=crop', // Yosemite Stream
  'https://images.unsplash.com/photo-1472214103451-9374bd1c7dd1?q=80&w=2574&auto=format&fit=crop', // Sunrise
  'https://images.unsplash.com/photo-1536630596256-c14f510fbfa6?q=80&w=2574&auto=format&fit=crop', // Candle
  'https://images.unsplash.com/photo-1507041957456-9c397ce39c97?q=80&w=2574&auto=format&fit=crop', // Forest morning
  'https://images.unsplash.com/photo-1596395819057-e37f55a8518a?q=80&w=2574&auto=format&fit=crop', // Incense
  'https://images.unsplash.com/photo-1504221507732-5246c045949b?q=80&w=2670&auto=format&fit=crop', // Gold Buddha
  'https://images.unsplash.com/photo-1542856391-010fb87dcfed?q=80&w=2574&auto=format&fit=crop', // River rocks
  'https://images.unsplash.com/photo-1516093355-b4c275561994?q=80&w=2574&auto=format&fit=crop', // Tree silhouette
  'https://images.unsplash.com/photo-1491466424936-e304919aada7?q=80&w=2569&auto=format&fit=crop', // Desolate field
  'https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=2574&auto=format&fit=crop', // Sun ray
];

export const NATURE_SOUNDS = [
  { 
    id: 'rain', 
    name: '雨夜', 
    color: 'bg-blue-100 text-blue-800',
    audioUrl: 'https://actions.google.com/sounds/v1/weather/rain_heavy_loud.ogg'
  },
  { 
    id: 'forest', 
    name: '森林', 
    color: 'bg-green-100 text-green-800',
    audioUrl: 'https://actions.google.com/sounds/v1/ambiences/forest_afternoon.ogg'
  },
  { 
    id: 'waves', 
    name: '海浪', 
    color: 'bg-teal-100 text-teal-800',
    audioUrl: 'https://actions.google.com/sounds/v1/water/waves_crashing.ogg'
  },
  { 
    id: 'fire', 
    name: '篝火', 
    color: 'bg-orange-100 text-orange-800',
    audioUrl: 'https://actions.google.com/sounds/v1/ambiences/fire.ogg'
  },
  { 
    id: 'night', 
    name: '夏夜', 
    color: 'bg-indigo-100 text-indigo-800',
    audioUrl: 'https://actions.google.com/sounds/v1/ambiences/warm_summer_night.ogg'
  },
  { 
    id: 'stream', 
    name: '溪流', 
    color: 'bg-cyan-100 text-cyan-800',
    audioUrl: 'https://actions.google.com/sounds/v1/water/brook.ogg'
  },
  { 
    id: 'silence', 
    name: '静默', 
    color: 'bg-gray-100 text-gray-800',
    audioUrl: '' 
  },
];
