/**
 * TRIPORA — Pure Vanilla JavaScript Engine
 * Modern travel discovery, interactive filters, sorting, localStorage favorites,
 * modal details viewer and demonstration booking disclaimer.
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. Data Store: 12 Rich Demonstration Destinations
  // =========================================================================
  const DESTINATIONS = [
    {
      id: 'santorini',
      title: 'Санторини: Ия и Фира',
      country: 'Греция',
      category: 'sea',
      categoryName: 'Пляжи и острова',
      days: 7,
      price: 142000,
      season: 'Май — Октябрь',
      rating: 4.95,
      shortDesc: 'Белоснежные террасы над Эгейским морем, лазурные купола церквей и знаменитые закаты кальдеры.',
      fullDesc: 'Погрузитесь в атмосферу самого романтичного острова Средиземноморья. В программу входит размещение в аутентичном отеле в скалах Ии, дегустация ассиртико на вулканической винодельне, морская прогулка на парусном катамаране к горячим источникам Неа-Камени и прогулки по улочкам древней Фиры.',
      itinerary: [
        { day: 'День 1', text: 'Прилет в Тиру, трансфер в панорамный отель, приветственный ужин с видом на кальдеру.' },
        { day: 'День 2', text: 'Пешая прогулка по Ие, осмотр византийских руин и фотосессия на закате.' },
        { day: 'День 3', text: 'Круиз на парусном катамаране: Красный и Белый пляжи, снорклинг и обед со свежими морепродуктами.' },
        { day: 'День 4-5', text: 'Тур по винодельням Санторини, посещение археологического музея Акротири.' },
        { day: 'День 6-7', text: 'Свободный день для отдыха у бассейна-инфинити и вылет домой.' }
      ],
      included: ['Перелет регулярным рейсом', 'Отель 4* с завтраками', 'Морской круиз на катамаране', 'Групповой трансфер'],
      svgTheme: 'santorini'
    },
    {
      id: 'zermatt',
      title: 'Церматт и пик Маттерхорн',
      country: 'Швейцария',
      category: 'mountains',
      categoryName: 'Горы и треккинг',
      days: 8,
      price: 215000,
      season: 'Июнь — Сентябрь / Декабрь — Апрель',
      rating: 4.98,
      shortDesc: 'Величественный четырехгранный пик Альп, кристальные ледниковые озера и альпийский уют Церматта.',
      fullDesc: 'Швейцарские Альпы во всем великолепии: подъем на зубчатой железной дороге Горнерграт на высоту 3 089 м, виды на 29 четырехтысячников, прогулки вокруг зеркального озера Риффельзее и проживание в уютном деревянном шале с видом на Маттерхорн.',
      itinerary: [
        { day: 'День 1', text: 'Прибытие в Цюрих, панорамный поезд в безмашинный курорт Церматт.' },
        { day: 'День 2', text: 'Подъем на поезде Gornergrat Bahn, фотопанорама ледника Горнер.' },
        { day: 'День 3', text: 'Треккинг 5 озер (5-Seenweg) с отражением Маттерхорна в глади воды.' },
        { day: 'День 4-6', text: 'Канатная дорога Matterhorn Glacier Paradise, посещение ледового дворца на высоте 3883 м.' },
        { day: 'День 7-8', text: 'Швейцарское фондю в традиционном ресторане, трансфер в аэропорт.' }
      ],
      included: ['Swiss Travel Pass 1-го класса', 'Шале 4* в Церматте', 'Билеты на Gornergrat', 'Медстраховка для активного отдыха'],
      svgTheme: 'matterhorn'
    },
    {
      id: 'kyoto',
      title: 'Киото, Нара и Арасияма',
      country: 'Япония',
      category: 'culture',
      categoryName: 'Культура и история',
      days: 10,
      price: 189000,
      season: 'Март — Май / Сентябрь — Ноябрь',
      rating: 4.96,
      shortDesc: 'Тысячелетние синтоистские святилища, шепот бамбуковой рощи и медитативные сады камней.',
      fullDesc: 'Погружение в сердце японской традиции. Прогулка по бесконечным алым ториям Фусими Инари, бамбуковый лес Арасияма, Золотой павильон Кинкаку-дзи, знакомство с дружелюбными оленями в древнем парке Нары и традиционная чайная церемония в квартале гейш Гион.',
      itinerary: [
        { day: 'День 1-2', text: 'Прилет в Осаку/Кансай, скоростной синкансэн в Киото, вечерний Гион.' },
        { day: 'День 3', text: 'Ранний подъем к Фусими Инари-тайся, посещение храма чистой воды Киёмидзу-дэра.' },
        { day: 'День 4-5', text: 'Бамбуковая роща Сагано, обезьяний парк Иватаяма и дзен-храм Тэнрю-дзи.' },
        { day: 'День 6-7', text: 'Поездка на день в Нару: Великий Будда Тодай-дзи и кормление священных оленей.' },
        { day: 'День 8-10', text: 'Урок каллиграфии, мастер-класс по матча, гастрономический рынок Нисики и вылет.' }
      ],
      included: ['Скоростной проездной JR Pass', 'Традиционный рёкан с онсэном + отель 4*', 'Русскоязычный гид-японист', 'Чайная церемония'],
      svgTheme: 'kyoto'
    },
    {
      id: 'maldives',
      title: 'Атолл Баа: Биосферный заповедник',
      country: 'Мальдивы',
      category: 'sea',
      categoryName: 'Пляжи и острова',
      days: 9,
      price: 265000,
      season: 'Круглый год (лучше ноябрь — апрель)',
      rating: 4.99,
      shortDesc: 'Виллы над бирюзовой лагуной, домашний коралловый риф и плавание со скатами-манта в бухте Ханифару.',
      fullDesc: 'Идеальное уединение посреди Индийского океана. Проживание на просторной водной вилле с собственным спуском в океан, снорклинг с черепахами и безобидными рифовыми акулами, спа-процедуры под шум прибоя и романтические ужины на песке при свечах.',
      itinerary: [
        { day: 'День 1', text: 'Прилет в Мале, перелет на живописном гидросамолете прямо к причалу резорта.' },
        { day: 'День 2-3', text: 'Знакомство с домашним рифом, снорклинг-экскурсия с морским биологом.' },
        { day: 'День 4-5', text: 'Морская экспедиция в бухту Ханифару для наблюдения за гигантскими скатами манта.' },
        { day: 'День 6-7', text: 'Сеанс ароматерапии в спа-павильоне над водой, круиз на закате за дельфинами.' },
        { day: 'День 8-9', text: 'Завтрак на плавающем подносе в бассейне виллы, гидросамолет в Мале.' }
      ],
      included: ['Трансфер на гидросамолете (Seaplane)', 'Overwater Villa с завтраками и ужинами', 'Снаряжение для снорклинга', 'Круиз к дельфинам'],
      svgTheme: 'maldives'
    },
    {
      id: 'amalfi',
      title: 'Амальфи, Позитано и Капри',
      country: 'Италия',
      category: 'sea',
      categoryName: 'Пляжи и острова',
      days: 7,
      price: 158000,
      season: 'Апрель — Октябрь',
      rating: 4.93,
      shortDesc: 'Пастельные домики над Тирренским морем, аромат лимонных садов и живописные серпантины.',
      fullDesc: 'Жемчужина южной Италии. Панорамные террасы Равелло, колоритные лестницы Позитано, катерная прогулка к Голубому гроту острова Капри и дегустация настоящего неаполитанского лимончелло с видом на отвесные скалы.',
      itinerary: [
        { day: 'День 1', text: 'Прибытие в Неаполь, живописный трансфер на побережье Амальфи.' },
        { day: 'День 2', text: 'Прогулка по Позитано, отдых на галечном пляже Спьяджа-Гранде.' },
        { day: 'День 3', text: 'Паром на остров Капри: Фаральони, сады Августа и фуникулер в Анакапри.' },
        { day: 'День 4-5', text: 'Подъем в высокогорный Равелло: виллы Руфоло и Чимброне с панорамой залива.' },
        { day: 'День 6-7', text: 'Пешеходная Тропа Богов (Sentiero degli Dei) и прощальный ужин в Сорренто.' }
      ],
      included: ['Бутик-отель с видом на море', 'Билеты на паромы по побережью', 'Аренда автомобиля или трансферы', 'Гастрономическая дегустация'],
      svgTheme: 'amalfi'
    },
    {
      id: 'geiranger',
      title: 'Фьорды Гейрангер и Олесунн',
      country: 'Норвегия',
      category: 'adventure',
      categoryName: 'Приключения и природа',
      days: 6,
      price: 174000,
      season: 'Июнь — Август',
      rating: 4.97,
      shortDesc: 'Глубокие изумрудные воды фьордов ЮНЕСКО, грохочущие водопады «Семь сестер» и ар-нуво Олесунна.',
      fullDesc: 'Путешествие в край скандинавских легенд. Круиз по узкому Гейрангер-фьорду, головокружительный серпантин «Дорога троллей» (Trollstigen), каякинг среди отвесных скал и ночлег в уютных деревянных домиках у кромки воды.',
      itinerary: [
        { day: 'День 1', text: 'Прилет в Олесунн, подъем на смотровую Аксла, знакомство со стилем модерн.' },
        { day: 'День 2', text: 'Переезд в Гейрангер через горный перевал с остановкой на смотровой Флюдалсьювет.' },
        { day: 'День 3', text: 'Круиз на пароме вдоль водопадов Семь Сестер и Жених.' },
        { day: 'День 4', text: 'Поездка по легендарной Лестнице Троллей (Trollstigen) и ущелью Гудбрандсьювет.' },
        { day: 'День 5-6', text: 'Сафари на скоростных лодках RIB по Сторфьорду и возвращение в Олесунн.' }
      ],
      included: ['Аренда комфортного внедорожника', 'Круиз по Гейрангер-фьорду', 'Проживание в отелях у фьордов', 'Паромы по маршруту'],
      svgTheme: 'norway'
    },
    {
      id: 'cappadocia',
      title: 'Каппадокия: Долина воздушных шаров',
      country: 'Турция',
      category: 'adventure',
      categoryName: 'Приключения и природа',
      days: 5,
      price: 89000,
      season: 'Апрель — Ноябрь',
      rating: 4.94,
      shortDesc: 'Сотни парящих шаров на рассвете, лунные ландшафты вулканического туфа и пещерные отели Гёреме.',
      fullDesc: 'Сказка наяву в самом сердце Анатолии. Встреча рассвета в корзине воздушного шара на высоте птичьего полета, исследование подземного города Деринкую глубиной в 8 этажей, катание на квадроциклах по Долине Любви и отдых в аутентичном cave-отеле.',
      itinerary: [
        { day: 'День 1', text: 'Прилет в Кайсери/Невшехир, трансфер в Гёреме, заселение в пещерный отель.' },
        { day: 'День 2', text: 'Рассветный полет на воздушном шаре, завтрак с шампанским, тур по Музею под открытым небом.' },
        { day: 'День 3', text: 'Спуск в древний подземный город Деринкую и треккинг по каньону Ихлара.' },
        { day: 'День 4', text: 'Квадроциклы на закате в Долине Мечей и Красной долине, турецкая баня хаммам.' },
        { day: 'День 5', text: 'Гончарный мастер-класс в Аваносе и вылет домой.' }
      ],
      included: ['Сертифицированный полет на шаре', 'Проживание в Cave Hotel с завтраками', 'Все входные билеты в музеи', 'Трансферы из аэропорта'],
      svgTheme: 'cappadocia'
    },
    {
      id: 'ubud-bali',
      title: 'Убуд, рисовые террасы и Чангу',
      country: 'Индонезия',
      category: 'wellness',
      categoryName: 'Экзотика и велнес',
      days: 12,
      price: 135000,
      season: 'Круглый год (лучше май — октябрь)',
      rating: 4.92,
      shortDesc: 'Изумрудные террасы Тегаллаланг, йога в джунглях, священные водопады и океанские закаты Чангу.',
      fullDesc: 'Перезагрузка души и тела на Острове Богов. Первые 6 дней среди звуков тропического леса и храмов Убуда, очищающий ритуал Мелукат в святом источнике Тирта Эмпул, а затем отдых на стильном океанском побережье Чангу с серфингом и закатными пляжными клубами.',
      itinerary: [
        { day: 'День 1-2', text: 'Прилет в Денпасар, переезд в Убуд, заселение на уединенную виллу с бассейном.' },
        { day: 'День 3-4', text: 'Рисовые каскады Тегаллаланг, Лес Обезьян и утренняя йога на террасе.' },
        { day: 'День 5-6', text: 'Водопады Тибумана и Канто Лампо, древний храм Тирта Эмпул.' },
        { day: 'День 7-9', text: 'Переезд на побережье Чангу/Семиньяк, уроки серфинга на океанских волнах.' },
        { day: 'День 10-12', text: 'Закаты в храме Танах Лот, балийский спа-массаж и трансфер в аэропорт.' }
      ],
      included: ['Вилла в джунглях Убуда + пляжный отель 4*', 'Личный водитель с автомобилем на экскурсии', 'Балийский массаж 90 мин', 'Индивидуальные трансферы'],
      svgTheme: 'bali'
    },
    {
      id: 'iceland',
      title: 'Исландия: Водопады, ледники и гейзеры',
      country: 'Исландия',
      category: 'adventure',
      categoryName: 'Приключения и природа',
      days: 7,
      price: 198000,
      season: 'Июнь — Август / Октябрь — Март (Северное сияние)',
      rating: 4.97,
      shortDesc: 'Черные вулканические пляжи Вика, ревущие гейзеры Золотого кольца и релакс в Голубой Лагуне.',
      fullDesc: 'Экспедиция по другой планете. Огромный водопад Скоугафосс, за которым можно пройти, ледниковая лагуна Йёкюльсаурлоун с синими айсбергами, базальтовые колонны Рейнисфьяры и купание в геотермальных молочно-голубых водах Blue Lagoon.',
      itinerary: [
        { day: 'День 1', text: 'Прилет в Кеблавик, купание в Голубой Лагуне, вечер в уютном Рейкьявике.' },
        { day: 'День 2', text: 'Маршрут Золотого Кольца: водопад Гюдльфосс, гейзер Строккюр и парк Тингведлир.' },
        { day: 'День 3', text: 'Южное побережье: водопады Сельяландсфосс и Скоугафосс, черные пески пляжа Вик.' },
        { day: 'День 4-5', text: 'Ледниковая лагуна Йёкюльсаурлоун, Алмазный пляж и поход на ледник с гидом.' },
        { day: 'День 6-7', text: 'Охота за северным сиянием (зимой) или прогулка по Рейкьявику, вылет.' }
      ],
      included: ['Аренда внедорожника 4x4 без ограничения пробега', 'Отели по маршруту с завтраками', 'Билет Comfort в Голубую Лагуну', 'Экскурсия на ледник'],
      svgTheme: 'iceland'
    },
    {
      id: 'dolomites',
      title: 'Доломитовые Альпы: Озеро Брайес и Тре-Чиме',
      country: 'Италия',
      category: 'mountains',
      categoryName: 'Горы и треккинг',
      days: 6,
      price: 128000,
      season: 'Июнь — Октябрь',
      rating: 4.96,
      shortDesc: 'Изумрудная вода высокогорного озера Брайес, зубчатые вершины Тре-Чиме-ди-Лаваредо и тирольские пастбища.',
      fullDesc: 'Самые фотогеничные горы в мире. Прогулка на деревянной лодочке по озеру Брайес в лучах утреннего солнца, панорамный треккинг вокруг легендарных трех башен Тре-Чиме, высокогорные альпийские хижины-рифуджо и блюда южнотирольской кухни.',
      itinerary: [
        { day: 'День 1', text: 'Прилет в Венецию/Верону, живописная дорога в Кортина-д’Ампеццо.' },
        { day: 'День 2', text: 'Рассвет на озере Лаго-ди-Брайес, аренда деревянной винтажной лодки.' },
        { day: 'День 3', text: 'Круговой хайкинг вокруг Tre Cime di Lavaredo, обед в рифуджо Локателли.' },
        { day: 'День 4', text: 'Высокогорное плато Альпе-ди-Сьюзи: самые просторные альпийские луга Европы.' },
        { day: 'День 5-6', text: 'Озеро Карецца с отражением массива Латемар и возвращение в аэропорт.' }
      ],
      included: ['Аренда автомобиля', 'Альпийский велнес-отель 4*', 'Пропуск на панорамные платные дороги', 'Аренда лодки на Брайес'],
      svgTheme: 'dolomites'
    },
    {
      id: 'morocco',
      title: 'Марракеш и дюны пустыни Сахара',
      country: 'Марокко',
      category: 'culture',
      categoryName: 'Культура и история',
      days: 8,
      price: 112000,
      season: 'Октябрь — Май',
      rating: 4.91,
      shortDesc: 'Пряные базары медины, лазурные сады Мажорель и ночь в роскошном глэмпинге под звездами Сахары.',
      fullDesc: 'Восточная сказка из тысячи и одной ночи. Проживание в изящном традиционном риаде с мозаикой и фонтаном, караван на верблюдах среди золотых дюн Эрг-Шебби, берберская музыка у ночного костра и глиняные крепости-ксары Айт-Бен-Хадду.',
      itinerary: [
        { day: 'День 1-2', text: 'Прибытие в Марракеш, колоритная площадь Джемаа-эль-Фна, сад Мажорель.' },
        { day: 'День 3', text: 'Перевал Тизи-н-Тишка через Атласские горы, глиняный замок Айт-Бен-Хадду.' },
        { day: 'День 4-5', text: 'Ущелье Тодра, прибытие в Мерзугу, караван на верблюдах в роскошный лагерь в дюнах.' },
        { day: 'День 6-7', text: 'Рассвет над барханами Сахары, возвращение в Марракеш через Долину Роз.' },
        { day: 'День 8', text: 'Шопинг в лабиринтах суков и трансфер в аэропорт.' }
      ],
      included: ['Традиционный риад 4* + люкс-тент в Сахаре', 'Джип 4x4 с гидом на весь маршрут', 'Караван верблюдов', 'Питание half-board'],
      svgTheme: 'morocco'
    },
    {
      id: 'nice-cotedazur',
      title: 'Лазурный берег: Ницца, Эз и Монако',
      country: 'Франция',
      category: 'sea',
      categoryName: 'Пляжи и острова',
      days: 7,
      price: 165000,
      season: 'Май — Октябрь',
      rating: 4.94,
      shortDesc: 'Английская набережная Ниццы, средневековая деревня на скале Эз и яхты Монте-Карло.',
      fullDesc: 'Французская Ривьера во всем блеске. Прогулки по старой Ницце с ароматом свежих круассанов, экзотический сад на вершине орлиного гнезда Эз с видом на Кап-Ферра, блеск казино Монако и неспешный аперитив с бокалом прованского розе.',
      itinerary: [
        { day: 'День 1', text: 'Прилет в Ниццу, заселение в отель рядом с Променадом дез Англе.' },
        { day: 'День 2', text: 'Цветочный рынок Кур Салейя, подъем на замковый холм Шато с видом на Бухту Ангелов.' },
        { day: 'День 3', text: 'Средневековая деревушка Эз, ботанический сад кактусов, парфюмерный дом Fragonard.' },
        { day: 'День 4', text: 'Поездка на поезде в княжество Монако: княжеский дворец и площадь Казино.' },
        { day: 'День 5-7', text: 'Вилла Эфрусси-де-Ротшильд на мысе Кап-Ферра, пляжный день и вылет.' }
      ],
      included: ['Отель 4* в центре Ниццы', 'Билеты на панорамные поезда', 'Вход в ботанический сад Эз и виллу Ротшильд', 'Трансфер из аэропорта'],
      svgTheme: 'nice'
    }
  ];

  // =========================================================================
  // 2. High-Fidelity Thematic SVG Travel Illustrations (Zero-Broken-Image Policy)
  // =========================================================================
  function renderSvgArtwork(theme) {
    switch (theme) {
      case 'santorini':
        return `
          <svg viewBox="0 0 600 375" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="skySant" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#fdba74" />
                <stop offset="35%" stop-color="#fbcfe8" />
                <stop offset="70%" stop-color="#38bdf8" />
                <stop offset="100%" stop-color="#0284c7" />
              </linearGradient>
              <linearGradient id="seaSant" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#0369a1" />
                <stop offset="100%" stop-color="#082f49" />
              </linearGradient>
            </defs>
            <rect width="600" height="230" fill="url(#skySant)" />
            <circle cx="480" cy="110" r="45" fill="#fef08a" opacity="0.8" />
            <rect y="230" width="600" height="145" fill="url(#seaSant)" />
            <polygon points="0,230 180,160 340,230" fill="#0f172a" opacity="0.4" />
            <!-- White houses on cliff -->
            <path d="M120,375 L120,200 L240,160 L360,220 L480,180 L600,240 L600,375 Z" fill="#f8fafc" />
            <polygon points="180,240 280,210 320,260 200,280" fill="#e2e8f0" />
            <!-- Cobalt Blue Church Dome -->
            <path d="M380,210 A 35 35 0 0 1 450,210 Z" fill="#0284c7" />
            <rect x="410" y="210" width="10" height="25" fill="#ffffff" />
            <rect x="408" y="170" width="14" height="4" fill="#ffffff" />
            <rect x="413" y="165" width="4" height="14" fill="#ffffff" />
            <!-- Pink Bougainvillea Flowers -->
            <circle cx="340" cy="245" r="16" fill="#f43f5e" opacity="0.85" />
            <circle cx="355" cy="240" r="12" fill="#ec4899" opacity="0.85" />
          </svg>`;

      case 'matterhorn':
        return `
          <svg viewBox="0 0 600 375" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="skySwiss" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#67e8f9" />
                <stop offset="60%" stop-color="#bae6fd" />
                <stop offset="100%" stop-color="#f0f9ff" />
              </linearGradient>
              <linearGradient id="lakeSwiss" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#0284c7" />
                <stop offset="100%" stop-color="#0f766e" />
              </linearGradient>
            </defs>
            <rect width="600" height="260" fill="url(#skySwiss)" />
            <!-- Matterhorn Distinctive Pyramid -->
            <polygon points="310,45 220,220 420,220" fill="#475569" />
            <polygon points="310,45 270,140 310,220" fill="#f8fafc" />
            <polygon points="310,45 350,110 380,220" fill="#cbd5e1" />
            <!-- Foreground mountains & pine ridge -->
            <polygon points="0,260 120,180 260,260" fill="#334155" />
            <polygon points="360,260 480,170 600,260" fill="#1e293b" />
            <!-- Alpine Lake -->
            <rect y="260" width="600" height="115" fill="url(#lakeSwiss)" />
            <!-- Evergreen pine silhouettes -->
            <polygon points="80,280 65,340 95,340" fill="#064e3b" />
            <polygon points="120,270 105,340 135,340" fill="#065f46" />
            <polygon points="500,275 485,345 515,345" fill="#064e3b" />
          </svg>`;

      case 'kyoto':
        return `
          <svg viewBox="0 0 600 375" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="skyJap" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#fbcfe8" />
                <stop offset="60%" stop-color="#fed7aa" />
                <stop offset="100%" stop-color="#fff1f2" />
              </linearGradient>
            </defs>
            <rect width="600" height="375" fill="url(#skyJap)" />
            <circle cx="160" cy="140" r="65" fill="#f43f5e" opacity="0.25" />
            <!-- Japanese Pagoda Silhouette -->
            <g fill="#1e293b">
              <!-- Tier 1 -->
              <rect x="360" y="90" width="8" height="35" />
              <polygon points="320,130 364,115 408,130 364,125" />
              <rect x="345" y="130" width="38" height="25" />
              <!-- Tier 2 -->
              <polygon points="305,160 364,142 423,160 364,154" />
              <rect x="338" y="160" width="52" height="30" />
              <!-- Tier 3 -->
              <polygon points="290,195 364,175 438,195 364,188" />
              <rect x="330" y="195" width="68" height="45" />
              <!-- Base -->
              <rect x="315" y="240" width="98" height="85" />
            </g>
            <!-- Bamboo Stems in Foreground -->
            <rect x="40" y="60" width="14" height="315" rx="4" fill="#15803d" opacity="0.8" />
            <rect x="75" y="110" width="12" height="265" rx="4" fill="#166534" opacity="0.75" />
            <rect x="115" y="40" width="16" height="335" rx="4" fill="#15803d" opacity="0.85" />
          </svg>`;

      case 'maldives':
        return `
          <svg viewBox="0 0 600 375" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="skyMald" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#38bdf8" />
                <stop offset="60%" stop-color="#bae6fd" />
                <stop offset="100%" stop-color="#fef08a" />
              </linearGradient>
              <linearGradient id="lagoon" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#2dd4bf" />
                <stop offset="50%" stop-color="#06b6d4" />
                <stop offset="100%" stop-color="#0284c7" />
              </linearGradient>
            </defs>
            <rect width="600" height="190" fill="url(#skyMald)" />
            <rect y="190" width="600" height="185" fill="url(#lagoon)" />
            <ellipse cx="300" cy="190" rx="240" ry="12" fill="#fef08a" opacity="0.7" />
            <!-- Overwater Bungalow Pier & Villa -->
            <rect x="180" y="245" width="240" height="10" fill="#92400e" />
            <line x1="210" y1="255" x2="210" y2="330" stroke="#78350f" stroke-width="4" />
            <line x1="270" y1="255" x2="270" y2="330" stroke="#78350f" stroke-width="4" />
            <line x1="330" y1="255" x2="330" y2="330" stroke="#78350f" stroke-width="4" />
            <line x1="390" y1="255" x2="390" y2="330" stroke="#78350f" stroke-width="4" />
            <!-- Villa Roof -->
            <polygon points="230,245 300,185 370,245" fill="#b45309" />
            <rect x="250" y="220" width="100" height="25" fill="#fde68a" />
            <!-- Palm Frond on Side -->
            <path d="M560,375 Q 460,260 380,220" stroke="#15803d" stroke-width="6" fill="none" />
            <path d="M420,235 L400,205 M440,245 L430,210 M460,260 L460,225" stroke="#16a34a" stroke-width="3" />
          </svg>`;

      case 'amalfi':
        return `
          <svg viewBox="0 0 600 375" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="skyAmalfi" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#38bdf8" />
                <stop offset="100%" stop-color="#fed7aa" />
              </linearGradient>
            </defs>
            <rect width="600" height="220" fill="url(#skyAmalfi)" />
            <rect y="220" width="600" height="155" fill="#0369a1" />
            <!-- Dramatic Cliff -->
            <path d="M0,80 Q 220,180 340,375 L0,375 Z" fill="#64748b" />
            <!-- Colorful stacked houses -->
            <rect x="40" y="160" width="45" height="55" fill="#fca5a5" />
            <polygon points="40,160 62,140 85,160" fill="#dc2626" />
            <rect x="90" y="180" width="50" height="60" fill="#fde047" />
            <polygon points="90,180 115,160 140,180" fill="#b45309" />
            <rect x="145" y="210" width="45" height="50" fill="#fed7aa" />
            <polygon points="145,210 167,190 190,210" fill="#ea580c" />
            <!-- Mediterranean boat -->
            <polygon points="420,290 480,290 470,305 430,305" fill="#ffffff" />
            <line x1="450" y1="290" x2="450" y2="260" stroke="#ffffff" stroke-width="2" />
            <polygon points="450,265 470,280 450,285" fill="#38bdf8" />
          </svg>`;

      case 'norway':
        return `
          <svg viewBox="0 0 600 375" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="fjordWater" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#0f766e" />
                <stop offset="100%" stop-color="#042f2e" />
              </linearGradient>
            </defs>
            <rect width="600" height="210" fill="#bae6fd" />
            <!-- Fjord canyon sides -->
            <polygon points="0,50 180,220 0,375" fill="#334155" />
            <polygon points="600,30 420,210 600,375" fill="#1e293b" />
            <!-- Fjord Water channel -->
            <polygon points="180,210 420,210 520,375 80,375" fill="url(#fjordWater)" />
            <!-- White waterfall line -->
            <path d="M140,90 Q 155,140 160,210" stroke="#f0fdfa" stroke-width="4" stroke-dasharray="8 3" fill="none" />
            <circle cx="160" cy="210" r="10" fill="#ccfbf1" opacity="0.6" />
          </svg>`;

      case 'cappadocia':
        return `
          <svg viewBox="0 0 600 375" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="skyCap" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#fb923c" />
                <stop offset="40%" stop-color="#fdba74" />
                <stop offset="100%" stop-color="#fed7aa" />
              </linearGradient>
            </defs>
            <rect width="600" height="375" fill="url(#skyCap)" />
            <!-- Fairy chimneys valley -->
            <path d="M0,375 L0,260 Q 80,220 140,290 Q 200,240 280,310 Q 360,250 450,290 Q 520,230 600,280 L600,375 Z" fill="#d97706" opacity="0.85" />
            <!-- Hot Air Balloons -->
            <g transform="translate(140, 80) scale(0.9)">
              <ellipse cx="0" cy="0" rx="35" ry="45" fill="#ef4444" />
              <path d="M-30,-10 C -15,20 -10,35 0,45 C 10,35 15,20 30,-10 Z" fill="#b91c1c" />
              <rect x="-8" y="52" width="16" height="12" fill="#78350f" rx="2" />
              <line x1="-12" y1="42" x2="-6" y2="52" stroke="#451a03" stroke-width="1.5" />
              <line x1="12" y1="42" x2="6" y2="52" stroke="#451a03" stroke-width="1.5" />
            </g>
            <g transform="translate(380, 110) scale(0.65)">
              <ellipse cx="0" cy="0" rx="35" ry="45" fill="#0284c7" />
              <path d="M-30,-10 C -15,20 -10,35 0,45 C 10,35 15,20 30,-10 Z" fill="#0369a1" />
              <rect x="-8" y="52" width="16" height="12" fill="#78350f" rx="2" />
            </g>
            <g transform="translate(490, 70) scale(0.45)">
              <ellipse cx="0" cy="0" rx="35" ry="45" fill="#10b981" />
              <rect x="-8" y="52" width="16" height="12" fill="#78350f" rx="2" />
            </g>
          </svg>`;

      case 'bali':
        return `
          <svg viewBox="0 0 600 375" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="skyBali" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#fef08a" />
                <stop offset="50%" stop-color="#bbf7d0" />
                <stop offset="100%" stop-color="#86efac" />
              </linearGradient>
            </defs>
            <rect width="600" height="375" fill="url(#skyBali)" />
            <!-- Curved Rice Terraces -->
            <path d="M0,180 Q 200,160 400,210 Q 520,230 600,200 L600,375 L0,375 Z" fill="#15803d" />
            <path d="M0,230 Q 180,210 360,260 Q 480,280 600,250 L600,375 L0,375 Z" fill="#166534" />
            <path d="M0,280 Q 240,260 420,310 Q 540,320 600,300 L600,375 L0,375 Z" fill="#14532d" />
            <!-- Tall Jungle Palm Trees -->
            <path d="M80,375 Q 90,200 95,110" stroke="#78350f" stroke-width="5" fill="none" />
            <circle cx="95" cy="110" r="30" fill="#22c55e" opacity="0.9" />
            <path d="M480,375 Q 470,220 465,130" stroke="#78350f" stroke-width="5" fill="none" />
            <circle cx="465" cy="130" r="35" fill="#16a34a" opacity="0.9" />
          </svg>`;

      case 'iceland':
        return `
          <svg viewBox="0 0 600 375" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="aurora" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#0f172a" />
                <stop offset="45%" stop-color="#064e3b" />
                <stop offset="75%" stop-color="#10b981" />
                <stop offset="100%" stop-color="#0284c7" />
              </linearGradient>
            </defs>
            <rect width="600" height="375" fill="url(#aurora)" />
            <!-- Northern Lights Ribbon Wave -->
            <path d="M0,120 Q 150,40 300,90 T 600,70 L 600,160 Q 450,110 300,160 T 0,140 Z" fill="#34d399" opacity="0.4" />
            <!-- Black Beach & Glacier Icebergs -->
            <polygon points="0,290 600,270 600,375 0,375" fill="#090d16" />
            <polygon points="180,280 230,230 270,285" fill="#e0f2fe" opacity="0.9" />
            <polygon points="340,285 390,240 430,290" fill="#bae6fd" opacity="0.85" />
          </svg>`;

      case 'dolomites':
        return `
          <svg viewBox="0 0 600 375" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="skyDol" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#bae6fd" />
                <stop offset="100%" stop-color="#fef08a" />
              </linearGradient>
            </defs>
            <rect width="600" height="250" fill="url(#skyDol)" />
            <!-- Dolomite Jagged Peaks -->
            <polygon points="120,70 190,240 70,240" fill="#cbd5e1" />
            <polygon points="260,50 340,250 180,250" fill="#94a3b8" />
            <polygon points="400,65 480,250 330,250" fill="#cbd5e1" />
            <!-- Emerald Lake Braies -->
            <rect y="250" width="600" height="125" fill="#0d9488" />
            <!-- Vintage wooden rowboat -->
            <polygon points="270,305 330,305 320,320 280,320" fill="#78350f" />
            <line x1="285" y1="312" x2="260" y2="300" stroke="#451a03" stroke-width="2" />
          </svg>`;

      case 'morocco':
        return `
          <svg viewBox="0 0 600 375" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="saharaSky" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#1e1b4b" />
                <stop offset="50%" stop-color="#7c2d12" />
                <stop offset="100%" stop-color="#ea580c" />
              </linearGradient>
            </defs>
            <rect width="600" height="375" fill="url(#saharaSky)" />
            <circle cx="450" cy="110" r="35" fill="#fef08a" opacity="0.9" />
            <!-- Desert Sand Dunes -->
            <path d="M0,230 Q 180,180 340,250 Q 480,290 600,240 L600,375 L0,375 Z" fill="#d97706" />
            <path d="M0,270 Q 220,240 400,310 Q 520,330 600,290 L600,375 L0,375 Z" fill="#b45309" />
            <!-- Camel Caravan Silhouette -->
            <g fill="#451a03" transform="translate(180, 240) scale(0.6)">
              <ellipse cx="40" cy="20" rx="18" ry="12" />
              <circle cx="20" cy="5" r="7" />
              <line x1="30" y1="30" x2="25" y2="55" stroke="#451a03" stroke-width="4" />
              <line x1="50" y1="30" x2="55" y2="55" stroke="#451a03" stroke-width="4" />
            </g>
          </svg>`;

      case 'nice':
      default:
        return `
          <svg viewBox="0 0 600 375" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="rivieraSky" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#38bdf8" />
                <stop offset="60%" stop-color="#bae6fd" />
                <stop offset="100%" stop-color="#fef08a" />
              </linearGradient>
            </defs>
            <rect width="600" height="220" fill="url(#rivieraSky)" />
            <rect y="220" width="600" height="155" fill="#0284c7" />
            <!-- Cap Ferrat peninsula curve -->
            <path d="M350,220 Q 480,200 600,260 L600,375 L350,375 Z" fill="#15803d" opacity="0.8" />
            <!-- White Luxury Yachts -->
            <polygon points="140,270 210,270 200,285 150,285" fill="#ffffff" />
            <polygon points="165,255 195,255 190,270 165,270" fill="#f8fafc" />
            <line x1="175" y1="255" x2="175" y2="230" stroke="#ffffff" stroke-width="2" />
          </svg>`;
    }
  }

  // =========================================================================
  // 3. LocalStorage Favorites Manager
  // =========================================================================
  const FAVORITES_STORAGE_KEY = 'tripora_favorites_ids';

  function getFavorites() {
    try {
      const data = localStorage.getItem(FAVORITES_STORAGE_KEY);
      return data ? JSON.parse(data) : ['santorini', 'maldives'];
    } catch (e) {
      return ['santorini', 'maldives'];
    }
  }

  function saveFavorites(ids) {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(ids));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
    updateFavoritesBadge();
  }

  function toggleFavorite(id) {
    const list = getFavorites();
    const index = list.indexOf(id);
    let isAdded = false;

    if (index > -1) {
      list.splice(index, 1);
      isAdded = false;
      showToast('Удалено из избранного');
    } else {
      list.push(id);
      isAdded = true;
      showToast('Добавлено в избранное');
    }

    saveFavorites(list);
    renderCatalog();
    renderFavoritesView();
    return isAdded;
  }

  function updateFavoritesBadge() {
    const list = getFavorites();
    const badgeEl = document.getElementById('favBadge');
    if (badgeEl) {
      badgeEl.textContent = list.length;
    }
  }

  // =========================================================================
  // 4. Catalog Filtering, Sorting and Rendering
  // =========================================================================
  let currentSearchQuery = '';
  let currentCategory = 'all';
  let currentSort = 'popular';
  let currentMaxDuration = 'all';

  function getFilteredDestinations() {
    return DESTINATIONS.filter((item) => {
      // Text Search: title, country, description
      const query = currentSearchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.country.toLowerCase().includes(query) ||
        item.shortDesc.toLowerCase().includes(query);

      // Category / Type
      const matchesCategory =
        currentCategory === 'all' || item.category === currentCategory;

      // Duration
      let matchesDuration = true;
      if (currentMaxDuration === 'short') {
        matchesDuration = item.days <= 6;
      } else if (currentMaxDuration === 'medium') {
        matchesDuration = item.days >= 7 && item.days <= 9;
      } else if (currentMaxDuration === 'long') {
        matchesDuration = item.days >= 10;
      }

      return matchesSearch && matchesCategory && matchesDuration;
    }).sort((a, b) => {
      if (currentSort === 'price-asc') return a.price - b.price;
      if (currentSort === 'price-desc') return b.price - a.price;
      if (currentSort === 'duration-desc') return b.days - a.days;
      return b.rating - a.rating; // default: popular / rating
    });
  }

  function renderCatalog() {
    const grid = document.getElementById('destinationsGrid');
    const countEl = document.getElementById('catalogResultsCount');
    if (!grid) return;

    const filtered = getFilteredDestinations();
    const favIds = getFavorites();

    if (countEl) {
      countEl.textContent = `Найдено направлений: ${filtered.length}`;
    }

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="empty-state-box">
          <div class="empty-state-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          <h3 style="font-size:1.35rem; font-weight:700; margin-bottom:0.5rem;">Ничего не найдено</h3>
          <p style="color:var(--text-body); max-width:440px; margin:0 auto 1.5rem; font-size:0.95rem;">
            По вашим критериям не нашлось подходящих путешествий. Попробуйте сбросить фильтры или изменить поисковый запрос.
          </p>
          <button class="btn-primary" id="emptyResetBtn">Сбросить все фильтры</button>
        </div>
      `;

      const emptyReset = document.getElementById('emptyResetBtn');
      if (emptyReset) {
        emptyReset.addEventListener('click', resetAllFilters);
      }
      return;
    }

    grid.innerHTML = filtered.map((item) => {
      const isFav = favIds.includes(item.id);
      return `
        <article class="destination-card" data-id="${item.id}">
          <div class="card-media">
            ${renderSvgArtwork(item.svgTheme)}
            <button class="card-fav-btn ${isFav ? 'is-favorite' : ''}" data-fav-id="${item.id}" aria-label="Добавить в избранное" title="${isFav ? 'Удалить из избранного' : 'Добавить в избранное'}">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="${isFav ? '#ef4444' : 'none'}" stroke="currentColor" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
            <div class="card-duration-badge">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <span>${item.days} дней / ${item.days - 1} ночей</span>
            </div>
          </div>

          <div class="card-body">
            <div>
              <div class="card-meta-line">
                <span>${item.categoryName}</span>
                <span class="dot">·</span>
                <span class="country">${item.country}</span>
              </div>
              <h3 class="card-title">${item.title}</h3>
              <p class="card-desc">${item.shortDesc}</p>
            </div>

            <div class="card-footer-row">
              <div class="price-block">
                <span class="price-lead-label">Примерная цена*</span>
                <div class="price-lead-val tabular-nums">от ${item.price.toLocaleString('ru-RU')} ₽</div>
              </div>
              <button class="btn-card-details" data-open-detail="${item.id}">
                <span>Подробнее</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');

    // Attach favorites click handlers
    grid.querySelectorAll('.card-fav-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-fav-id');
        toggleFavorite(id);
      });
    });

    // Attach detail modal click handlers
    grid.querySelectorAll('[data-open-detail]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-open-detail');
        openDestinationModal(id);
      });
    });
  }

  function resetAllFilters() {
    currentSearchQuery = '';
    currentCategory = 'all';
    currentSort = 'popular';
    currentMaxDuration = 'all';

    const searchInput = document.getElementById('catalogSearchInput');
    if (searchInput) searchInput.value = '';

    const heroSearchInput = document.getElementById('heroSearchInput');
    if (heroSearchInput) heroSearchInput.value = '';

    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) sortSelect.value = 'popular';

    const durationSelect = document.getElementById('durationFilter');
    if (durationSelect) durationSelect.value = 'all';

    document.querySelectorAll('.type-filter-btn').forEach((btn) => {
      btn.classList.toggle('active', btn.getAttribute('data-category') === 'all');
    });

    renderCatalog();
    showToast('Фильтры сброшены');
  }

  // =========================================================================
  // 5. Favorites View Rendering
  // =========================================================================
  function renderFavoritesView() {
    const favGrid = document.getElementById('favoritesGrid');
    const favSubtitle = document.getElementById('favoritesSubtitle');
    if (!favGrid) return;

    const favIds = getFavorites();
    const favItems = DESTINATIONS.filter((item) => favIds.includes(item.id));

    if (favSubtitle) {
      favSubtitle.textContent = `Сохранено путешествий: ${favItems.length}`;
    }

    if (favItems.length === 0) {
      favGrid.innerHTML = `
        <div class="empty-state-box">
          <div class="empty-state-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </div>
          <h3 style="font-size:1.35rem; font-weight:700; margin-bottom:0.5rem;">В избранном пока пусто</h3>
          <p style="color:var(--text-body); max-width:440px; margin:0 auto 1.5rem; font-size:0.95rem;">
            Нажимайте на иконку сердечка на карточках туров в каталоге, чтобы сохранить интересные направления и сравнить их перед поездкой.
          </p>
          <a href="#catalog" class="btn-primary" id="toCatalogFromFav">Перейти в каталог</a>
        </div>
      `;

      const toCatalog = document.getElementById('toCatalogFromFav');
      if (toCatalog) {
        toCatalog.addEventListener('click', (e) => {
          e.preventDefault();
          switchTab('catalog');
        });
      }
      return;
    }

    favGrid.innerHTML = favItems.map((item) => `
      <article class="destination-card" data-id="${item.id}">
        <div class="card-media">
          ${renderSvgArtwork(item.svgTheme)}
          <button class="card-fav-btn is-favorite" data-fav-id="${item.id}" aria-label="Удалить из избранного" title="Удалить из избранного">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#ef4444" stroke="currentColor" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
          <div class="card-duration-badge">
            <span>${item.days} дней</span>
          </div>
        </div>

        <div class="card-body">
          <div>
            <div class="card-meta-line">
              <span>${item.categoryName}</span>
              <span class="dot">·</span>
              <span class="country">${item.country}</span>
            </div>
            <h3 class="card-title">${item.title}</h3>
            <p class="card-desc">${item.shortDesc}</p>
          </div>

          <div class="card-footer-row">
            <div class="price-block">
              <span class="price-lead-label">Примерная цена*</span>
              <div class="price-lead-val tabular-nums">от ${item.price.toLocaleString('ru-RU')} ₽</div>
            </div>
            <button class="btn-card-details" data-open-detail="${item.id}">
              <span>Подробнее</span>
            </button>
          </div>
        </div>
      </article>
    `).join('');

    favGrid.querySelectorAll('.card-fav-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-fav-id');
        toggleFavorite(id);
      });
    });

    favGrid.querySelectorAll('[data-open-detail]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-open-detail');
        openDestinationModal(id);
      });
    });
  }

  // =========================================================================
  // 6. Navigation Tabs & Hash Switcher
  // =========================================================================
  function switchTab(targetTab) {
    const catalogSec = document.getElementById('catalogSection');
    const favoritesSec = document.getElementById('favoritesSection');
    const heroSec = document.getElementById('heroSection');
    const aboutSec = document.getElementById('aboutSection');
    const contactsSec = document.getElementById('contactsSection');

    // Update active state in desktop & mobile navs
    document.querySelectorAll('.nav-link, .mobile-nav-item').forEach((link) => {
      const href = link.getAttribute('href');
      if (href === `#${targetTab}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    if (targetTab === 'favorites') {
      if (heroSec) heroSec.style.display = 'none';
      if (catalogSec) catalogSec.style.display = 'none';
      if (aboutSec) aboutSec.style.display = 'none';
      if (contactsSec) contactsSec.style.display = 'none';
      if (favoritesSec) {
        favoritesSec.classList.add('active-tab');
        favoritesSec.scrollIntoView({ behavior: 'smooth' });
      }
      renderFavoritesView();
    } else {
      // Home / Catalog view
      if (heroSec) heroSec.style.display = 'block';
      if (catalogSec) catalogSec.style.display = 'block';
      if (aboutSec) aboutSec.style.display = 'block';
      if (contactsSec) contactsSec.style.display = 'block';
      if (favoritesSec) favoritesSec.classList.remove('active-tab');

      if (targetTab === 'catalog') {
        catalogSec.scrollIntoView({ behavior: 'smooth' });
      } else if (targetTab === 'about') {
        aboutSec.scrollIntoView({ behavior: 'smooth' });
      } else if (targetTab === 'contacts') {
        contactsSec.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }

  // Bind nav links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href.startsWith('#')) {
        const tab = href.substring(1);
        if (['home', 'catalog', 'favorites', 'about', 'contacts'].includes(tab)) {
          e.preventDefault();
          switchTab(tab);
          // Close mobile drawer if opened
          const drawer = document.getElementById('mobileDrawer');
          const toggle = document.getElementById('mobileToggle');
          if (drawer) drawer.classList.remove('open');
          if (toggle) toggle.classList.remove('active');
        }
      }
    });
  });

  // Mobile Drawer Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      mobileToggle.classList.toggle('active', isOpen);
    });
  }

  // =========================================================================
  // 7. Destination Detailed Modal Sheet
  // =========================================================================
  let activeModalDestination = null;

  function openDestinationModal(id) {
    const dest = DESTINATIONS.find((d) => d.id === id);
    if (!dest) return;
    activeModalDestination = dest;

    const modal = document.getElementById('destinationModal');
    const heroMedia = document.getElementById('modalHeroMedia');
    const titleEl = document.getElementById('modalDestTitle');
    const countryEl = document.getElementById('modalDestCountry');
    const descEl = document.getElementById('modalDestDesc');
    const daysEl = document.getElementById('modalSpecDays');
    const seasonEl = document.getElementById('modalSpecSeason');
    const priceEl = document.getElementById('modalSpecPrice');
    const ratingEl = document.getElementById('modalSpecRating');
    const itineraryList = document.getElementById('modalItineraryList');
    const includedList = document.getElementById('modalIncludedList');
    const favBtn = document.getElementById('modalFavToggleBtn');

    if (heroMedia) heroMedia.innerHTML = renderSvgArtwork(dest.svgTheme);
    if (titleEl) titleEl.textContent = dest.title;
    if (countryEl) countryEl.textContent = `${dest.country} · ${dest.categoryName}`;
    if (descEl) descEl.textContent = dest.fullDesc;
    if (daysEl) daysEl.textContent = `${dest.days} дней`;
    if (seasonEl) seasonEl.textContent = dest.season;
    if (priceEl) priceEl.textContent = `от ${dest.price.toLocaleString('ru-RU')} ₽*`;
    if (ratingEl) ratingEl.textContent = `${dest.rating} / 5.0`;

    // Itinerary List
    if (itineraryList) {
      itineraryList.innerHTML = dest.itinerary.map((step) => `
        <div class="itinerary-step">
          <div class="step-num-badge">${step.day}</div>
          <p style="font-size:0.9rem; color:var(--text-body); line-height:1.5;">${step.text}</p>
        </div>
      `).join('');
    }

    // Included List
    if (includedList) {
      includedList.innerHTML = dest.included.map((inc) => `
        <li style="display:flex; align-items:center; gap:0.5rem; font-size:0.875rem; color:var(--text-body);">
          <span style="color:var(--teal-primary); font-weight:bold;">✓</span>
          <span>${inc}</span>
        </li>
      `).join('');
    }

    // Modal Fav Toggle
    const favIds = getFavorites();
    const isFav = favIds.includes(dest.id);
    if (favBtn) {
      favBtn.textContent = isFav ? '♥ В избранном' : '♡ В избранное';
      favBtn.onclick = () => {
        const added = toggleFavorite(dest.id);
        favBtn.textContent = added ? '♥ В избранном' : '♡ В избранное';
      };
    }

    // Open Modal
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  // Close Detail Modal
  const modalClose = document.getElementById('modalCloseBtn');
  const destModal = document.getElementById('destinationModal');
  if (modalClose && destModal) {
    modalClose.addEventListener('click', () => {
      destModal.classList.remove('open');
      document.body.style.overflow = '';
    });
    destModal.addEventListener('click', (e) => {
      if (e.target === destModal) {
        destModal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // =========================================================================
  // 8. Demonstration Booking Warning Modal
  // =========================================================================
  const demoBookingModal = document.getElementById('demoBookingModal');
  const demoBookingClose = document.getElementById('demoBookingCloseBtn');
  const modalBookNowBtn = document.getElementById('modalBookNowBtn');
  const demoBookingCopyBtn = document.getElementById('demoBookingCopyBtn');

  if (modalBookNowBtn && demoBookingModal) {
    modalBookNowBtn.addEventListener('click', () => {
      if (!activeModalDestination) return;

      // Close Detail Modal, Open Demo Notice Modal
      if (destModal) destModal.classList.remove('open');

      const titleField = document.getElementById('bookingDestTitle');
      const priceField = document.getElementById('bookingEstPrice');
      const datesField = document.getElementById('bookingTravelDates');

      if (titleField) titleField.textContent = activeModalDestination.title;
      if (priceField) priceField.textContent = `от ${activeModalDestination.price.toLocaleString('ru-RU')} ₽ (на 1 чел.)`;
      if (datesField) datesField.textContent = `${activeModalDestination.days} дней (${activeModalDestination.season})`;

      demoBookingModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }

  if (demoBookingClose && demoBookingModal) {
    demoBookingClose.addEventListener('click', () => {
      demoBookingModal.classList.remove('open');
      document.body.style.overflow = '';
    });
    demoBookingModal.addEventListener('click', (e) => {
      if (e.target === demoBookingModal) {
        demoBookingModal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  if (demoBookingCopyBtn) {
    demoBookingCopyBtn.addEventListener('click', () => {
      if (!activeModalDestination) return;
      const text = `Интересующий тур: ${activeModalDestination.title}\nСтрана: ${activeModalDestination.country}\nДлительность: ${activeModalDestination.days} дней\nПримерная стоимость: ${activeModalDestination.price} ₽`;
      navigator.clipboard.writeText(text);
      showToast('Детали тура скопированы');
    });
  }

  // =========================================================================
  // 9. Hero Search Bar Handling
  // =========================================================================
  const heroSearchForm = document.getElementById('heroSearchForm');
  if (heroSearchForm) {
    heroSearchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const queryInput = document.getElementById('heroSearchInput');
      const typeSelect = document.getElementById('heroTypeSelect');

      if (queryInput) currentSearchQuery = queryInput.value.trim();
      if (typeSelect && typeSelect.value !== 'all') currentCategory = typeSelect.value;

      // Sync catalog input
      const catalogInput = document.getElementById('catalogSearchInput');
      if (catalogInput && queryInput) catalogInput.value = queryInput.value;

      // Update active category button
      document.querySelectorAll('.type-filter-btn').forEach((btn) => {
        btn.classList.toggle('active', btn.getAttribute('data-category') === currentCategory);
      });

      switchTab('catalog');
      renderCatalog();
    });
  }

  // Quick Tags in Hero
  document.querySelectorAll('.quick-tag-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const cat = btn.getAttribute('data-category');
      currentCategory = cat;
      document.querySelectorAll('.type-filter-btn').forEach((b) => {
        b.classList.toggle('active', b.getAttribute('data-category') === cat);
      });
      switchTab('catalog');
      renderCatalog();
    });
  });

  // =========================================================================
  // 10. Catalog Toolbar Event Listeners
  // =========================================================================
  // Text Search Input
  const catalogSearchInput = document.getElementById('catalogSearchInput');
  if (catalogSearchInput) {
    catalogSearchInput.addEventListener('input', (e) => {
      currentSearchQuery = e.target.value;
      renderCatalog();
    });
  }

  // Category Buttons
  document.querySelectorAll('.type-filter-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.type-filter-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-category');
      renderCatalog();
    });
  });

  // Sort Select
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentSort = e.target.value;
      renderCatalog();
    });
  }

  // Duration Filter
  const durationFilter = document.getElementById('durationFilter');
  if (durationFilter) {
    durationFilter.addEventListener('change', (e) => {
      currentMaxDuration = e.target.value;
      renderCatalog();
    });
  }

  // Reset Filters Button
  const resetBtn = document.getElementById('resetFiltersBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', resetAllFilters);
  }

  // =========================================================================
  // 11. Consultation / Feedback Form Validation
  // =========================================================================
  const consultForm = document.getElementById('consultForm');
  if (consultForm) {
    consultForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('clientName');
      const contactInput = document.getElementById('clientContact');
      let isValid = true;

      if (!nameInput.value.trim()) {
        nameInput.closest('.form-field').classList.add('has-error');
        isValid = false;
      } else {
        nameInput.closest('.form-field').classList.remove('has-error');
      }

      if (!contactInput.value.trim() || contactInput.value.trim().length < 6) {
        contactInput.closest('.form-field').classList.add('has-error');
        isValid = false;
      } else {
        contactInput.closest('.form-field').classList.remove('has-error');
      }

      if (isValid) {
        showToast('Запрос на консультацию принят (Демо-режим)');
        consultForm.reset();
      }
    });
  }

  // =========================================================================
  // 12. Toast Notification Shelf
  // =========================================================================
  function showToast(message) {
    const shelf = document.getElementById('toastShelf');
    if (!shelf) return;

    const toast = document.createElement('div');
    toast.className = 'toast-msg';
    toast.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="color:var(--teal-primary);"><polyline points="20 6 9 17 4 12"/></svg>
      <span>${message}</span>
    `;

    shelf.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(8px)';
      toast.style.transition = 'all 0.25s ease-out';
      setTimeout(() => toast.remove(), 250);
    }, 3200);
  }

  // Keyboard accessibility: Escape closes any open modal
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (destModal && destModal.classList.contains('open')) {
        destModal.classList.remove('open');
        document.body.style.overflow = '';
      }
      if (demoBookingModal && demoBookingModal.classList.contains('open')) {
        demoBookingModal.classList.remove('open');
        document.body.style.overflow = '';
      }
    }
  });

  // Initial Run
  updateFavoritesBadge();
  renderCatalog();
});
