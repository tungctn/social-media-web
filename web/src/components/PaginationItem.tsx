type PaginationItemProps = {
  number: number;
  active?: boolean;
  onClick: Function;
};

export default function PaginationItem({
  number,
  active = false,
  onClick = () => {},
}: PaginationItemProps) {
  return (
    <button
      title="pagination-item"
      className={
        "w-6 h-6 rounded-full text-[14px] font-bold transition hover:opacity-80 " +
        (active ? "bg-white text-deep-lilac" : "bg-cultured text-spanish-gray")
      }
      onClick={() => onClick(number)}
    >
      {number}
    </button>
  );
}
