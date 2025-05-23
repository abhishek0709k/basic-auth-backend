import "dotenv/config";
import express from "express";
import cors from "cors";
import User from "./signUpSchema.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const app = express();
const port = process.env.PORT || 5000;
app.use(cors({ origin: ["http://localhost:5173", "https://6830569c990ce8dd973fdc15--student-management-system-auth.netlify.app"] }));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("MongoDB connected successfully");
});

app.post("/api/signup", async (req, res) => {
  try {
    const { fullname, email, password, phoneNumber, companyName, isAgency } =
      req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      fullname,
      phoneNumber,
      email,
      password: hashedPassword,
      isAgency,
      companyName,
    });

    res.status(200).json({ success: true, User: newUser });
  } catch (error) {
    console.log("signup error", error);
  }
});

app.post("/api/signin", async (req, res) => {
     try {
      const { email, password } = req.body;


      const existedUser = await User.findOne({ email });

      if (!existedUser) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid email or password" });
      }

      const isPasswordValid = await bcrypt.compare(
        password,
        existedUser.password
      );

      if (!isPasswordValid) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid email or password" });
      }

      res
        .status(200)
        .json({ success: true, message: "Signed in successfully" });
    } catch (error) {
      console.error("SignIn Error:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
});

app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});
