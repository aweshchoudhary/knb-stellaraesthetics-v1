import { useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import moment from "moment";
const FocusActivities = () => {
  const { data, loading, error, success } = useSelector((state) => state.deals);
  return data.activities.length ? (
    <div className="my-4">
      <header className="mb-3">
        <h2 className="text-lg font-medium">Focus Activity</h2>
      </header>
      <div className="body">
        <Activites />
      </div>
    </div>
  ) : null;
};

const Activites = ({ name }) => {
  const { data, loading, error, success } = useSelector((state) => state.deals);

  return data && !loading ? (
    <div>
      <ul>
        {data.activities.map((activity, index) => {
          return (
            <li key={index}>
              <ActivityCard data={activity} cardId={data._id} />
            </li>
          );
        })}
      </ul>
    </div>
  ) : null;
};

const ActivityCard = ({ data }) => {
  const deal = useSelector((state) => state.deals);
  return (
    <div className="flex">
      <div className="w-[60px] flex flex-col items-center">
        <span className="w-[40px] h-[40px] rounded-full bg-bg flex items-center justify-center">
          <Icon icon={"material-symbols:sticky-note-2-outline"} />
        </span>
        <div className="line border-l-2 flex-1"></div>
      </div>
      <div className="bg-bg mb-2 p-3 text-sm flex-1">
        <header className="flex items-center justify-between text-gray-600">
          <div className="flex gap-2 items-center">
            <button className="p-2 rounded-full border-2 hover:border-textColor"></button>
            <span className="capitalize text-lg text-textColor">
              {data.title}
            </span>
            <span>Awesh Choudhary</span>
            {data.location && (
              <span className="flex items-center gap-1">
                <Icon icon="material-symbols:location-on" />
                {data.location}
              </span>
            )}
          </div>
          <div className="flex gap-1">
            <button className="btn-outlined btn-small">
              <Icon icon={"uil:pen"} />
            </button>
            <button className="btn-outlined btn-small">
              <Icon icon={"uil:trash"} />
            </button>
          </div>
        </header>
        <div className="mt-2">
          {data.description && <div className="mb-2">{data.description}</div>}
          <div className="flex gap-3 text-sm text-gray-600">
            <span>{moment(data.endDate).fromNow()}</span>
            <span className="flex items-center gap-1">
              <Icon icon="uil:user" />
              {deal.data.clientDetails.contactPerson}
            </span>
            <span className="flex items-center gap-1">
              <Icon icon="uil:building" />
              {deal.data.clientDetails.company}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FocusActivities;
