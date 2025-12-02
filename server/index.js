import express from "express";
import cors from "cors";
import multer from "multer";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sqlite3 from "sqlite3";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET =
  process.env.JWT_SECRET || "your-secret-key-change-in-production";

// Middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Setup multer for file uploads
const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 25 * 1024 * 1024 }, // 25MB
});

// Initialize SQLite database
const db = new sqlite3.Database("./linguaflow.db", (err) => {
  if (err) {
    console.error("Database error:", err);
  } else {
    console.log("Connected to SQLite database");
    initializeDatabase();
  }
});

// Database initialization
const initializeDatabase = () => {
  db.serialize(() => {
    // Users table
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        fullName TEXT,
        profilePicture TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Translation history table
    db.run(`
      CREATE TABLE IF NOT EXISTS translations (
        id TEXT PRIMARY KEY,
        userId TEXT NOT NULL,
        sourceText TEXT NOT NULL,
        translatedText TEXT NOT NULL,
        sourceLang TEXT NOT NULL,
        targetLang TEXT NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users(id)
      )
    `);

    // Settings table
    db.run(`
      CREATE TABLE IF NOT EXISTS settings (
        id TEXT PRIMARY KEY,
        userId TEXT NOT NULL UNIQUE,
        useSystemTheme BOOLEAN DEFAULT 1,
        themeMode TEXT DEFAULT 'dark',
        autoTranslate BOOLEAN DEFAULT 1,
        soundNotifications BOOLEAN DEFAULT 0,
        saveHistory BOOLEAN DEFAULT 1,
        defaultSourceLang TEXT DEFAULT 'en',
        defaultTargetLang TEXT DEFAULT 'es',
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users(id)
      )
    `);
  });
};

// Promisify database operations
const dbRun = (sql, params) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve(this);
    });
  });
};

const dbGet = (sql, params) => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

const dbAll = (sql, params) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows || []);
    });
  });
};

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token" });
    }
    req.user = user;
    next();
  });
};

// Routes

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "Backend is running", timestamp: new Date() });
});

// AUTH ENDPOINTS

// Register
app.post("/api/auth/register", async (req, res) => {
  try {
    const { email, username, password, fullName } = req.body;

    if (!email || !username || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check if user exists
    const existingUser = await dbGet(
      "SELECT id FROM users WHERE email = ? OR username = ?",
      [email, username]
    );
    if (existingUser) {
      return res
        .status(409)
        .json({ error: "Email or username already exists" });
    }

    // Hash password
    const hashedPassword = await bcryptjs.hash(password, 10);
    const userId = uuidv4();

    // Create user
    await dbRun(
      "INSERT INTO users (id, email, username, password, fullName) VALUES (?, ?, ?, ?, ?)",
      [userId, email, username, hashedPassword, fullName || username]
    );

    // Create default settings
    await dbRun("INSERT INTO settings (id, userId) VALUES (?, ?)", [
      uuidv4(),
      userId,
    ]);

    // Generate token
    const token = jwt.sign({ userId, email, username }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: {
        id: userId,
        email,
        username,
        fullName: fullName || username,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Failed to register user" });
  }
});

// Login
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    const user = await dbGet("SELECT * FROM users WHERE email = ?", [email]);
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, username: user.username },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        fullName: user.fullName,
        profilePicture: user.profilePicture,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Failed to login" });
  }
});

// Get current user
app.get("/api/auth/me", authenticateToken, async (req, res) => {
  try {
    const user = await dbGet(
      "SELECT id, email, username, fullName, profilePicture FROM users WHERE id = ?",
      [req.user.userId]
    );
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ user });
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ error: "Failed to get user" });
  }
});

// Update user profile
app.put("/api/auth/profile", authenticateToken, async (req, res) => {
  try {
    const { fullName, username } = req.body;
    const userId = req.user.userId;

    await dbRun(
      "UPDATE users SET fullName = ?, username = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?",
      [fullName, username, userId]
    );

    const updatedUser = await dbGet(
      "SELECT id, email, username, fullName FROM users WHERE id = ?",
      [userId]
    );
    res.json({
      success: true,
      message: "Profile updated",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ error: "Failed to update profile" });
  }
});

// TRANSLATION ENDPOINTS

// Translate text
app.post("/api/translate", authenticateToken, async (req, res) => {
  try {
    const { text, sourceLang, targetLang } = req.body;

    if (!text || !targetLang) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Mock translation
    const translations = {
      es: "¡Hola! Texto traducido al instante.",
      fr: "Bonjour ! Texte traduit instantanément.",
      de: "Hallo! Text sofort übersetzt.",
      ja: "こんにちは！テキストが即座に翻訳されました。",
      zh: "你好！文本已立即翻译。",
    };

    const translatedText =
      translations[targetLang] || `[${targetLang.toUpperCase()}] ${text}`;

    // Save to history if authenticated
    if (req.user && req.user.userId) {
      const translationId = uuidv4();
      await dbRun(
        "INSERT INTO translations (id, userId, sourceText, translatedText, sourceLang, targetLang) VALUES (?, ?, ?, ?, ?, ?)",
        [
          translationId,
          req.user.userId,
          text,
          translatedText,
          sourceLang || "auto",
          targetLang,
        ]
      );
    }

    res.json({
      originalText: text,
      translatedText: translatedText,
      sourceLang: sourceLang || "auto",
      targetLang: targetLang,
      confidence: 0.95,
    });
  } catch (error) {
    console.error("Translation error:", error);
    res.status(500).json({ error: "Failed to translate text" });
  }
});

