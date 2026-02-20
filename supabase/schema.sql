-- ================================================================
-- PAR-Q · Vitor Trainer — Schema completo
-- Execute este SQL no painel do Supabase: SQL Editor → New query
-- ================================================================

-- 1. TABELA PRINCIPAL
create table if not exists public.submissions (
  id                        uuid primary key default gen_random_uuid(),
  created_at                timestamptz not null default now(),
  status                    text not null default 'pending'
                              check (status in ('pending', 'approved', 'rejected')),

  -- Dados pessoais
  full_name                 text not null,
  email                     text not null,
  phone                     text not null,
  age                       text not null,
  height                    text not null,
  weight                    text not null,
  training_time             text,

  -- Histórico de saúde
  has_health_issue          text not null default 'nao',
  health_issue_detail       text,
  has_joint_pain            text not null default 'nao',
  joint_pain_detail         text,
  has_injury_or_surgery     text not null default 'nao',
  injury_or_surgery_detail  text,
  uses_supplements          text not null default 'nao',
  supplements_detail        text,
  weekly_availability       text,
  daily_gym_time            text,
  sleep_hours               text,
  sleep_quality             text,
  fitness_level             text,
  tired_easily              text,
  discomfort_exercise       text,
  discomfort_exercise_detail text,
  main_goals                text,
  specific_goal             text,

  -- PAR-Q
  parq_q1                   text not null,
  parq_q2                   text not null,
  parq_q3                   text not null,
  parq_q4                   text not null,
  parq_q5                   text not null,
  parq_q6                   text not null,
  parq_q7                   text not null
);

-- 2. ROW LEVEL SECURITY
alter table public.submissions enable row level security;

-- Qualquer pessoa pode INSERIR (aluno preenche o formulário sem login)
create policy "Alunos podem enviar formulário"
  on public.submissions
  for insert
  with check (true);

-- Somente autenticados podem LER (para o painel admin)
create policy "Admin pode ler todos"
  on public.submissions
  for select
  to authenticated
  using (true);

-- Somente autenticados podem ATUALIZAR status
create policy "Admin pode atualizar status"
  on public.submissions
  for update
  to authenticated
  using (true)
  with check (true);

-- Somente autenticados podem DELETAR
create policy "Admin pode deletar"
  on public.submissions
  for delete
  to authenticated
  using (true);

-- 3. ÍNDICES para performance
create index if not exists idx_submissions_created_at on public.submissions(created_at desc);
create index if not exists idx_submissions_status      on public.submissions(status);
create index if not exists idx_submissions_email       on public.submissions(email);

-- ================================================================
-- CRUD DE REFERÊNCIA (use no SQL Editor para testar)
-- ================================================================

-- [C] INSERT — Inserir um questionário manualmente
/*
insert into public.submissions (
  full_name, email, phone, age, height, weight, training_time,
  has_health_issue, has_joint_pain, has_injury_or_surgery, uses_supplements,
  weekly_availability, daily_gym_time, sleep_hours, sleep_quality,
  fitness_level, tired_easily, discomfort_exercise, main_goals, specific_goal,
  parq_q1, parq_q2, parq_q3, parq_q4, parq_q5, parq_q6, parq_q7
) values (
  'João Silva', 'joao@email.com', '+55 (62) 99999-0000', '28', '178', '80kg', '1 ano',
  'nao', 'nao', 'nao', 'sim',
  '5x', '1h30', '8', 'Boa',
  'Alto', 'Não', 'Não', 'Hipertrofia', 'Ganhar 5kg de massa',
  'nao', 'nao', 'nao', 'nao', 'nao', 'nao', 'nao'
);
*/

-- [R] SELECT — Listar todos os questionários
/*
select * from public.submissions order by created_at desc;
*/

-- [R] SELECT — Buscar por status
/*
select * from public.submissions where status = 'pending';
*/

-- [R] SELECT — Buscar por nome
/*
select * from public.submissions where full_name ilike '%joão%';
*/

-- [U] UPDATE — Aprovar um questionário
/*
update public.submissions set status = 'approved' where id = 'uuid-aqui';
*/

-- [U] UPDATE — Rejeitar um questionário
/*
update public.submissions set status = 'rejected' where id = 'uuid-aqui';
*/

-- [D] DELETE — Remover um questionário
/*
delete from public.submissions where id = 'uuid-aqui';
*/

-- [D] DELETE ALL — Limpar toda a tabela (CUIDADO!)
/*
delete from public.submissions;
*/
