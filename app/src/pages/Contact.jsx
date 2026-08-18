import { useState } from "react";
import PageHeader from "../components/ui/PageHeader";
import ContactCard from "../components/ui/ContactCard";
import Button from "../components/ui/Button";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Rss,
  MessageCircle,
  Send,
  CheckCircle2,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const API_URL = "https://website-69iz.onrender.com";

export default function Contact() {
  const { t } = useLanguage();

  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // ================================
  // SUBMIT CONTACT FORM
  // ================================

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.message.trim()
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/api/grievances`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: form.name.trim(),
            mobile: "Not provided",
            email: form.email.trim(),
            address: "Not provided",
            category: "Other",
            description: (
              form.subject.trim()
                ? `Subject: ${form.subject.trim()}\n\n`
                : ""
            ) + form.message.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.message || "Something went wrong."
        );
        return;
      }

      setSent(true);

      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Submit error:", error);
      alert("Unable to connect to server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>

      {/* ================================
          PAGE HEADER
      ================================ */}

      <PageHeader
        title={t("pageHeaders.contact.title")}
        breadcrumb={t("nav.contact")}
        description={t("pageHeaders.contact.description")}
        image=""
      />

      {/* ================================
          CONTACT SECTION
      ================================ */}

      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-10">

        {/* ================================
            CONTACT CARDS
        ================================ */}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          <ContactCard
            icon={MapPin}
            label={t("mapSection.addressLabel")}
            value="Panchayat Bhavan, Gondwa, Gonda, Uttar Pradesh 271001"
          />

          <ContactCard
            icon={Phone}
            label={t("mapSection.phoneLabel")}
            value="+91 8299307415"
          />

          <ContactCard
            icon={Mail}
            label={t("mapSection.emailLabel")}
            value="office@gpgondwa.gov.in"
          />

          <ContactCard
            icon={Clock}
            label={t("mapSection.hoursLabel")}
            value={t("topbar.hours")}
          />

        </div>

        {/* ================================
            FORM + MAP
        ================================ */}

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">

          {/* ================================
              CONTACT FORM
          ================================ */}

          <div className="rounded-3xl border border-forest/10 bg-surface p-7 dark:border-line sm:p-9">

            <h3 className="font-display text-xl font-semibold text-heading">
              {t("contactForm.title")}
            </h3>

            {sent ? (

              /* ================================
                  SUCCESS MESSAGE
              ================================ */

              <div className="mt-8 flex flex-col items-center rounded-2xl bg-emerald/5 py-10 text-center">

                <CheckCircle2
                  size={40}
                  className="text-emerald"
                />

                <p className="mt-3 text-sm text-ink/70">
                  {t("contactForm.sentText")}
                </p>

                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="mt-4 text-sm font-semibold text-emerald"
                >
                  {t("contactForm.sendAnother")}
                </button>

              </div>

            ) : (

              /* ================================
                  CONTACT FORM
              ================================ */

              <form
                onSubmit={handleSubmit}
                className="mt-6 space-y-5"
              >

                {/* Name + Email */}

                <div className="grid gap-5 sm:grid-cols-2">

                  <input
                    required
                    type="text"
                    placeholder={t("contactForm.name")}
                    value={form.name}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        name: e.target.value,
                      })
                    }
                    className="rounded-xl border border-forest/15 bg-panel px-4 py-3 text-sm focus:border-emerald focus:outline-none focus:ring-2 focus:ring-emerald/20 dark:border-line"
                  />

                  <input
                    required
                    type="email"
                    placeholder={t("contactForm.email")}
                    value={form.email}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        email: e.target.value,
                      })
                    }
                    className="rounded-xl border border-forest/15 bg-panel px-4 py-3 text-sm focus:border-emerald focus:outline-none focus:ring-2 focus:ring-emerald/20 dark:border-line"
                  />

                </div>

                {/* Subject */}

                <input
                  type="text"
                  placeholder={t("contactForm.subject")}
                  value={form.subject}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      subject: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-forest/15 bg-panel px-4 py-3 text-sm focus:border-emerald focus:outline-none focus:ring-2 focus:ring-emerald/20 dark:border-line"
                />

                {/* Message */}

                <textarea
                  required
                  rows={5}
                  placeholder={t("contactForm.message")}
                  value={form.message}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      message: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-forest/15 bg-panel px-4 py-3 text-sm focus:border-emerald focus:outline-none focus:ring-2 focus:ring-emerald/20 dark:border-line"
                />

                {/* Submit Button */}

                <Button
                  type="submit"
                  variant="primary"
                  disabled={loading}
                  className="w-full justify-center"
                >
                  {loading
                    ? "Sending..."
                    : t("contactForm.send")}
                </Button>

              </form>
            )}

          </div>

          {/* ================================
              RIGHT SIDE
          ================================ */}

          <div className="space-y-6">

            {/* ================================
                GOOGLE MAP
            ================================ */}

            <div className="h-64 overflow-hidden rounded-3xl border border-forest/10 dark:border-line">

              <iframe
                title="Gondwa Location"
                src="https://www.google.com/maps?q=27.0804653,81.9596692&z=17&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />

            </div>

            {/* ================================
                FOLLOW US
            ================================ */}

            <div className="rounded-3xl border border-forest/10 bg-forest p-7 text-cream dark:border-line">

              <h4 className="font-display text-lg font-semibold">
                {t("contactForm.followUs")}
              </h4>

              <p className="mt-1 text-sm text-cream/70">
                {t("contactForm.followUsText")}
              </p>

              <div className="mt-4 flex gap-3">

                {[Rss, MessageCircle, Send].map(
                  (Icon, i) => (
                    <a
                      key={i}
                      href="#"
                      onClick={(e) =>
                        e.preventDefault()
                      }
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-saffron"
                    >
                      <Icon size={16} />
                    </a>
                  )
                )}

              </div>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}