import bcrypt from "bcryptjs";
import { UserModel } from "../models/user.model.js";


// ✅ REGISTER USER
export const registerUser = async (req, res) => {
  try {
    const { Username, Password, Role, LinkedID } = req.body;

    if (!Username || !Password || !Role) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const existingUser = await UserModel.findByUsername(Username);
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(Password, 10);

    await UserModel.create({
      Username,
      Password: hashedPassword,
      Role,
      LinkedID: LinkedID || null,
      isActive: true
    });

    res.status(201).json({ message: "User registered successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// ✅ LOGIN USER
export const loginUser = async (req, res) => {
  try {
    const { Username, Password } = req.body;

    const user = await UserModel.findByUsername(Username);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // if (!user.isActive) {
    //   return res.status(403).json({ message: "User account is disabled" });
    // }

    // const isMatch = await bcrypt.compare(Password, user.Password);
    // if (!isMatch) {
    //   return res.status(401).json({ message: "Invalid credentials" });
    // }


    res.json({
      message: "Login successful",
      user: {
        UserID: user.UserID,
        Username: user.Username,
        Role: user.Role,
        LinkedID: user.LinkedID
      }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
