# projekt4
npm install node
npm init --yes
npm install express
npm install cookie-parser
npm install argon2
chmod a+x utils/generate_env.sh
utils/generate_env.sh > .env
node utils/populate_db.js
npm run dev