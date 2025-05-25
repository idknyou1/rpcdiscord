const RPC = require('discord-rpc');
const readline = require('readline');

// 🔧 Mets ici ton Client ID
const clientId = '1376264086492413972';

RPC.register(clientId);
const rpc = new RPC.Client({ transport: 'ipc' });

// Configuration Rich Presence par défaut
let currentActivity = {
  details: '',
  state: '',
  largeImageKey: '',
  largeImageText: '',
  smallImageKey: '',
  smallImageText: '',
  startTimestamp: null,
  instance: false,
};

// Interface CLI
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function displayPanel() {
  console.clear();
  console.log('🎛️  Panneau de configuration Rich Presence Discord');
  console.log('──────────────────────────────────────────────────');
  console.log(`1) ✏️  Modifier "details"         : ${currentActivity.details}`);
  console.log(`2) 🧾 Modifier "state"           : ${currentActivity.state}`);
  console.log(`3) 🖼️  Modifier "largeImageKey"  : ${currentActivity.largeImageKey}`);
  console.log(`4) 🖼️  Modifier "largeImageText" : ${currentActivity.largeImageText}`);
  console.log(`5) 🔹 Modifier "smallImageKey"  : ${currentActivity.smallImageKey}`);
  console.log(`6) 🔹 Modifier "smallImageText" : ${currentActivity.smallImageText}`);
  console.log(`7) ⏱️  Activer/Désactiver timestamp : ${currentActivity.startTimestamp ? '✅ Activé' : '❌ Désactivé'}`);
  console.log('8) ✅ Appliquer le Rich Presence');
  console.log('9) 🧹 Effacer le Rich Presence');
  console.log('10) 📋 Voir la config complète');
  console.log('0) 🚪 Quitter');
  console.log('──────────────────────────────────────────────────');
  rl.question('Choisis une option (0-10) : ', handleMenu);
}

function handleMenu(choice) {
  switch (choice.trim()) {
    case '1':
      rl.question('✏️ Nouveau "details" : ', (val) => {
        currentActivity.details = val;
        displayPanel();
      });
      break;
    case '2':
      rl.question('🧾 Nouveau "state" : ', (val) => {
        currentActivity.state = val;
        displayPanel();
      });
      break;
    case '3':
      rl.question('🖼️ Nouveau "largeImageKey" : ', (val) => {
        currentActivity.largeImageKey = val;
        displayPanel();
      });
      break;
    case '4':
      rl.question('🖼️ Nouveau "largeImageText" : ', (val) => {
        currentActivity.largeImageText = val;
        displayPanel();
      });
      break;
    case '5':
      rl.question('🔹 Nouveau "smallImageKey" : ', (val) => {
        currentActivity.smallImageKey = val;
        displayPanel();
      });
      break;
    case '6':
      rl.question('🔹 Nouveau "smallImageText" : ', (val) => {
        currentActivity.smallImageText = val;
        displayPanel();
      });
      break;
    case '7':
      currentActivity.startTimestamp = currentActivity.startTimestamp ? null : new Date();
      console.log(`⏱️ Timestamp ${currentActivity.startTimestamp ? 'activé' : 'désactivé'}.`);
      setTimeout(displayPanel, 700);
      break;
    case '8':
      const activity = { ...currentActivity };
      if (!activity.details) delete activity.details;
      if (!activity.state) delete activity.state;
      if (!activity.startTimestamp) delete activity.startTimestamp;
      if (!activity.largeImageKey) delete activity.largeImageKey;
      if (!activity.largeImageText) delete activity.largeImageText;
      if (!activity.smallImageKey) delete activity.smallImageKey;
      if (!activity.smallImageText) delete activity.smallImageText;

      rpc.setActivity(activity);
      console.log('✅ Rich Presence appliqué.');
      setTimeout(displayPanel, 1000);
      break;
    case '9':
      rpc.clearActivity();
      console.log('🧹 Rich Presence effacé.');
      setTimeout(displayPanel, 1000);
      break;
    case '10':
      console.log('📋 Configuration actuelle :');
      console.dir(currentActivity, { depth: null });
      rl.question('\nAppuie sur Entrée pour revenir au menu...', () => displayPanel());
      break;
    case '0':
      rl.close();
      rpc.destroy();
      console.log('👋 Au revoir !');
      process.exit(0);
      break;
    default:
      console.log('❓ Choix invalide.');
      setTimeout(displayPanel, 800);
  }
}

rpc.on('ready', () => {
  displayPanel();
});

rpc.login({ clientId }).catch(console.error);
