import emptyImage from "../../../assets/empty.svg";

const EmptyList = () => {
  return (
    <div className="flex flex-col items-center gap-y-4 mt-11">
      <span className="">目前尚無待辦事項</span>
      <img src={emptyImage} alt="no contents" />
    </div>
  );
};

export default EmptyList;
