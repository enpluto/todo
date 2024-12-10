interface TodoFilterProps {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

const TodoFilter = ({ activeTab, setActiveTab }: TodoFilterProps) => {
  const tabs = ["全部", "待完成", "已完成"];
  const handleFilter = (tab: string) => setActiveTab(tab);

  return (
    <ul className="flex justify-evenly font-bold">
      {tabs.map((tab) => {
        return (
          <li
            className={`text-center w-full py-4 cursor-pointer border-b-2
              ${activeTab === tab ? "text-black border-black" : "text-darkGray border-lightGray"}`}
            onClick={() => handleFilter(tab)}
            key={tab}
          >
            {tab}
          </li>
        );
      })}
    </ul>
  );
};

export default TodoFilter;
