import { useState } from "react";
import PageHeader from "../components/ui/PageHeader";
import Modal from "../components/ui/Modal";
import Button from "../components/ui/Button";
import { CheckCircle2, Plus, Trash2, Search, Users } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const API_URL = "https://website-69iz.onrender.com";

const emptyMember = () => ({
  name: "",
  relation: "",
  age: "",
  gender: "",
  occupation: "",
});

const initialForm = {
  headName: "",
  fatherOrHusbandName: "",
  wardNo: "",
  address: "",
  mobile: "",
  email: "",
  rationCardNo: "",
  members: [emptyMember()],
};

function validate(form, t) {
  const errors = {};

  if (!form.headName.trim()) errors.headName = t("familyForm.errors.headName");
  if (!form.wardNo.trim()) errors.wardNo = t("familyForm.errors.wardNo");
  if (!form.address.trim()) errors.address = t("familyForm.errors.address");

  if (!/^[6-9]\d{9}$/.test(form.mobile.trim())) {
    errors.mobile = t("familyForm.errors.mobile");
  }

  if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = t("familyForm.errors.email");
  }

  const validMembers = form.members.filter(
    (m) => m.name.trim() && m.relation.trim() && m.gender && m.age !== ""
  );

  if (validMembers.length === 0) {
    errors.members = t("familyForm.errors.members");
  }

  return errors;
}

export default function Family() {
  const { t, lang } = useLanguage();

  const [tab, setTab] = useState("register");

  return (
    <div>
      <PageHeader
        title={t("pageHeaders.family.title")}
        breadcrumb={t("nav.family")}
        description={t("pageHeaders.family.description")}
        image="https://images.unsplash.com/photo-1611095973763-414019e72400?auto=format&fit=crop&w=1400&q=80"
      />

      <section className="mx-auto max-w-3xl px-6 py-16 sm:px-10">
        <div className="mb-8 flex justify-center gap-2 rounded-full border border-forest/10 bg-panel p-1.5 dark:border-line">
          <button
            onClick={() => setTab("register")}
            className={`flex-1 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
              tab === "register"
                ? "bg-forest text-cream"
                : "text-ink/60 hover:text-accent"
            }`}
          >
            {t("familyForm.registerTab")}
          </button>
          <button
            onClick={() => setTab("search")}
            className={`flex-1 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
              tab === "search"
                ? "bg-forest text-cream"
                : "text-ink/60 hover:text-accent"
            }`}
          >
            {t("familyForm.searchTab")}
          </button>
        </div>

        {tab === "register" ? <RegisterFamily t={t} lang={lang} /> : <FindFamily t={t} lang={lang} />}
      </section>
    </div>
  );
}

