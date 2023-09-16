type InputProps = {
  title: string;
  placeholder?: string;
  name: string;
  type?: string;
};

export default function Input({
  title = "",
  placeholder = "",
  name,
  type = "text",
}: InputProps) {
  return (
    <label title={title} className="flex flex-col gap-3">
      <div className="text-xl font-bold">{title}</div>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className="rounded-[20px] h-[57px] bg-light-silver border-0 px-4 focus:ring-deep-lilac focus:outline-none focus:border-0"
      />
    </label>
  );
}
