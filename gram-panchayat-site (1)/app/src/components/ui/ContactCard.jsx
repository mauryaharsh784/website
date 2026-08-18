const ContactCard = ({ icon: Icon, label, value }) => {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-forest/10 bg-surface p-5">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-forest/8 text-accent">
        <Icon size={19} strokeWidth={1.75} />
      </span>

      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wide text-ink/50">
          {label}
        </p>

        <p className="mt-1 break-words text-sm font-medium text-heading">
          {value}
        </p>
      </div>
    </div>
  );
};

export default ContactCard;