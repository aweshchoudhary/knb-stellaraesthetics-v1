import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { useEffect, useState } from "react";
import formatNumber from "../functions/formatNumber";

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
      to={"/deals/" + card._id}
      className={`cursor-pointer w-full bg-bg text-sm relative border mb-1 p-2 flex flex-col gap-2 ${
        card.color ? `border-[${card.color}]` : null
      }`}
    >
      <div className="top">
        <h4 className="font-medium">{card.clientDetails?.title}</h4>
        <p className="text-gray-500 text-xs">{card.clientDetails.company}</p>
        <button className="activity absolute top-2 right-2 rounded-full border p-1 flex items-center justify-center hover:bg-gray-100">
          <Icon icon="icon-park-solid:caution" className="text-yellow-500" />
        </button>
      </div>
      <div className="bottom flex items-center gap-3 text-sm">
        <div className="user" title={card.clientDetails.contactPerson}>
          <Icon icon={"uil:user"} />
        </div>
        <div className="amount flex items-center">
          {formatNumber(card?.value.value, {
            country: "en-IN",
            type: "INR",
          })}
        </div>
      </div>
    </Link>
  ) : null;
};

export default Card;
