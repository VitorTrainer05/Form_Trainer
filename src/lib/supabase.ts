import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Variáveis VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY não configuradas. Crie um arquivo .env com base no .env.example"
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ────────────────────────────────────────────────
// Types mapeados para o banco
// ────────────────────────────────────────────────
export interface SubmissionRow {
  id: string;
  created_at: string;
  status: "pending" | "approved" | "rejected";

  // personal
  full_name: string;
  email: string;
  phone: string;
  age: string;
  height: string;
  weight: string;
  training_time: string;

  // health
  has_health_issue: string;
  health_issue_detail: string;
  has_joint_pain: string;
  joint_pain_detail: string;
  has_injury_or_surgery: string;
  injury_or_surgery_detail: string;
  uses_supplements: string;
  supplements_detail: string;
  weekly_availability: string;
  daily_gym_time: string;
  sleep_hours: string;
  sleep_quality: string;
  fitness_level: string;
  tired_easily: string;
  discomfort_exercise: string;
  discomfort_exercise_detail: string;
  main_goals: string;
  specific_goal: string;

  // parq
  parq_q1: string;
  parq_q2: string;
  parq_q3: string;
  parq_q4: string;
  parq_q5: string;
  parq_q6: string;
  parq_q7: string;
}

// ────────────────────────────────────────────────
// CRUD helpers
// ────────────────────────────────────────────────

/** CREATE — Salva um novo questionário */
export async function createSubmission(payload: Omit<SubmissionRow, "id" | "created_at" | "status">) {
  const { data, error } = await supabase
    .from("submissions")
    .insert([{ ...payload, status: "pending" }])
    .select()
    .single();

  if (error) throw error;
  return data as SubmissionRow;
}

/** READ ALL — Lista todos os questionários */
export async function getSubmissions() {
  const { data, error } = await supabase
    .from("submissions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as SubmissionRow[];
}

/** READ ONE — Busca um questionário pelo ID */
export async function getSubmissionById(id: string) {
  const { data, error } = await supabase
    .from("submissions")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data as SubmissionRow;
}

/** UPDATE — Atualiza o status de um questionário */
export async function updateSubmissionStatus(id: string, status: "pending" | "approved" | "rejected") {
  const { data, error } = await supabase
    .from("submissions")
    .update({ status })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data as SubmissionRow;
}

/** DELETE — Remove um questionário pelo ID */
export async function deleteSubmission(id: string) {
  const { error } = await supabase
    .from("submissions")
    .delete()
    .eq("id", id);

  if (error) throw error;
}
