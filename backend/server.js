import express from "express";
import cors from "cors";
import { supabase } from "./db/supabase.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// 기본 라우트
app.get("/", (req, res) => {
  res.send("✅ ClearPol API connected to Supabase!");
});

// ===== 정치인 API =====
// 전체 정치인 목록 조회
app.get("/politicians", async (req, res) => {
  const { data, error } = await supabase.from("politicians").select("*");
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// 특정 정치인 상세 조회
app.get("/politicians/:id", async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from("politicians")
    .select("*")
    .eq("id", id)
    .single();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// 정치인 등록 (관리자)
app.post("/politicians", async (req, res) => {
  const { name, party, region, career, promises, photo_url } = req.body;
  const { data, error } = await supabase
    .from("politicians")
    .insert({ name, party, region, career, promises, photo_url })
    .select();
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data[0]);
});

// 정치인 수정 (관리자)
app.put("/politicians/:id", async (req, res) => {
  const { id } = req.params;
  const { name, party, region, career, promises, photo_url } = req.body;
  const { data, error } = await supabase
    .from("politicians")
    .update({ name, party, region, career, promises, photo_url })
    .eq("id", id)
    .select();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data[0]);
});

// 정치인 삭제 (관리자)
app.delete("/politicians/:id", async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from("politicians").delete().eq("id", id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: "정치인이 삭제되었습니다." });
});

// ===== 댓글 API =====
// 댓글 목록 조회
app.get("/politicians/:id/comments", async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from("comments")
    .select(
      `
      *,
      users(username)
    `
    )
    .eq("politician_id", id)
    .order("created_at", { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// 댓글 작성
app.post("/politicians/:id/comments", async (req, res) => {
  const { id } = req.params;
  const { user_id, content } = req.body;
  const { data, error } = await supabase
    .from("comments")
    .insert({ politician_id: id, user_id, content })
    .select();
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data[0]);
});

// 댓글 삭제
app.delete("/comments/:id", async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from("comments").delete().eq("id", id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: "댓글이 삭제되었습니다." });
});

app.listen(PORT, () => {
  console.log(`🚀 ClearPol backend running at http://localhost:${PORT}`);
});
