import { useQuery, useQueryClient } from "@tanstack/solid-query";
import { createSignal, For, Show } from "solid-js";
import { css } from "styled-system/css";
import { fetchPapers } from "~/features/library/api";
import { GradeSubjectPicker, useGradeSubject } from "~/features/library/GradeSubjectPicker";
import {
  EXAM_TYPE_LABEL,
  EXAM_TYPES,
  type ExamType,
  formatBytes,
  paperLabel,
} from "~/features/library/papers";
import { LETTERS } from "~/features/practice/QuestionCard";
import { ConfirmDialog } from "~/ui/ConfirmDialog";
import { errorText, field, input, label } from "~/ui/forms";
import { button, panel, quietButton } from "~/ui/Page";
import { ListSkeleton } from "~/ui/Skeleton";
import {
  addQuestion,
  approveQuestion,
  deletePaper,
  deleteQuestion,
  fetchAdminQuestions,
  fetchOverview,
  fetchStudents,
  uploadPaper,
} from "./api";

const s = {
  eyebrow: css({ textStyle: "eyebrow", color: "ink.subtle", mb: "10px" }),
  stats: css({
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))",
    gap: "10px",
  }),
  stat: css({ p: "14px 16px", display: "flex", flexDirection: "column", gap: "4px" }),
  statValue: css({
    fontFamily: "mono",
    fontSize: "24px",
    fontWeight: "600",
    fontVariantNumeric: "tabular-nums",
  }),
  statLabel: css({ fontSize: "12.5px", color: "ink.subtle" }),
  form: css({
    p: "16px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
    gap: "12px",
    alignItems: "end",
  }),
  select: css({
    minH: "44px",
    px: "10px",
    rounded: "md",
    bg: "surface",
    color: "ink",
    fontSize: "15px",
    boxShadow: "inset 0 0 0 1px {colors.line}",
  }),
  list: css({ listStyle: "none", overflow: "hidden" }),
  row: css({
    display: "flex",
    alignItems: "center",
    gap: "12px",
    px: "16px",
    py: "12px",
    borderBottom: "1px solid {colors.line}",
    _last: { borderBottom: 0 },
  }),
  small: css({ minH: "36px", px: "12px", fontSize: "13px" }),
  table: css({
    w: "100%",
    borderCollapse: "collapse",
    fontSize: "13.5px",
    "& th": {
      textAlign: "left",
      textStyle: "eyebrow",
      color: "ink.subtle",
      p: "10px 12px",
      borderBottom: "1px solid {colors.line}",
      whiteSpace: "nowrap",
    },
    "& td": { p: "10px 12px", borderBottom: "1px solid {colors.line}", whiteSpace: "nowrap" },
    "& tr:last-child td": { borderBottom: 0 },
  }),
  num: css({ fontFamily: "mono", fontVariantNumeric: "tabular-nums", textAlign: "right" }),
};

const dateTime = (iso: string | null) =>
  iso ? new Date(iso).toLocaleDateString(undefined, { day: "numeric", month: "short" }) : "–";

export function OverviewTab() {
  const overview = useQuery(() => ({ queryKey: ["admin", "overview"], queryFn: fetchOverview }));
  const stats = () => {
    const o = overview.data;
    if (!o) return [];
    return [
      { label: "students", value: o.students, note: `+${o.new_students_week} this week` },
      { label: "active this week", value: o.active_students_week },
      { label: "answers this week", value: o.answers_week },
      { label: "practice sessions this week", value: o.attempts_week },
      { label: "papers", value: o.papers },
      { label: "live questions", value: o.questions },
      { label: "questions to review", value: o.questions_flagged },
    ];
  };
  return (
    <Show when={overview.data} fallback={<ListSkeleton label="Loading overview" />}>
      <div class={s.stats}>
        <For each={stats()}>
          {(stat) => (
            <div class={`${panel} ${s.stat}`}>
              <span class={s.statValue}>{stat.value.toLocaleString()}</span>
              <span class={s.statLabel}>
                {stat.label}
                {stat.note ? ` · ${stat.note}` : ""}
              </span>
            </div>
          )}
        </For>
      </div>
    </Show>
  );
}

