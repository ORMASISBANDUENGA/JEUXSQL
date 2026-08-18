import { Language } from '../types';

export interface Translations {
  appName: string;
  creatorName: string;
  creatorRole: string;
  tagline: string;
  version: string;
  
  // Navigation
  tabQuests: string;
  tabChallenges: string;
  tabMinigames: string;
  tabLearn: string;
  tabSandbox: string;
  tabBadges: string;
  tabStats: string;
  tabProfile: string;

  // Header & Stats
  level: string;
  rank: string;
  xpProgress: string;
  streak: string;
  streakDesc: string;
  lives: string;
  refillLives: string;
  points: string;
  soundOn: string;
  soundOff: string;
  themeDark: string;
  themeLight: string;
  themeCyberpunk: string;
  languageSelect: string;
  installApp: string;
  installedApp: string;

  // Splash Screen
  splashWelcome: string;
  splashPresenter: string;
  splashTagline: string;
  splashLoading: string;
  splashReady: string;
  splashEnter: string;
  splashSkip: string;
  splashFeatures: {
    interactive: string;
    offline: string;
    rpg: string;
  };

  // PWA Install Modal
  pwaModalTitle: string;
  pwaModalSubtitle: string;
  pwaBtnInstall: string;
  pwaDesktopTitle: string;
  pwaDesktopStep: string;
  pwaAndroidTitle: string;
  pwaAndroidStep: string;
  pwaIosTitle: string;
  pwaIosStep: string;
  pwaClose: string;

  // Footer & QR Code
  footerDesc: string;
  footerCreatedBy: string;
  footerContactWhatsapp: string;
  qrCodeBtn: string;
  qrCodeModalTitle: string;
  qrCodeModalSubtitle: string;
  qrCodeScanInstruction: string;
  qrCodeGoogleNotice: string;
  qrCodeCopyLink: string;
  qrCodeLinkCopied: string;
  qrCodeOpenDirect: string;
}

