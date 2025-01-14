import { Router } from "express";
import dotenv from "dotenv";
const router = Router();
dotenv.config();
const API_KEY = process.env.API_KEY;
router.get("/api/books", async (req, res) => {
    let { q, max } = req.query;
    q = !q ? "subject:fiction" : q;
    max = !max ? "20" : max;
    // Use a default query for the top 20 books if no query is provided
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(q)}&maxResults=${max}&key=${API_KEY}`;
    try {
        const response = await fetch(url, {
            headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        if (!data.items || data.items.length === 0) {
            return res.status(404).json({ error: "No books found." });
        }
        res.json(data.items.map((item) => ({
            title: item.volumeInfo.title,
            authors: item.volumeInfo.authors || ["Unknown"],
            thumbnail: item.volumeInfo.imageLinks?.thumbnail || "",
            description: item.volumeInfo.description || "No description available.",
        })));
    }
    catch (error) {
        console.error("Error fetching books:", error);
        res.status(500).json({ error: "Failed to fetch books." });
    }
});
export default router;
