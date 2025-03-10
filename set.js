const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSU9GNUcxZXpaWHRoRUZUaXl3Z2QvdlBzTzAwRkRTYUZsb3Y2eEYxUFlIcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicFF2Y2VjUEp1QlhYcjFsT3B5aDZvMnd4RHY3UWhEUzdiVUs4MFVQbVFBMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJNS0lIZTIzU2s4TXM0K0xZaHQ1UE1tUHpieFZqdkVIZU5yWnNHSnZ3YVZvPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJmZzJZb2NYNmVvQ2hjS0R1ZVFqdmR5a3dkcnR0MndmWW9pZXZsbGdlQ1ZnPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImdINXZVQlUxSGJZR2VwUnZPZDZybzd0ZmhvZ0dUU0lPVVJ4RGRXdmovbWc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlMxdTZrMHFhbkVLMi9waFdTdW9QaUNNTm5YL1VYWTRVQzBGS1VldzAyQUk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibURDV3lEdjNuM3JGaEtwQjN0cThLb0xNbFY0SlJHaEx2dlllb1U2aEhVaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWEwzZDY4UlducmVpMUh2NjlOWHJSOGpDSVV2bTUyb3RaTHoyVzFaR0ppdz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkI2aUNZU29yejBYbzNMT0l2UHdySFlCcDNwanZNVFRWVzdTRFlNLzF0VzhQeXk0UG1RRGd4MEQ1RUR2MDdTVlR6TEw4ajQ2M1p1M2NKVFcrV0ZjU0RBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTQ5LCJhZHZTZWNyZXRLZXkiOiJueE00SzNBdU1VTDk2M0lzU1FsbzBSZFQ4ZEViUlMzNElzOU9oeDlKNW1zPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1NTY5NTc0ODU2MkBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJDMzRFRUY2NzIzOTI1NDU3RjMzQzhGNjU0NjBFQUQzMyJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQxNjAyMTU1fV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJiLU14S0J1QlR6eUVES1dab3JXSUxBIiwicGhvbmVJZCI6ImNmN2UxMmZiLWNkNGItNGQ1Zi1iOGZkLTk3NTA4ZDViOTIyZSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJLS2lMRTJRZXp0MEdFVVR0RG1pYlBjNDNGUDQ9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTktVM3RyYlVzZXUzKzBjNjVrUyszYzR4RHdFPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlJCTThFVkxDIiwibWUiOnsiaWQiOiIyNTU2OTU3NDg1NjI6OUBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiLwnZC68J2bqPCdm6nwnZGG8J2RhyJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDUFg3NTdZQkVOcjZ1cjRHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiL0VTVk9kN0lZN1JqV0VKZDlJcWdSMXhKZitDTjhEaEZKcHg2Ymx1eWdURT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiKzBMNFdLVjJMTmJPNFFYd0N0VThqdEFBOWdvM04zd0laOHRBUksvWTROSnQxUnlJS3plNFFwRStTY1N4TjJhaXdlbmFSU0o5eG5WVExseDBlcS8zQVE9PSIsImRldmljZVNpZ25hdHVyZSI6IkRNWnQ0Y3lpcmZVcGlqRDE2VGtQVjY2cy9ENXFKMDU1WGVjRncyMmQvdkVGVFNOOTExa2ZpRkNSa0pyT3VjWVN0WkJsbFVBanRsM3JvYnlSYnlUSUFBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU1Njk1NzQ4NTYyOjlAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZnhFbFRuZXlHTzBZMWhDWGZTS29FZGNTWC9namZBNFJTYWNlbTVic29FeCJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0MTYwMjE1MiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFObUIifQ==',
    PREFIXE: process.env.PREFIX || ">",
    OWNER_NAME: process.env.OWNER_NAME || "𝐺𝛨𝛩𝑆𝑇",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "255695748562",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || '𝐺𝛨𝛩𝑆𝑇',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/60cd0a18bda777a41ffe3.jpg,https://telegra.ph/file/bc9bf76f258c98877d993.jpg,https://telegra.ph/file/f6c60977ceb194e05e616.jpg,https://telegra.ph/file/74d7f0176b4e779dea4fd.jpg,https://telegra.ph/file/d04abf5e17b331ab46871.jpg,https://telegra.ph/file/2ab35f2759d081657d286.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
