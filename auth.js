const passport = require("passport");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
require("dotenv").config();
const db = require("./db");
const User = require("./User");
const sequelize = require('sequelize')

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.CLIENT_ID,
//       clientSecret: process.env.CLIENT_SECRET,
//       callbackURL: process.env.GOOGLE_CALLBACK_URL,
//     },
//     async (_, __, profile, done) => {
//       const account = profile._json;
//       console.log(account)

//       let user = {};
//       try {
//         const currentUserQuery = await db.query(
//           "SELECT * FROM users WHERE google_id=$1",
//           [account.sub]
//         );

//         if (currentUserQuery.rows.length === 0) {
//           // create user
//           await db.query(
//             "INSERT INTO users (username, img, google_id) VALUES ($1,$2,$3)",
//             [account.name, account.picture, account.sub]
//           );

//           const id = await db.query("SELECT id FROM users WHERE google_id=$1", [
//             account.sub,
//           ]);
//           user = {
//             id: id.rows[0].id,
//             username: account.name,
//             img: account.picture,
//           };
//         } else {
//           // have user
//           user = {
//             id: currentUserQuery.rows[0].id,
//             username: currentUserQuery.rows[0].username,
//             img: currentUserQuery.rows[0].img,
//           };
//         }
//         done(null, user);
//       } catch (error) {
//         done(error);
//       }
//     }
//   )
// );

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (_, __, profile, done) => {
      let user = profile._json;
      console.log("THIS IS THE USER FROM GOOGLE", user)
      try {
       user = await User.findOrCreate({
        where:{
          google_id: user.sub
        }, defaults: {
          first_Name: user.given_name,
          last_Name: user.family_name,
          email: user.email
        }
       })
       console.log(user)
        done(null, user);
      } catch (error) {
        console.log(error)
        done(error);
      }
    }
  )
);


passport.serializeUser((user, done) => {
  // loads into req.session.passport.user
  done(null, user);
});

passport.deserializeUser((user, done) => {
  // loads into req.user
  done(null, user);
});
