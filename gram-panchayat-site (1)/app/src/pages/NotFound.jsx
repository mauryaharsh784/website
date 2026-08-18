import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import { Compass } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function NotFound() {
  const { t } = useLanguage();
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <Compass size={44} className="text-saffron" />
      <h1 className="font-display mt-5 text-4xl font-semibold text-heading">{t("notFound.title")}</h1>
      <p className="mt-3 max-w-md text-ink/60">{t("notFound.description")}</p>
      <Button as={Link} to="/" variant="primary" arrow className="mt-8">
        {t("notFound.backHome")}
      </Button>
    </div>
  );
}
