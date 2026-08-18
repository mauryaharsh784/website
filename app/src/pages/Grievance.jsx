import { useState } from "react";
import PageHeader from "../components/ui/PageHeader";
import Modal from "../components/ui/Modal";
import Button from "../components/ui/Button";
import { UploadCloud, CheckCircle2 } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const API_URL = "https://website-69iz.onrender.com";

const categoryKeys = [
  "Water Supply",
  "Roads & Infrastructure",
  "Sanitation",
  "Electricity",
  "Public Health",
  "Other",
];

const categoryLabelsHi = {
  "Water Supply": "जल आपूर्ति",
  "Roads & Infrastructure": "सड़क एवं बुनियादी ढाँचा",
  Sanitation: "स्वच्छता",
  Electricity: "बिजली",
  "Public Health": "सार्वजनिक स्वास्थ्य",
  Other: "अन्य",
};

const initialForm = {
  fullName: "",
  mobile: "",
  email: "",
  address: "",
  category: "",
  description: "",
};

function validate(form, t) {
  const errors = {};

  if (!form.fullName.trim()) {
    errors.fullName = t("grievanceForm.errors.fullName");
  }

  if (!/^[6-9]\d{9}$/.test(form.mobile.trim())) {
    errors.mobile = t("grievanceForm.errors.mobile");
  }

  if (
    form.email &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
  ) {
    errors.email = t("grievanceForm.errors.email");
  }

  if (!form.address.trim()) {
    errors.address = t("grievanceForm.errors.address");
  }

  if (!form.category) {
    errors.category = t("grievanceForm.errors.category");
  }

  if (form.description.trim().length < 20) {
    errors.description = t("grievanceForm.errors.description");
  }

  return errors;
}

