import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { useEffect, useState } from "react";

const Card = ({ id }) => {
  const [card, setCard] = useState({});
  const [response, error, loading, refetch] = useAxios({
    method: "GET",
    url: "/api/get-card",
    config: {
      params: {
        id,
      },
    },
  });
  useEffect(() => {
    if (response.data) {
      setCard(response.data);
    }
  }, [response]);
  return card && card.clientDetails ? (
    <Link
      to="/deals/dasdf"
      className={`cursor-pointer w-full bg-bg border mb-1 border-l-8 p-2  flex flex-col gap-2 ${
        card.color ? `border-[${card.color}]` : null
      }`}
    >
      <div className="top">
        <h4 className="font-medium">{card.clientDetails?.title}</h4>
        <p className="text-sm">{card.clientDetails.company}</p>
      </div>
      <div className="bottom flex items-center gap-3 text-sm">
        <button className="activity rounded-full border p-1 flex items-center justify-center hover:bg-gray-100">
          <Icon icon="icon-park-solid:caution" className="text-yellow-500" />
        </button>
        <div className="user">
          <Icon icon={"uil:user"} />
          <span className="capitalize hidden">
            {card.clientDetails.contactPerson}
          </span>
        </div>
        <div className="amount flex items-center">
          <Icon icon={"material-symbols:currency-rupee"} />
          <span>{card?.value?.value}</span>
        </div>
      </div>
    </Link>
  ) : null;
};

export default Card;