export const TRANSLATIONS: Record<Language, Translations> = {
  fr: {
    appName: 'SQL QUEST ARENA',
    creatorName: 'OROMASIS BANDUENGA',
    creatorRole: 'Architecte & Concepteur Principal',
    tagline: 'L\'Aventure Ultime pour Maîtriser le SQL par le Jeu',
    version: 'v1.3 PWA',

    tabQuests: 'Carte Quêtes',
    tabChallenges: 'Défis SQL',
    tabMinigames: 'Mini-Jeux SQL',
    tabLearn: 'Apprendre',
    tabSandbox: 'Bac à Sable',
    tabBadges: 'Trophées',
    tabStats: 'Statistiques',
    tabProfile: 'Mon Profil',

    level: 'Niveau',
    rank: 'Rang',
    xpProgress: 'Progression XP',
    streak: 'Série',
    streakDesc: 'Défis réussis consécutivement sans erreur',
    lives: 'Vies',
    refillLives: 'Recharger mes vies gratuitement',
    points: 'Points',
    soundOn: 'Activer le son',
    soundOff: 'Couper le son',
    themeDark: 'Mode Sombre',
    themeLight: 'Mode Clair',
    themeCyberpunk: 'Mode Néon',
    languageSelect: 'Changer la langue',
    installApp: 'Installer l\'Application',
    installedApp: 'Application Installée',

    splashWelcome: 'BIENVENUE DANS',
    splashPresenter: 'Une création originale de OROMASIS BANDUENGA',
    splashTagline: 'Forge tes compétences en requêtes relationnelles, bats les boss de bases de données et décroche le rang d\'Archimage SQL.',
    splashLoading: 'Initialisation du moteur SQL Sandbox...',
    splashReady: 'Arène Prête !',
    splashEnter: 'Commencer l\'Aventure',
    splashSkip: 'Passer l\'intro',
    splashFeatures: {
      interactive: 'Exécution SQL temps réel dans le navigateur',
      offline: 'Installable sur PC & Mobile (PWA Hors-ligne)',
      rpg: 'Système RPG complet : XP, Niveaux, Vies, Badges & Boss'
    },

    pwaModalTitle: 'Installer SQL Quest sur ton Appareil',
    pwaModalSubtitle: 'Installe l\'application sur ton ordinateur (Windows/Mac/Linux) ou sur ton téléphone portable (Android/iPhone) pour y accéder instantanément et hors ligne.',
    pwaBtnInstall: 'Installer Immédiatement',
    pwaDesktopTitle: 'Sur Ordinateur (Chrome, Edge, Brave)',
    pwaDesktopStep: 'Clique sur le bouton ci-dessus ou sur l\'icône ⊕ dans la barre d\'adresse de ton navigateur pour installer SQL Quest sur ton bureau.',
    pwaAndroidTitle: 'Sur Téléphone Android',
    pwaAndroidStep: 'Appuie sur "Installer" ou ouvre le menu de Chrome (⋮) puis sélectionne "Ajouter à l\'écran d\'accueil" ou "Installer l\'application".',
    pwaIosTitle: 'Sur iPhone / iPad (Safari)',
    pwaIosStep: 'Appuie sur le bouton Partager (icône avec la flèche vers le haut ⎋) puis sélectionne "Sur l\'écran d\'accueil ⊞".',
    pwaClose: 'Compris !',

    footerDesc: 'Plateforme gamifiée d\'apprentissage et d\'entraînement au langage SQL avec bac à sable interactif.',
    footerCreatedBy: 'Conçu & Développé par :',
    footerContactWhatsapp: 'WhatsApp :',
    qrCodeBtn: 'Scanner le Code QR',
    qrCodeModalTitle: 'Scanner & Télécharger l\'Application',
    qrCodeModalSubtitle: 'Scanne ce code QR avec l\'appareil photo de ton téléphone ou l\'application Google (Google Lens) pour ouvrir et installer SQL Quest Arena directement.',
    qrCodeScanInstruction: 'Pointe ton appareil photo ou Google Lens vers le code QR ci-dessous',
    qrCodeGoogleNotice: 'Compatible avec Google Chrome, Google Lens, Safari & tout smartphone',
    qrCodeCopyLink: 'Copier le lien',
    qrCodeLinkCopied: 'Lien copié dans le presse-papier !',
    qrCodeOpenDirect: 'Ouvrir directement'
  },

  en: {
    appName: 'SQL QUEST ARENA',
    creatorName: 'OROMASIS BANDUENGA',
    creatorRole: 'Lead Architect & Designer',
    tagline: 'The Ultimate Gamified SQL Adventure',
    version: 'v1.3 PWA',

    tabQuests: 'Quest Map',
    tabChallenges: 'Challenges',
    tabMinigames: 'SQL Minigames',
    tabLearn: 'Learn SQL',
    tabSandbox: 'Sandbox',
    tabBadges: 'Badges',
    tabStats: 'Statistics',
    tabProfile: 'Profile',

    level: 'Level',
    rank: 'Rank',
    xpProgress: 'XP Progress',
    streak: 'Streak',
    streakDesc: 'Consecutive challenges solved without failure',
    lives: 'Lives',
    refillLives: 'Refill lives for free',
    points: 'Points',
    soundOn: 'Enable Sound',
    soundOff: 'Mute Sound',
    themeDark: 'Dark Mode',
    themeLight: 'Light Mode',
    themeCyberpunk: 'Neon Mode',
    languageSelect: 'Change Language',
    installApp: 'Install App',
    installedApp: 'App Installed',

    splashWelcome: 'WELCOME TO',
    splashPresenter: 'An original creation by OROMASIS BANDUENGA',
    splashTagline: 'Master relational database queries, defeat SQL bosses, and reach the Archmage rank.',
    splashLoading: 'Initializing SQL in-browser engine...',
    splashReady: 'Arena Ready!',
    splashEnter: 'Start the Adventure',
    splashSkip: 'Skip Intro',
    splashFeatures: {
      interactive: 'Real-time client-side SQL execution',
      offline: 'Installable on PC & Mobile (PWA offline ready)',
      rpg: 'Full RPG system: XP, Levels, Hearts, Badges & Bosses'
    },

    pwaModalTitle: 'Install SQL Quest on Your Device',
    pwaModalSubtitle: 'Install this app on your computer (Windows/Mac/Linux) or smartphone (Android/iPhone) for quick offline access.',
    pwaBtnInstall: 'Install Now',
    pwaDesktopTitle: 'On Desktop (Chrome, Edge, Brave)',
    pwaDesktopStep: 'Click the install button or the ⊕ icon in your browser address bar to install SQL Quest.',
    pwaAndroidTitle: 'On Android Mobile',
    pwaAndroidStep: 'Tap "Install" or open the Chrome menu (⋮) and choose "Install app" or "Add to Home Screen".',
    pwaIosTitle: 'On iPhone / iPad (Safari)',
    pwaIosStep: 'Tap the Share button (square with arrow ⎋) and select "Add to Home Screen ⊞".',
    pwaClose: 'Got it!',

    footerDesc: 'Gamified interactive SQL learning platform featuring client-side sandbox execution.',
    footerCreatedBy: 'Designed & Developed by:',
    footerContactWhatsapp: 'WhatsApp:',
    qrCodeBtn: 'Scan QR Code',
    qrCodeModalTitle: 'Scan & Download Application',
    qrCodeModalSubtitle: 'Scan this QR code with your smartphone camera or Google Lens to instantly open and install SQL Quest Arena.',
    qrCodeScanInstruction: 'Point your camera or Google Lens at the QR code below',
    qrCodeGoogleNotice: 'Compatible with Google Chrome, Google Lens, Safari & all mobile devices',
    qrCodeCopyLink: 'Copy Link',
    qrCodeLinkCopied: 'Link copied to clipboard!',
    qrCodeOpenDirect: 'Open directly'
  },

  ln: {
    appName: 'SQL QUEST ARENA',
    creatorName: 'OROMASIS BANDUENGA',
    creatorRole: 'Molakisi & Motongi ya Monene',
    tagline: 'Nzela ya lisano mpo na koyekola SQL na mayele',
    version: 'v1.3 PWA',

    tabQuests: 'Karti ya Misala',
    tabChallenges: 'Mekwelo ya SQL',
    tabMinigames: 'Masano ya SQL',
    tabLearn: 'Koyekola',
    tabSandbox: 'Esika ya Mekelo',
    tabBadges: 'Mbano & Matabisi',
    tabStats: 'Kotala Makambo',
    tabProfile: 'Bomoto na Ngai',

    level: 'Nivo',
    rank: 'Ebandeli',
    xpProgress: 'Bokoli ya XP',
    streak: 'Molongo ya Molongi',
    streakDesc: 'Mekwelo olongi kozanga kobunga',
    lives: 'Bomoi',
    refillLives: 'Bakisa bomoi ofele',
    points: 'Bapwɛ',
    soundOn: 'Fungola lokito',
    soundOff: 'Kanga lokito',
    themeDark: 'Molili (Dark)',
    themeLight: 'Polele (Light)',
    themeCyberpunk: 'Langilangi (Neon)',
    languageSelect: 'Bongola Lokota',
    installApp: 'Tia na Telefone / Ordinatɛrɛ',
    installedApp: 'Etiyami kala',

    splashWelcome: 'BOYEI BOLAMU NA',
    splashPresenter: 'Ebongisami mpe etongami na OROMASIS BANDUENGA',
    splashTagline: 'Yekola kotanga mpe kobongisa ba bases de données na nzela ya masano ya SQL.',
    splashLoading: 'Kozela esika ya SQL...',
    splashReady: 'Esimbi malamu !',
    splashEnter: 'Banda Lisano Sika',
    splashSkip: 'Leka noki',
    splashFeatures: {
      interactive: 'Salela ba requêtes SQL na tango yango mpenza',
      offline: 'Koki kotia yango na ordinatɛrɛ to telefone (PWA)',
      rpg: 'Masano ya solosolo : XP, Bomoi, Mbano mpe Balongi'
    },

    pwaModalTitle: 'Tia SQL Quest na Telefone to Ordinatɛrɛ na yo',
    pwaModalSubtitle: 'Tia aplikasion oyo mpo na kosalela yango ata na internet te (hors-ligne).',
    pwaBtnInstall: 'Tia Sika Oyo',
    pwaDesktopTitle: 'Na Ordinatɛrɛ (PC / Mac)',
    pwaDesktopStep: 'Finá bouton oyo to finá likonzi ⊕ na bar ya adrɛsi ya navigatɛrɛ.',
    pwaAndroidTitle: 'Na Telefone Android',
    pwaAndroidStep: 'Finá "Tia" to fungola menu ya Chrome (⋮) mpe pona "Ajouter à l\'écran d\'accueil".',
    pwaIosTitle: 'Na iPhone / iPad (Safari)',
    pwaIosStep: 'Finá bouton ya kokabola (icône ⎋) mpe pona "Sur l\'écran d\'accueil ⊞".',
    pwaClose: 'Nazwi yango !',

    footerDesc: 'Ebongiseli ya masano mpo na koyekola SQL na bokasi mpe mayele.',
    footerCreatedBy: 'Esalemi na :',
    footerContactWhatsapp: 'WhatsApp :',
    qrCodeBtn: 'Scanner Code QR',
    qrCodeModalTitle: 'Scanner mpe Tia Aplikasion',
    qrCodeModalSubtitle: 'Kanga photo ya Code QR oyo na telefone to na Google mpo na kofungola mpe kotia SQL Quest Arena.',
    qrCodeScanInstruction: 'Tala Code QR oyo na appareil photo to Google Lens',
    qrCodeGoogleNotice: 'Esalaka na Google Chrome, Google Lens, Safari mpe telefone nionso',
    qrCodeCopyLink: 'Kopier lien',
    qrCodeLinkCopied: 'Lien ekomami !',
    qrCodeOpenDirect: 'Fungola mbala moko'
  },

  sw: {
    appName: 'SQL QUEST ARENA',
    creatorName: 'OROMASIS BANDUENGA',
    creatorRole: 'Mbunifu Mkuu & Msanidi Programu',
    tagline: 'Matukio ya Kujifunza SQL Kupitia Michezo',
    version: 'v1.3 PWA',

    tabQuests: 'Ramani ya Safari',
    tabChallenges: 'Changamoto za SQL',
    tabMinigames: 'Michezo Midogo',
    tabLearn: 'Jifunze SQL',
    tabSandbox: 'Uwanja wa Majaribio',
    tabBadges: 'Nishani & Tuzo',
    tabStats: 'Takwimu',
    tabProfile: 'Wasifu Wangu',

    level: 'Kiwango',
    rank: 'Cheo',
    xpProgress: 'Maendeleo ya XP',
    streak: 'Mfululizo wa Ushindi',
    streakDesc: 'Changamoto zilizoshinda bila kukosea',
    lives: 'Maisha',
    refillLives: 'Jaza maisha bure',
    points: 'Pointi',
    soundOn: 'Washa Sauti',
    soundOff: 'Zima Sauti',
    themeDark: 'Mandhari ya Giza',
    themeLight: 'Mandhari ya Mwangaza',
    themeCyberpunk: 'Mandhari ya Neon',
    languageSelect: 'Badilisha Lugha',
    installApp: 'Sakinisha Kwenye Kifaa',
    installedApp: 'Imesakinishwa',

    splashWelcome: 'KARIBU KWENYE',
    splashPresenter: 'Kazi halisi kutoka kwa OROMASIS BANDUENGA',
    splashTagline: 'Bobea katika SQL kupitia changamoto za kusisimua na ufikie kiwango cha juu cha mtaalamu.',
    splashLoading: 'Inapakia mfumo wa SQL...',
    splashReady: 'Uwanja Uko Tayari!',
    splashEnter: 'Anza Safari Sasa',
    splashSkip: 'Ruka Utangulizi',
    splashFeatures: {
      interactive: 'Utekelezaji wa SQL wa moja kwa moja',
      offline: 'Inaweza kusakinishwa kwenye PC na Simu (Inafanya kazi bila mtandao)',
      rpg: 'Mfumo kamili wa mchezo: XP, Viwango, Maisha na Tuzo'
    },

    pwaModalTitle: 'Sakinisha SQL Quest Kwenye Kifaa Chako',
    pwaModalSubtitle: 'Weka programu hii kwenye kompyuta yako au simu yako ya mkononi ili uitumie kwa urahisi hata bila mtandao.',
    pwaBtnInstall: 'Sakinisha Sasa',
    pwaDesktopTitle: 'Kwenye Kompyuta (Windows/Mac)',
    pwaDesktopStep: 'Bofya kitufe cha kusakinisha au alama ya ⊕ kwenye sehemu ya anwani ya kivinjari chako.',
    pwaAndroidTitle: 'Kwenye Simu ya Android',
    pwaAndroidStep: 'Bofya "Sakinisha" au fungua menyu ya Chrome (⋮) kisha chagua "Ongeza kwenye Skrini Kuu".',
    pwaIosTitle: 'Kwenye iPhone / iPad (Safari)',
    pwaIosStep: 'Bofya kitufe cha Shiriki (ikoni ya ⎋) na uchague "Ongeza kwenye Skrini Kuu ⊞".',
    pwaClose: 'Nimeelewa!',

    footerDesc: 'Jukwaa la kipekee la kujifunza SQL kupitia michezo na mazoezi shirikishi.',
    footerCreatedBy: 'Imebuniwa & Kujengwa na:',
    footerContactWhatsapp: 'WhatsApp :',
    qrCodeBtn: 'Skani Msimbo wa QR',
    qrCodeModalTitle: 'Skani & Pakua Programu',
    qrCodeModalSubtitle: 'Skani msimbo huu wa QR kwa kutumia kamera ya simu yako au Google Lens ili kufungua na kusakinisha SQL Quest Arena mara moja.',
    qrCodeScanInstruction: 'Elekeza kamera yako au Google Lens kwenye msimbo wa QR hapa chini',
    qrCodeGoogleNotice: 'Inafanya kazi na Google Chrome, Google Lens, Safari na simu zote',
    qrCodeCopyLink: 'Nakili Kiungo',
    qrCodeLinkCopied: 'Kiungo kimenakiliwa!',
    qrCodeOpenDirect: 'Fungua moja kwa moja'
  }
};