// Get translation history
app.get("/api/translations/history", authenticateToken, async (req, res) => {
  try {
    const limit = req.query.limit || 50;
    const translations = await dbAll(
      "SELECT id, sourceText, translatedText, sourceLang, targetLang, createdAt FROM translations WHERE userId = ? ORDER BY createdAt DESC LIMIT ?",
      [req.user.userId, limit]
    );
    res.json({ translations });
  } catch (error) {
    console.error("Get history error:", error);
    res.status(500).json({ error: "Failed to get history" });
  }
});

// Clear translation history
app.delete("/api/translations/history", authenticateToken, async (req, res) => {
  try {
    await dbRun("DELETE FROM translations WHERE userId = ?", [req.user.userId]);
    res.json({ success: true, message: "History cleared" });
  } catch (error) {
    console.error("Clear history error:", error);
    res.status(500).json({ error: "Failed to clear history" });
  }
});

// SPEECH TO TEXT
app.post(
  "/api/speech-to-text",
  authenticateToken,
  upload.single("audio"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No audio file provided" });
      }

      const language = req.body.language || "en";

      // Mock speech to text
      const mockTexts = {
        en: "This is a transcribed text from audio",
        es: "Este es un texto transcrito desde el audio",
        fr: "Ceci est un texte transcrit à partir de l'audio",
      };

      const text = mockTexts[language] || "Transcribed text from audio";

      // Clean up uploaded file
      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }

      res.json({
        text: text,
        language: language,
        confidence: 0.92,
      });
    } catch (error) {
      console.error("Speech to text error:", error);
      res.status(500).json({ error: "Failed to process audio" });
    }
  }
);

// SETTINGS ENDPOINTS

// Get user settings
app.get("/api/settings", authenticateToken, async (req, res) => {
  try {
    const settings = await dbGet("SELECT * FROM settings WHERE userId = ?", [
      req.user.userId,
    ]);
    if (!settings) {
      // Create default settings if not exists
      const settingsId = uuidv4();
      await dbRun("INSERT INTO settings (id, userId) VALUES (?, ?)", [
        settingsId,
        req.user.userId,
      ]);
      const newSettings = await dbGet(
        "SELECT * FROM settings WHERE userId = ?",
        [req.user.userId]
      );
      return res.json({ settings: newSettings });
    }
    res.json({ settings });
  } catch (error) {
    console.error("Get settings error:", error);
    res.status(500).json({ error: "Failed to get settings" });
  }
});

// Update user settings
app.put("/api/settings", authenticateToken, async (req, res) => {
  try {
    const {
      useSystemTheme,
      themeMode,
      autoTranslate,
      soundNotifications,
      saveHistory,
      defaultSourceLang,
      defaultTargetLang,
    } = req.body;

    await dbRun(
      `UPDATE settings SET 
        useSystemTheme = ?, 
        themeMode = ?, 
        autoTranslate = ?, 
        soundNotifications = ?, 
        saveHistory = ?, 
        defaultSourceLang = ?, 
        defaultTargetLang = ?,
        updatedAt = CURRENT_TIMESTAMP 
      WHERE userId = ?`,
      [
        useSystemTheme,
        themeMode,
        autoTranslate,
        soundNotifications,
        saveHistory,
        defaultSourceLang,
        defaultTargetLang,
        req.user.userId,
      ]
    );

    const updatedSettings = await dbGet(
      "SELECT * FROM settings WHERE userId = ?",
      [req.user.userId]
    );
    res.json({ success: true, settings: updatedSettings });
  } catch (error) {
    console.error("Update settings error:", error);
    res.status(500).json({ error: "Failed to update settings" });
  }
});

// Get supported languages
app.get("/api/languages", (req, res) => {
  const languages = {
    auto: "Auto Detect",
    en: "English",
    es: "Spanish",
    fr: "French",
    de: "German",
    it: "Italian",
    pt: "Portuguese",
    ru: "Russian",
    zh: "Chinese",
    ja: "Japanese",
    ko: "Korean",
    ar: "Arabic",
    hi: "Hindi",
    nl: "Dutch",
    tr: "Turkish",
    pl: "Polish",
  };
  res.json({ languages });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 LinguaFlow Backend running on http://localhost:${PORT}`);
  console.log(`\n📚 Available endpoints:`);
  console.log(`  Auth:`);
  console.log(`    POST /api/auth/register`);
  console.log(`    POST /api/auth/login`);
  console.log(`    GET /api/auth/me`);
  console.log(`    PUT /api/auth/profile`);
  console.log(`  Translation:`);
  console.log(`    POST /api/translate`);
  console.log(`    GET /api/translations/history`);
  console.log(`    DELETE /api/translations/history`);
  console.log(`  Speech:`);
  console.log(`    POST /api/speech-to-text`);
  console.log(`  Settings:`);
  console.log(`    GET /api/settings`);
  console.log(`    PUT /api/settings`);
  console.log(`  Misc:`);
  console.log(`    GET /api/languages`);
  console.log(`    GET /api/health\n`);
});
