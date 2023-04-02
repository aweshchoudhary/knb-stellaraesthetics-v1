import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const Card = ({ data }) => {
  return data ? (
    <Link
      to="/deals/dasdf"
      className={`cursor-pointer w-full bg-bg border mb-1 border-l-8 p-2  flex flex-col gap-2 ${
        data.color ? `border-[${data.color}]` : null
      }`}
    >
      <div className="top">
        <h4 className="font-medium">{data.title}</h4>
        <p className="text-sm">{data.organization}</p>
      </div>
      <div className="bottom flex items-center gap-3 text-sm">
        <button className="activity rounded-full border p-1 flex items-center justify-center hover:bg-gray-100">
          <Icon icon="icon-park-solid:caution" className="text-yellow-500" />
        </button>
        <div className="user">
          <Icon icon={"uil:user"} />
          <span className="capitalize hidden">{data.personName}</span>
        </div>
        <div className="amount flex items-center">
          <Icon icon={"material-symbols:currency-rupee"} />
          <span>{data.value.value}</span>
        </div>
      </div>
    </Link>
  ) : null;
};

export default Card;
