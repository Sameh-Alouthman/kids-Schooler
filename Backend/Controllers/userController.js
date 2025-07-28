import asyncHandler from "express-async-handler";
import User from "../Models/userModel.js";
import bcrypt from "bcryptjs";

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private

//عرض بيانات المستخدم بشرط وجود توكن
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      age: user.age,
      badges: user.badges,
      image: user.image,
      type: user.type,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//تعديل بيانات المستخدم
export const updateUserData = asyncHandler(async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      req.user.id,
      {
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        image: req.body.image,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(201).json("Profile Info Has Been Edited Sucessfully");
  } catch (error) {
    res.status(500).send(`There Is An Error Editing Profile Info .. ${error}`);
  }
});
//تعديل كلمة السر للمستخدم
export const updateUserPassword = asyncHandler(async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      req.user.id,
      {
        password: await bcrypt.hash(req.body.password, 10),
      },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(201).json("Password Has Been Edited Sucessfully");
  } catch (error) {
    res.status(500).send(`There Is An Error Editing Profile Info .. ${error}`);
  }
});

//حذف المستخدم
export const deleteUserData = asyncHandler(async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    if (User) res.status(201).json("User Data Has Been Deleted Sucessfully");
  } catch (error) {
    res.status(500).send(`There Is An Error Deleting User Data .. ${error}`);
  }
});

export const countAllUsers = asyncHandler(async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ error: "Server error while counting users." });
  }
});

// export const getAllUsers = asyncHandler(async (req, res) => {
//   try {
//     const students = await User.find({ type: "student" });
//     res.json(students);
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     res.status(500).json({ message: "Server error fetching users" });
//   }
// });


export const getAllUsersData = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 1;
  const skip = (page - 1) * limit;

  try {
    const totalUsers = await User.countDocuments();
    const users = await User.find({ type: "student" })
      .skip(skip)
      .limit(limit)
      .select("-password")
      .lean();

    res.json({
      users,
      totalUsers,
      totalPages: Math.ceil(totalUsers / limit),
      page,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error fetching users" });
  }
});


export const deleteUserForAdmin = asyncHandler(async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (deletedUser) {
      res.status(200).json("User Data Has Been Deleted Successfully");
    } else {
      res.status(404).json("User not found");
    }
  } catch (error) {
    res.status(500).send(`There Is An Error Deleting User Data .. ${error}`);
  }
});
