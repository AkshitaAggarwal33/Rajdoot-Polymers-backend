const router = require("express").Router()
const User = require("../models/User")

router.post("/register", async (req, res) => {
  const { name, email, mobile } = req.body

  let user = await User.findOne({ email })

  if (user) {
    return res.json({ status: "exists" })
  }

  const newUser = new User({ name, email, mobile })
  await newUser.save()

  res.json({ status: "registered" })
})

module.exports = router