export function PapersTab() {
  const picker = useGradeSubject();
  const queryClient = useQueryClient();
  const papers = useQuery(() => ({
    queryKey: ["papers", picker.grade(), picker.subject()?.id],
    queryFn: () => fetchPapers(picker.grade(), picker.subject()?.id ?? ""),
    enabled: picker.subject() !== undefined,
  }));
  const [examType, setExamType] = createSignal<ExamType>("mid1");
  const [semester, setSemester] = createSignal<1 | 2>(1);
  const [year, setYear] = createSignal(new Date().getFullYear());
  const [file, setFile] = createSignal<File | null>(null);
  const [busy, setBusy] = createSignal(false);
  const [error, setError] = createSignal("");
  const [toDelete, setToDelete] = createSignal<{ id: string; path: string; label: string } | null>(
    null,
  );
  const national = () => examType() === "pretest" || examType() === "model";

  const refresh = () => queryClient.invalidateQueries({ queryKey: ["papers"] });

  async function upload(event: SubmitEvent) {
    event.preventDefault();
    const pdf = file();
    const subject = picker.subject()?.id;
    if (!pdf || !subject) return;
    setBusy(true);
    setError("");
    try {
      await uploadPaper({
        grade: picker.grade(),
        subject,
        semester: national() ? null : semester(),
        examType: examType(),
        year: year(),
        file: pdf,
      });
      (event.target as HTMLFormElement).reset();
      setFile(null);
      await refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <GradeSubjectPicker state={picker} />
      <section aria-labelledby="upload">
        <h2 id="upload" class={s.eyebrow}>
          Add a {picker.subject()?.name} paper for Grade {picker.grade()}
        </h2>
        <form class={`${panel} ${s.form}`} onSubmit={upload}>
          <label class={field}>
            <span class={label}>Exam</span>
            <select
              class={s.select}
              value={examType()}
              onChange={(e) => setExamType(e.currentTarget.value as ExamType)}
            >
              <For each={EXAM_TYPES}>{(t) => <option value={t}>{EXAM_TYPE_LABEL[t]}</option>}</For>
            </select>
          </label>
          <Show when={!national()}>
            <label class={field}>
              <span class={label}>Semester</span>
              <select
                class={s.select}
                value={semester()}
                onChange={(e) => setSemester(Number(e.currentTarget.value) as 1 | 2)}
              >
                <option value="1">Semester 1</option>
                <option value="2">Semester 2</option>
              </select>
            </label>
          </Show>
          <label class={field}>
            <span class={label}>Year</span>
            <input
              class={input}
              type="number"
              min="2000"
              max="2100"
              value={year()}
              onInput={(e) => setYear(Number(e.currentTarget.value))}
            />
          </label>
          <label class={field}>
            <span class={label}>PDF</span>
            <input
              class={input}
              type="file"
              accept="application/pdf"
              required
              onChange={(e) => setFile(e.currentTarget.files?.[0] ?? null)}
            />
          </label>
          <button type="submit" class={button} disabled={busy() || !file()}>
            {busy() ? "Uploading…" : "Upload"}
          </button>
          <Show when={error()}>
            <p class={errorText} role="alert" style={{ "grid-column": "1 / -1" }}>
              {error()}
            </p>
          </Show>
        </form>
      </section>

      <Show when={papers.data} fallback={<ListSkeleton label="Loading papers" />}>
        <ul class={`${panel} ${s.list}`}>
          <For each={papers.data} fallback={<li class={s.row}>No papers yet.</li>}>
            {(p) => (
              <li class={s.row}>
                <div class={css({ flex: 1, minW: 0 })}>
                  <p class={css({ fontWeight: "600" })}>{paperLabel(p)}</p>
                  <p class={css({ fontSize: "12.5px", color: "ink.subtle" })}>
                    {formatBytes(p.size_bytes)} · {p.question_count} questions
                  </p>
                </div>
                <button
                  type="button"
                  class={`${quietButton} ${s.small}`}
                  onClick={() =>
                    setToDelete({ id: p.id, path: p.storage_path, label: paperLabel(p) })
                  }
                >
                  Delete
                </button>
              </li>
            )}
          </For>
        </ul>
      </Show>

      <ConfirmDialog
        open={toDelete() !== null}
        title={`Delete ${toDelete()?.label}?`}
        description="The PDF is removed for everyone. Its questions stay in the bank, unlinked from the paper."
        confirmLabel="Delete"
        onConfirm={async () => {
          const target = toDelete();
          setToDelete(null);
          if (target) await deletePaper(target.id, target.path).catch(() => {});
          await refresh();
        }}
        onCancel={() => setToDelete(null)}
      />
    </>
  );
}

export function QuestionsTab() {
  const picker = useGradeSubject();
  const queryClient = useQueryClient();
  const [flaggedOnly, setFlaggedOnly] = createSignal(true);
  const [adding, setAdding] = createSignal(false);
  const [draft, setDraft] = createSignal({
    body: "",
    options: ["", "", "", ""],
    correct: 0,
    explanation: "",
  });
  const [error, setError] = createSignal("");

  const questions = useQuery(() => ({
    queryKey: ["admin", "questions", picker.grade(), picker.subject()?.id, flaggedOnly()],
    queryFn: () => fetchAdminQuestions(picker.grade(), picker.subject()?.id ?? "", flaggedOnly()),
    enabled: picker.subject() !== undefined,
  }));
  const refresh = () =>
    Promise.all([
      queryClient.invalidateQueries({ queryKey: ["admin"] }),
      queryClient.invalidateQueries({ queryKey: ["papers"] }),
    ]);

  async function save(event: SubmitEvent) {
    event.preventDefault();
    const d = draft();
    const options = d.options.filter((o) => o.trim());
    if (!d.body.trim() || options.length < 2 || !d.options[d.correct]?.trim()) {
      setError("Write the question, at least two options, and mark a filled-in option as correct.");
      return;
    }
    setError("");
    try {
      await addQuestion({
        grade: picker.grade(),
        subject: picker.subject()?.id ?? "",
        body: d.body,
        options,
        correctIndex: options.indexOf(d.options[d.correct] ?? ""),
        explanation: d.explanation,
      });
      setDraft({ body: "", options: ["", "", "", ""], correct: 0, explanation: "" });
      setAdding(false);
      await refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Couldn't save.");
    }
  }

  return (
    <>
      <GradeSubjectPicker state={picker} />
      <div class={css({ display: "flex", gap: "10px", flexWrap: "wrap" })}>
        <button
          type="button"
          class={`${quietButton} ${s.small}`}
          aria-pressed={flaggedOnly()}
          onClick={() => setFlaggedOnly((v) => !v)}
        >
          {flaggedOnly() ? "Showing: needs review" : "Showing: all questions"}
        </button>
        <button type="button" class={`${button} ${s.small}`} onClick={() => setAdding((v) => !v)}>
          {adding() ? "Close" : "Add a question"}
        </button>
      </div>

      <Show when={adding()}>
        <form
          class={`${panel} ${css({ p: "16px", display: "flex", flexDirection: "column", gap: "12px" })}`}
          onSubmit={save}
        >
          <label class={field}>
            <span class={label}>Question</span>
            <textarea
              class={`${input} ${css({ minH: "80px", py: "10px" })}`}
              value={draft().body}
              onInput={(e) => setDraft({ ...draft(), body: e.currentTarget.value })}
            />
          </label>
          <fieldset
            class={css({
              border: 0,
              p: 0,
              m: 0,
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            })}
          >
            <legend class={label}>Options (choose the correct one)</legend>
            <For each={draft().options}>
              {(option, i) => (
                <div class={css({ display: "flex", gap: "8px", alignItems: "center" })}>
                  <input
                    type="radio"
                    name="correct"
                    checked={draft().correct === i()}
                    onChange={() => setDraft({ ...draft(), correct: i() })}
                    aria-label={`Option ${LETTERS[i()]} is correct`}
                  />
                  <input
                    class={`${input} ${css({ flex: 1 })}`}
                    placeholder={`Option ${LETTERS[i()]}`}
                    value={option}
                    onInput={(e) => {
                      const options = [...draft().options];
                      options[i()] = e.currentTarget.value;
                      setDraft({ ...draft(), options });
                    }}
                  />
                </div>
              )}
            </For>
          </fieldset>
          <label class={field}>
            <span class={label}>Explanation (shown after answering)</span>
            <textarea
              class={`${input} ${css({ minH: "60px", py: "10px" })}`}
              value={draft().explanation}
              onInput={(e) => setDraft({ ...draft(), explanation: e.currentTarget.value })}
            />
          </label>
          <Show when={error()}>
            <p class={errorText} role="alert">
              {error()}
            </p>
          </Show>
          <button type="submit" class={button}>
            Save question
          </button>
        </form>
      </Show>

      <Show when={questions.data} fallback={<ListSkeleton label="Loading questions" />}>
        <ul class={`${panel} ${s.list}`}>
          <For each={questions.data} fallback={<li class={s.row}>Nothing here.</li>}>
            {(q) => (
              <li
                class={css({
                  px: "16px",
                  py: "14px",
                  borderBottom: "1px solid {colors.line}",
                  _last: { borderBottom: 0 },
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                })}
              >
                <p class={css({ fontWeight: "600", whiteSpace: "pre-wrap" })}>{q.body}</p>
                <ol
                  class={css({
                    listStyle: "none",
                    display: "flex",
                    flexDirection: "column",
                    gap: "2px",
                    fontSize: "14px",
                  })}
                >
                  <For each={q.options}>
                    {(o, i) => (
                      <li
                        style={
                          i() === q.correct_index
                            ? { color: "var(--colors-brand-strong)", "font-weight": "600" }
                            : undefined
                        }
                      >
                        {LETTERS[i()]}. {o} {i() === q.correct_index ? "(correct)" : ""}
                      </li>
                    )}
                  </For>
                </ol>
                <Show when={q.explanation}>
                  <p class={css({ fontSize: "13.5px", color: "ink.muted" })}>{q.explanation}</p>
                </Show>
                <div class={css({ display: "flex", gap: "8px" })}>
                  <Show when={q.needs_review}>
                    <button
                      type="button"
                      class={`${button} ${s.small}`}
                      onClick={() => approveQuestion(q.id).then(refresh)}
                    >
                      Approve
                    </button>
                  </Show>
                  <button
                    type="button"
                    class={`${quietButton} ${s.small}`}
                    onClick={() => deleteQuestion(q.id).then(refresh)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            )}
          </For>
        </ul>
      </Show>
    </>
  );
}

export function StudentsTab() {
  const [search, setSearch] = createSignal("");
  const students = useQuery(() => ({
    queryKey: ["admin", "students", search()],
    queryFn: () => fetchStudents(search()),
  }));
  return (
    <>
      <label class={css({ maxW: "360px" })}>
        <span class={css({ srOnly: true })}>Search students</span>
        <input
          type="search"
          class={input}
          placeholder="Search by name or email"
          value={search()}
          onInput={(e) => setSearch(e.currentTarget.value)}
        />
      </label>
      <Show when={students.data} fallback={<ListSkeleton label="Loading students" />}>
        <div class={`${panel} ${css({ overflowX: "auto" })}`}>
          <table class={s.table}>
            <thead>
              <tr>
                <th scope="col">Student</th>
                <th scope="col">Grade</th>
                <th scope="col">Joined</th>
                <th scope="col" class={s.num}>
                  Answers
                </th>
                <th scope="col" class={s.num}>
                  Correct
                </th>
                <th scope="col">Last active</th>
              </tr>
            </thead>
            <tbody>
              <For
                each={students.data}
                fallback={
                  <tr>
                    <td colspan="6">No students found.</td>
                  </tr>
                }
              >
                {(st) => (
                  <tr>
                    <td>
                      <div class={css({ fontWeight: "600" })}>{st.display_name || "Student"}</div>
                      <div class={css({ fontSize: "12.5px", color: "ink.subtle" })}>{st.email}</div>
                    </td>
                    <td>{st.grade ?? "–"}</td>
                    <td>{dateTime(st.joined_at)}</td>
                    <td class={s.num}>{st.answered}</td>
                    <td class={s.num}>
                      {st.answered ? `${Math.round((st.correct / st.answered) * 100)}%` : "–"}
                    </td>
                    <td>{dateTime(st.last_active)}</td>
                  </tr>
                )}
              </For>
            </tbody>
          </table>
        </div>
      </Show>
    </>
  );
}
