import asyncHandler from "express-async-handler";
import Lesson from "../Models/lessonModel.js";

// @desc    Add a new lesson
// @route   POST /api/lessons
// @access  Private/Admin
export const addNewLesson = asyncHandler(async (req, res) => {
    const newLesson = await Lesson.create({
        title: req.body.title,
        image: req.body.image,
        subject: req.body.subject,
        content: req.body.content,
        language: req.body.language,
    });
    res.status(201).json({
        message: "Lesson Added Successfully.",
        success: true,
        data: newLesson,
    });
});

// @desc    Get all lessons
// @route   GET /api/lessons
// @access  Public
export const getAllLessons = asyncHandler(async (req, res) => {
    const lessons = await Lesson.find({});
    res.json(lessons);
});

// @desc    Get a lesson by ID
// @route   GET /api/lessons/:id
// @access  Public
export const getLessonById = asyncHandler(async (req, res) => {
    const lesson = await Lesson.findById(req.params.id);

    if (lesson) {
        res.json(lesson);
    } else {
        res.status(404);
        throw new Error("Lesson not found");
    }
});

// @desc    Update a lesson
// @route   PUT /api/lessons/:id
// @access  Private/Admin
export const updateLesson = asyncHandler(async (req, res) => {
    const lesson = await Lesson.findById(req.params.id);

    if (lesson) {
        lesson.title = req.body.title || lesson.title;
        lesson.image = req.body.image || lesson.image;
        lesson.subject = req.body.subject || lesson.subject;
        lesson.content = req.body.content || lesson.content;
        lesson.language = req.body.language || lesson.language;

        const updatedLesson = await lesson.save();
        res.json(updatedLesson);
    } else {
        res.status(404);
        throw new Error("Lesson not found");
    }
});

// @desc    Delete a lesson
// @route   DELETE /api/lessons/:id
// @access  Private/Admin
export const deleteLesson = asyncHandler(async (req, res) => {
    const lesson = await Lesson.findByIdAndDelete(req.params.id);

    if (lesson) {
        res.json({ message: "Lesson removed" });
    } else {
        res.status(404);
        throw new Error("Lesson not found");
    }
});


export const countAllLessons = asyncHandler(async (req, res) => {
  try {
    const count = await Lesson.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ error: "Server error while counting Lessons." });
  }
});

// @desc    GET Lessons by Subject
// @route   GET /api/lessons/count
// @access  Private/Admin

export const getLessonsCountBySubject = asyncHandler(async (req, res) => {
  const result = await Lesson.aggregate([
    {
      $group: {
        _id: "$subject",     // Group by subject
        count: { $sum: 1 }   // Count lessons per subject
      }
    },
    {
      $sort: { count: -1 }   // Sort descending
    },
    {
      $project: {
        _id: 0,
        subject: "$_id",     // Rename _id to subject
        count: 1
      }
    }
  ]);

  res.json(result);
});


export const getAllLessonsData = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10; // set default limit
  const skip = (page - 1) * limit;

  try {
    const totalLessons = await Lesson.countDocuments();
    const lessons = await Lesson.find()
      .skip(skip)
      .limit(limit)
      .lean();

    res.json({
      lessons,
      totalLessons,
      totalPages: Math.ceil(totalLessons / limit),
      page,
    });
  } catch (error) {
    console.error("Error fetching lessons:", error);
    res.status(500).json({ message: "Server error fetching lessons" });
  }
});
