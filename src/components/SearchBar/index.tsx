import Input from "../Input";

interface SearchBarProps {
  onSearch: (searchKey: string) => void;
}
const SearchBar = (props: SearchBarProps) => {
  return (
    <Input
      type="search"
      placeholder="Search User"
      onChange={(e) => props.onSearch(e?.target?.value)}
    />
  );
};

export default SearchBar;