export default function Grievance() {
  const { t, lang } = useLanguage();

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [fileName, setFileName] = useState("");

  const [refNumber, setRefNumber] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  function handleChange(field, value) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }

    if (serverError) {
      setServerError("");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const newErrors = validate(form, t);

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      setSubmitting(true);
      setServerError("");

      const response = await fetch(
        `${API_URL}/api/grievances`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: form.fullName.trim(),
            mobile: form.mobile.trim(),
            email: form.email.trim(),
            address: form.address.trim(),
            category: form.category,
            description: form.description.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to submit grievance"
        );
      }

      setRefNumber(
        data.grievance?.referenceNumber ||
          `GP-2026-${String(
            Math.floor(10000 + Math.random() * 89999)
          ).slice(0, 5)}`
      );

      setShowSuccess(true);

      setForm(initialForm);
      setFileName("");
      setErrors({});
    } catch (error) {
      console.error("Grievance submit error:", error);

      setServerError(
        error.message ||
          "Unable to connect to server. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <PageHeader
        title={t("pageHeaders.grievance.title")}
        breadcrumb={t("nav.grievance")}
        description={t("pageHeaders.grievance.description")}
        image="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1400&q=80"
      />

      <section className="mx-auto max-w-3xl px-6 py-20 sm:px-10">
        <div className="rounded-3xl border border-forest/10 bg-surface p-7 shadow-[0_24px_50px_-30px_rgba(15,61,46,0.3)] dark:border-line sm:p-10">
          <p className="text-sm text-ink/60">
            {t("grievanceForm.note")}
          </p>

          {serverError && (
            <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {serverError}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            noValidate
            className="mt-8 space-y-5"
          >
            {/* Full Name */}
            <Field
              label={t("grievanceForm.fullName")}
              error={errors.fullName}
            >
              <input
                type="text"
                value={form.fullName}
                onChange={(e) =>
                  handleChange(
                    "fullName",
                    e.target.value
                  )
                }
                className={inputClass(errors.fullName)}
                placeholder={t(
                  "grievanceForm.placeholders.fullName"
                )}
              />
            </Field>

            {/* Mobile + Email */}
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label={t("grievanceForm.mobile")}
                error={errors.mobile}
              >
                <input
                  type="tel"
                  value={form.mobile}
                  onChange={(e) =>
                    handleChange(
                      "mobile",
                      e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 10)
                    )
                  }
                  className={inputClass(errors.mobile)}
                  placeholder={t(
                    "grievanceForm.placeholders.mobile"
                  )}
                />
              </Field>

              <Field
                label={t("grievanceForm.email")}
                error={errors.email}
              >
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    handleChange(
                      "email",
                      e.target.value
                    )
                  }
                  className={inputClass(errors.email)}
                  placeholder={t(
                    "grievanceForm.placeholders.email"
                  )}
                />
              </Field>
            </div>

            {/* Address */}
            <Field
              label={t("grievanceForm.address")}
              error={errors.address}
            >
              <input
                type="text"
                value={form.address}
                onChange={(e) =>
                  handleChange(
                    "address",
                    e.target.value
                  )
                }
                className={inputClass(errors.address)}
                placeholder={t(
                  "grievanceForm.placeholders.address"
                )}
              />
            </Field>

            {/* Category */}
            <Field
              label={t("grievanceForm.category")}
              error={errors.category}
            >
              <select
                value={form.category}
                onChange={(e) =>
                  handleChange(
                    "category",
                    e.target.value
                  )
                }
                className={inputClass(errors.category)}
              >
                <option value="">
                  {t("grievanceForm.selectCategory")}
                </option>

                {categoryKeys.map((category) => (
                  <option
                    key={category}
                    value={category}
                  >
                    {lang === "hi"
                      ? categoryLabelsHi[category]
                      : category}
                  </option>
                ))}
              </select>
            </Field>

            {/* Description */}
            <Field
              label={t("grievanceForm.description")}
              error={errors.description}
            >
              <textarea
                value={form.description}
                onChange={(e) =>
                  handleChange(
                    "description",
                    e.target.value
                  )
                }
                rows={5}
                className={inputClass(errors.description)}
                placeholder={t(
                  "grievanceForm.placeholders.description"
                )}
              />
            </Field>

            {/* File */}
            <div>
              <label className="mb-2 block text-sm font-medium text-heading">
                {t("grievanceForm.upload")}
              </label>

              <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-dashed border-forest/25 bg-panel px-5 py-4 text-sm text-ink/60 transition-colors hover:border-emerald">
                <UploadCloud
                  size={20}
                  className="text-emerald"
                />

                {fileName ||
                  t("grievanceForm.uploadCta")}

                <input
                  type="file"
                  className="hidden"
                  onChange={(e) =>
                    setFileName(
                      e.target.files?.[0]?.name || ""
                    )
                  }
                />
              </label>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              variant="primary"
              disabled={submitting}
              className="w-full justify-center"
            >
              {submitting
                ? "Submitting..."
                : t("grievanceForm.submit")}
            </Button>
          </form>
        </div>
      </section>

      {/* Success Modal */}
      <Modal
        open={showSuccess}
        onClose={() => setShowSuccess(false)}
        title={t("grievanceForm.successTitle")}
      >
        <div className="text-center">
          <CheckCircle2
            size={48}
            className="mx-auto text-emerald"
          />

          <p className="mt-4 text-sm leading-relaxed text-ink/70">
            {t("grievanceForm.successText")}
          </p>

          <div className="mt-5 rounded-2xl bg-panel p-4">
            <div className="font-mono text-xs uppercase tracking-wide text-ink/50">
              {t("grievanceForm.refLabel")}
            </div>

            <div className="mt-1 font-mono text-lg font-semibold text-accent">
              {refNumber}
            </div>
          </div>

          <Button
            variant="secondary"
            className="mt-6 w-full justify-center"
            onClick={() => setShowSuccess(false)}
          >
            {t("grievanceForm.done")}
          </Button>
        </div>
      </Modal>
    </div>
  );
}

function Field({ label, error, children }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-heading">
        {label}
      </label>

      {children}

      {error && (
        <p className="mt-1.5 text-xs text-red-600">
          {error}
        </p>
      )}
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