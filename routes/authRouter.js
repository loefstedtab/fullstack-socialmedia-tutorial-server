const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get(
  "/google",
  passport.authenticate("google", {
    scope: "profile email",
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: true }),
  (_, res) => {
    res.redirect(process.env.CLIENT_URL);
  }
);

module.exports = router;
