const axios = require('axios');
const cron = require('node-cron');

const DEPLOY_HOOK_URL = "https://eu-launch-api.contentstack.com/manage/deploy/68d10db566b346fc809962b7";

async function triggerDeploy() {
  try {
    const response = await axios.post(DEPLOY_HOOK_URL);
    console.log(`Deploy déclenché: ${new Date().toISOString()}`);
    console.log(`Status: ${response.status}`);
  } catch (error) {
    console.error('Erreur deploy:', error.message);
  }
}

cron.schedule('26 12 * * *', () => {
  console.log('Déploiement programmé a démarré');
  triggerDeploy();
});

console.log('Scheduler démarré - déploiement programmé chaque jour');
console.log("url", DEPLOY_HOOK_URL);