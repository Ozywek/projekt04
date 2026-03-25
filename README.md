# projekt4
npm install node
npm init --yes
npm install express
npm install cookie-parser
npm install argon2
chmod a+x utils/generate_env.sh
utils/generate_env.sh > .env
npm run populate_db
npm run dev