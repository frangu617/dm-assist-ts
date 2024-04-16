const router = require("express").Router();
const db = require("../models");
const bcrypt = require("bcrypt");
const user = require("../models/user");
const jwt = require("json-web-token");

const { User } = db;

router.post("/", async (req, res) => {
   try {
     const user = await User.findOne({ email: req.body.email });
     if (
       !user ||
       !(await bcrypt.compare(req.body.password, user.passwordDigest))
     ) {
       return res.status(401).send("Invalid credentials");
     }
     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
     res.json({ user, token });
   } catch (error) {
     res.status(500).send("Login error");
   }
});


router.get('/profile', async (req, res) => {
  // req.json(req.currentUser)
    try {
        // Split the authorization header into [ "Bearer", "TOKEN" ]:
        const [authenticationMethod, token] = req.headers.authorization.split(' ')

        // Only handle "Bearer" authorization for now 
        //  (we could add other authorization strategies later):
        if (authenticationMethod == 'Bearer') {

            // Decode the JWT
            const result = await jwt.decode(process.env.JWT_SECRET, token)

            // Get the logged in user's id from the payload
            const { id } = result.value

            // Find the user object using their id:
            let user = await User.findOne({
                where: {
                    userId: id
                }
            })
            res.json(user)
        }
    } catch {
        res.json(null)
    }
})


module.exports = router;
