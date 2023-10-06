import Button from "@/components/Button";
import { FaMagnifyingGlass } from "react-icons/fa6";
import SearchImg from "@/assets/imgs/search.png";
import Image from "next/image";
import { FormEventHandler } from "react";

type SearchBoxProps = {
  onSearch: FormEventHandler<HTMLFormElement>;
  defaultValue?: string;
};

export default function SearchBox({
  onSearch,
  defaultValue = "",
}: SearchBoxProps) {
  const handleSubmit = (event: any) => {
    event.preventDefault();
    onSearch(event.target.searchKey.value);
  };

  return (
    <form
      className="flex flex-row items-center bg-light-silver rounded-[20px] h-16 relative"
      onSubmit={handleSubmit}
    >
      <Image
        src={SearchImg}
        alt="search"
        className="absolute right-[13px] bottom-full translate-y-[3px] w-[121px] h-[88px] object-cover"
      />
      <label className="3xl:h-20 flex flex-row w-full">
        <span className="3xl:text-[21px] text-base text-spanish-gray 3xl:pl-12 pl-8 flex items-center">
          <FaMagnifyingGlass />
        </span>
        <input
          type="text"
          title="search-input"
          name="searchKey"
          defaultValue={defaultValue}
          className="border-0 3xl:px-8 px-6 bg-transparent focus:ring-0 focus:outline-none focus:border-0 w-full"
        />
      </label>
      <div className="3xl:mr-11 mr-8">
        <Button
          type="submit"
          customClassName="3xl:!w-[115px] !w-[calc(115px/6*5)] 3xl:!h-10 !h-8 !rounded-[10px] 3xl:!text-base !text-[calc(1rem/6*5)]"
        >
          Search
        </Button>
      </div>
    </form>
  );
}
