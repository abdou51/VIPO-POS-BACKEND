const User = require("../models/user");
const bcrypt = require("bcrypt")
const generateToken = require("../middlewares/jwt");
const registerUser = async (req, res) => {
  try {
    let { password, ...userData } = req.body;

    // Check if user already exists
    let user = await User.findOne({
      username: userData.username,
    });

    // If user exists, return an error
    if (user) {
      return res.status(400).json({
        success: false,
        message: "L'utilisateur avec l'utilisateur donné existe déjà",
      });
    }

    // Asynchronously hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create a new user instance
    user = new User({
      ...userData,
      passwordHash,
    });

    // Save the new user
    user = await user.save();

    // Handle save errors
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "L'utilisateur ne peut pas être créé",
      });
    }

    // Return success message
    res.status(200).json({
      success: true,
      message: "Utilisateur enregistré avec succès",
    });

  } catch (error) {
    // Handle any other errors
    res.status(500).json({
      success: false,
      error: error.toString(),
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({
      username: { $regex: new RegExp(`^${req.body.username}$`, "i") },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Nom D'utilisateur ou mot de passe incorrect",
      });
    }
    if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
      try {
        const token = generateToken(user.id, user.role);
        res.status(200).json({
          message: "Connexion réussie",
          token: token,
          user:user
        });
      } catch (tokenError) {
        res
          .status(500)
          .send("Une erreur s'est produite lors de la génération du jeton.");
      }
    } else {
      res.status(400).json({
        success: false,
        message: "Nom D'utilisateur ou mot de passe incorrect",
      });
    }
  } catch (error) {
    res
      .status(500)
      .send("Une erreur s'est produite lors de la recherche de l'utilisateur.");
    console.log(error);
  }
};
module.exports= {
    registerUser,
    loginUser
}