function RegisterFamily({ t, lang }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const [familyId, setFamilyId] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    if (serverError) setServerError("");
  }

  function handleMemberChange(index, field, value) {
    setForm((prev) => {
      const members = [...prev.members];
      members[index] = { ...members[index], [field]: value };
      return { ...prev, members };
    });
    if (errors.members) setErrors((prev) => ({ ...prev, members: undefined }));
  }

  function addMember() {
    setForm((prev) => ({ ...prev, members: [...prev.members, emptyMember()] }));
  }

  function removeMember(index) {
    setForm((prev) => ({
      ...prev,
      members: prev.members.filter((_, i) => i !== index),
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const newErrors = validate(form, t);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    const cleanMembers = form.members
      .filter((m) => m.name.trim() && m.relation.trim() && m.gender && m.age !== "")
      .map((m) => ({
        name: m.name.trim(),
        relation: m.relation.trim(),
        age: Number(m.age),
        gender: m.gender,
        occupation: m.occupation.trim(),
      }));

    try {
      setSubmitting(true);
      setServerError("");

      const response = await fetch(`${API_URL}/api/families`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          headName: form.headName.trim(),
          fatherOrHusbandName: form.fatherOrHusbandName.trim(),
          wardNo: form.wardNo.trim(),
          address: form.address.trim(),
          mobile: form.mobile.trim(),
          email: form.email.trim(),
          rationCardNo: form.rationCardNo.trim(),
          members: cleanMembers,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to register family");
      }

      setFamilyId(data.family?.familyId || "");
      setShowSuccess(true);
      setForm(initialForm);
      setErrors({});
    } catch (error) {
      console.error("Family register error:", error);
      setServerError(
        error.message || "Unable to connect to server. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <div className="rounded-3xl border border-forest/10 bg-surface p-7 shadow-[0_24px_50px_-30px_rgba(15,61,46,0.3)] dark:border-line sm:p-10">
        <p className="text-sm text-ink/60">{t("familyForm.note")}</p>

        {serverError && (
          <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
          <Field label={t("familyForm.headName")} error={errors.headName}>
            <input
              type="text"
              value={form.headName}
              onChange={(e) => handleChange("headName", e.target.value)}
              className={inputClass(errors.headName)}
              placeholder={t("familyForm.placeholders.headName")}
            />
          </Field>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label={t("familyForm.fatherOrHusbandName")}>
              <input
                type="text"
                value={form.fatherOrHusbandName}
                onChange={(e) => handleChange("fatherOrHusbandName", e.target.value)}
                className={inputClass()}
                placeholder={t("familyForm.placeholders.fatherOrHusbandName")}
              />
            </Field>

            <Field label={t("familyForm.wardNo")} error={errors.wardNo}>
              <input
                type="text"
                value={form.wardNo}
                onChange={(e) => handleChange("wardNo", e.target.value)}
                className={inputClass(errors.wardNo)}
                placeholder={t("familyForm.placeholders.wardNo")}
              />
            </Field>
          </div>

          <Field label={t("familyForm.address")} error={errors.address}>
            <input
              type="text"
              value={form.address}
              onChange={(e) => handleChange("address", e.target.value)}
              className={inputClass(errors.address)}
              placeholder={t("familyForm.placeholders.address")}
            />
          </Field>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label={t("familyForm.mobile")} error={errors.mobile}>
              <input
                type="tel"
                value={form.mobile}
                onChange={(e) =>
                  handleChange("mobile", e.target.value.replace(/\D/g, "").slice(0, 10))
                }
                className={inputClass(errors.mobile)}
                placeholder={t("familyForm.placeholders.mobile")}
              />
            </Field>

            <Field label={t("familyForm.email")} error={errors.email}>
              <input
                type="email"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className={inputClass(errors.email)}
                placeholder={t("familyForm.placeholders.email")}
              />
            </Field>
          </div>

          <Field label={t("familyForm.rationCardNo")}>
            <input
              type="text"
              value={form.rationCardNo}
              onChange={(e) => handleChange("rationCardNo", e.target.value)}
              className={inputClass()}
              placeholder={t("familyForm.placeholders.rationCardNo")}
            />
          </Field>

          {/* Members */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <label className="block text-sm font-medium text-heading">
                {t("familyForm.membersTitle")}
              </label>
              <button
                type="button"
                onClick={addMember}
                className="inline-flex items-center gap-1.5 rounded-full bg-emerald/10 px-3.5 py-1.5 text-xs font-semibold text-emerald hover:bg-emerald/20"
              >
                <Plus size={14} /> {t("familyForm.addMember")}
              </button>
            </div>

            {errors.members && (
              <p className="mb-3 text-xs text-red-600">{errors.members}</p>
            )}

            <div className="space-y-4">
              {form.members.map((member, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-forest/15 bg-panel p-4 dark:border-line"
                >
                  <div className="grid gap-3 sm:grid-cols-2">
                    <input
                      type="text"
                      value={member.name}
                      onChange={(e) => handleMemberChange(index, "name", e.target.value)}
                      className={inputClass()}
                      placeholder={t("familyForm.placeholders.memberName")}
                    />
                    <input
                      type="text"
                      value={member.relation}
                      onChange={(e) => handleMemberChange(index, "relation", e.target.value)}
                      className={inputClass()}
                      placeholder={t("familyForm.placeholders.memberRelation")}
                    />
                    <input
                      type="number"
                      min="0"
                      max="120"
                      value={member.age}
                      onChange={(e) => handleMemberChange(index, "age", e.target.value)}
                      className={inputClass()}
                      placeholder={t("familyForm.placeholders.memberAge")}
                    />
                    <select
                      value={member.gender}
                      onChange={(e) => handleMemberChange(index, "gender", e.target.value)}
                      className={inputClass()}
                    >
                      <option value="">{t("familyForm.selectGender")}</option>
                      <option value="Male">{t("familyForm.genders.Male")}</option>
                      <option value="Female">{t("familyForm.genders.Female")}</option>
                      <option value="Other">{t("familyForm.genders.Other")}</option>
                    </select>
                    <input
                      type="text"
                      value={member.occupation}
                      onChange={(e) => handleMemberChange(index, "occupation", e.target.value)}
                      className={`${inputClass()} sm:col-span-2`}
                      placeholder={t("familyForm.placeholders.memberOccupation")}
                    />
                  </div>

                  {form.members.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeMember(index)}
                      className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-red-500 hover:text-red-600"
                    >
                      <Trash2 size={13} /> {t("familyForm.removeMember")}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            disabled={submitting}
            className="w-full justify-center"
          >
            {submitting ? "..." : t("familyForm.submit")}
          </Button>
        </form>
      </div>

      <Modal
        open={showSuccess}
        onClose={() => setShowSuccess(false)}
        title={t("familyForm.successTitle")}
      >
        <div className="text-center">
          <CheckCircle2 size={48} className="mx-auto text-emerald" />

          <p className="mt-4 text-sm leading-relaxed text-ink/70">
            {t("familyForm.successText")}
          </p>

          <div className="mt-5 rounded-2xl bg-panel p-4">
            <div className="font-mono text-xs uppercase tracking-wide text-ink/50">
              {t("familyForm.familyIdLabel")}
            </div>
            <div className="mt-1 font-mono text-lg font-semibold text-accent">
              {familyId}
            </div>
          </div>

          <Button
            variant="secondary"
            className="mt-6 w-full justify-center"
            onClick={() => setShowSuccess(false)}
          >
            {t("familyForm.done")}
          </Button>
        </div>
      </Modal>
    </>
  );
}

function FindFamily({ t, lang }) {
  const [mobile, setMobile] = useState("");
  const [familyId, setFamilyId] = useState("");
  const [error, setError] = useState("");
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState(null);

  async function handleSearch(e) {
    e.preventDefault();
    setError("");
    setResults(null);

    if (!/^[6-9]\d{9}$/.test(mobile.trim())) {
      setError(t("familyForm.errors.searchMobile"));
      return;
    }

    try {
      setSearching(true);

      const params = new URLSearchParams({ mobile: mobile.trim() });
      if (familyId.trim()) params.set("familyId", familyId.trim());

      const response = await fetch(`${API_URL}/api/families/search?${params.toString()}`);
      const data = await response.json();

      if (!response.ok) {
        setResults([]);
        setError(data.message || t("familyForm.noResults"));
        return;
      }

      setResults(data.families || []);
    } catch (err) {
      console.error("Family search error:", err);
      setError("Unable to connect to server. Please try again.");
    } finally {
      setSearching(false);
    }
  }

  return (
    <div className="rounded-3xl border border-forest/10 bg-surface p-7 shadow-[0_24px_50px_-30px_rgba(15,61,46,0.3)] dark:border-line sm:p-10">
      <p className="text-sm text-ink/60">{t("familyForm.searchNote")}</p>

      <form onSubmit={handleSearch} noValidate className="mt-6 space-y-5">
        <Field label={t("familyForm.mobile")} error={error}>
          <input
            type="tel"
            value={mobile}
            onChange={(e) => {
              setMobile(e.target.value.replace(/\D/g, "").slice(0, 10));
              setError("");
            }}
            className={inputClass(error)}
            placeholder={t("familyForm.searchMobilePlaceholder")}
          />
        </Field>

        <Field label={`${t("familyForm.familyIdLabel")}`}>
          <input
            type="text"
            value={familyId}
            onChange={(e) => setFamilyId(e.target.value)}
            className={inputClass()}
            placeholder={t("familyForm.searchFamilyIdPlaceholder")}
          />
        </Field>

        <Button
          type="submit"
          variant="primary"
          disabled={searching}
          className="w-full justify-center"
        >
          <Search size={16} />
          {searching ? t("familyForm.searching") : t("familyForm.searchButton")}
        </Button>
      </form>

      {results && results.length === 0 && !error && (
        <p className="mt-6 text-center text-sm text-ink/60">{t("familyForm.noResults")}</p>
      )}

      {results && results.length > 0 && (
        <div className="mt-8 space-y-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink/50">
            {t("familyForm.resultsFor")} ({results.length})
          </p>

          {results.map((family) => (
            <div
              key={family._id}
              className="rounded-2xl border border-forest/15 bg-panel p-5 dark:border-line"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="font-mono text-sm font-semibold text-accent">
                  {family.familyId}
                </div>
                <span className="rounded-full bg-emerald/10 px-3 py-1 text-xs font-semibold text-emerald">
                  {t("familyForm.status")}: {family.status}
                </span>
              </div>

              <div className="mt-3 grid gap-1 text-sm text-ink/80">
                <div>
                  <span className="font-semibold text-heading">{t("familyForm.headName")}: </span>
                  {family.headName}
                </div>
                <div>
                  <span className="font-semibold text-heading">{t("familyForm.wardNo")}: </span>
                  {family.wardNo}
                </div>
                <div>
                  <span className="font-semibold text-heading">{t("familyForm.address")}: </span>
                  {family.address}
                </div>
              </div>

              <div className="mt-4">
                <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-ink/50">
                  <Users size={13} /> {t("familyForm.membersTitle")} ({family.members?.length || 0})
                </div>
                <ul className="space-y-1 text-sm text-ink/70">
                  {family.members?.map((m, i) => (
                    <li key={i}>
                      {m.name} — {m.relation}, {m.age} {m.gender ? `(${m.gender})` : ""}
                      {m.occupation ? `, ${m.occupation}` : ""}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Field({ label, error, children }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-heading">{label}</label>
      {children}
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  );
}

function inputClass(error) {
  return `w-full rounded-xl border bg-panel px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:ring-2 ${
    error
      ? "border-red-400 focus:ring-red-200"
      : "border-forest/15 dark:border-line focus:border-emerald focus:ring-emerald/20"
  }`;
}
