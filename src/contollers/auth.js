const Token = require("../models/token");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

module.exports = {
  login: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      if (!username || !password)
        return res
          .status(400)
          .json({ error: "Username or Password is missing." });
      if ((username || email) && password) {
        const user = await User.findOne({ $or: [{ username }, { email }] });
        console.log(user);
        if (!user) return res.status(400).json("User not found");
        console.log(bcrypt.compareSync(password, user.password))
        if (user.isActive && bcrypt.compareSync(password, user.password)) {
            console.log("burdayir")
          let tokenData = await Token.findOne({userId: user._id });
          console.log(tokenData)
          if (!tokenData) {
            tokenData = await Token.create({
              userId: user._id,
              token: bcrypt.hashSync(user._id, 8),
            });
          }

          //JWT

          const accesToken = jwt.sign(user.toJSON(), process.env.ACCESS_KEY, {
            expiresIn: "1h",
          });
          const refreshToken = jwt.sign(
            { _id: user._id },
            process.env.REFRESH_KEY,
            { expiresIn: "30d" }
          );

          res.send({
            error: false,
            token: tokenData.token,
            bearer: { accesToken, refreshToken },
            user,
          });
        } else {
          throw new Error("User is not active");
        }
      } else {
        return res.send("Please enter username/email");
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  refresh: async (req, res) => {
    /*
            #swagger.tags = ['Authentication']
            #swagger.summary = 'JWT: Refresh'
            #swagger.description = 'Refresh access-token by refresh-token.'
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    bearer: {
                        refresh: '___refreshToken___'
                    }
                }
            }
        */

    const refreshToken = req.body?.bearer?.refreshToken;

    if (refreshToken) {
      jwt.verify(
        refreshToken,
        process.env.REFRESH_KEY,
        async function (err, userData) {
          if (err) {
            res.errorStatusCode = 401;
            throw err;
          } else {
            const { _id, password } = userData;

            if (_id && password) {
              const user = await User.findOne({ _id });

              if (user && user.password == password) {
                if (user.isActive) {
                  // JWT:
                  const accessToken = jwt.sign(
                    user.toJSON(),
                    process.env.ACCESS_KEY,
                    { expiresIn: "30m" }
                  );

                  res.send({
                    error: false,
                    bearer: { accessToken },
                  });
                } else {
                  throw new Error("This account is not active.");
                }
              } else {
                throw new Error("Wrong id or password.");
              }
            } else {
              throw new Error("Please enter id and password.");
            }
          }
        }
      );
    } else {
      throw new Error("Please enter token.refresh");
    }
  },

  logout: async (req, res) => {
    /*
            #swagger.tags = ["Authentication"]
            #swagger.summary = "Token: Logout"
            #swagger.description = 'Delete token-key.'
        */

    const auth = req.headers?.authorization || null; // Token ...tokenKey... // Bearer ...accessToken...
    const tokenKey = auth ? auth.split(" ") : null; // ['Token', '...tokenKey...'] // ['Bearer', '...accessToken...']

    let message = null,
      result = {};

    if (tokenKey) {
      if (tokenKey[0] == "Token") {
        // SimpleToken

        result = await Token.deleteOne({ token: tokenKey[1] });
        message = "Token deleted. Logout was OK.";
      } else {
        // JWT

        message = "No need any process for logout. You must delete JWT tokens.";
      }
    }

    res.send({
      error: false,
      message,
      result,
    });
  },
};
