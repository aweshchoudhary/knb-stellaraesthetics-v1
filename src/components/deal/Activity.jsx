import { Icon } from "@iconify/react";
import { useState } from "react";

const Activity = ({ selectedInfo }) => {
  const [activityOptions, setActivityOptions] = useState([
    {
      id: 1,
      name: "Call",
      type: "call",
      icon: "uil:phone",
    },
    {
      id: 2,
      name: "Email",
      type: "email",
      icon: "uil:envelope",
    },
    {
      id: 3,
      name: "Meeting",
      type: "meeting",
      icon: "heroicons:users",
    },
    {
      id: 4,
      name: "Task",
      type: "task",
      icon: "material-symbols:timer-outline",
    },
  ]);
  const [activity, setActivity] = useState(activityOptions[0]);
  const [additionalFields, setAdditionalFields] = useState({
    description: false,
    location: false,
  });
  function setAdditionalFieldsFn(name) {
    setAdditionalFields((prev) => {
      return { ...prev, [name]: !prev[name] };
    });
  }
  return (
    <section>
      <div className="container p-5">
        <div className="my-2">
          <input
            type="text"
            name="activity-name"
            id="activity-name"
            placeholder={activity.name}
            className="input"
          />
        </div>
        <div className="my-2 activity-buttons border-collapse">
          {activityOptions.map((item, index) => {
            return (
              <button
                aria-label={item.name}
                title={item.name}
                className={`${
                  item.id === activity.id
                    ? "border-textColor"
                    : "hover:border-textColor"
                } p-3 border border-collapse`}
                onClick={() => setActivity(item)}
              >
                <Icon icon={item.icon} className="text-lg" />
              </button>
            );
          })}
        </div>
        <div className="my-5">
          <h2 className="mb-3">Date and Time</h2>
          <div className="flex">
            <div className="flex flex-1 gap-2 pr-2">
              <input
                type="date"
                className="input flex-1"
                name="start-date"
                id="start-time"
              />
              <input
                type="time"
                className="input flex-1"
                name="start-time"
                id="start-time"
              />
            </div>
            <div className="flex flex-1 gap-2 items-center">
              {" "}
              -{" "}
              <input
                type="date"
                className="input flex-1"
                name="end-date"
                id="end-time"
              />
              <input
                type="time"
                className="input flex-1"
                name="start-date"
                id="start-time"
              />
            </div>
          </div>
        </div>

        <section className="my-4">
          <h3 className="text-lg font-medium mb-3">Additional Fields</h3>
          <div className="additional-fields flex mb-4 items-center gap-2">
            <button
              className="btn-outlined"
              onClick={() => setAdditionalFieldsFn("location")}
              disabled={additionalFields.location}
            >
              <Icon icon={"material-symbols:location-on"} className="text-xl" />
              <p>location</p>
            </button>
            <button
              className="btn-outlined"
              disabled={additionalFields.description}
              onClick={() => setAdditionalFieldsFn("description")}
            >
              <Icon icon={"uil:bars"} className="text-xl" />
              <p>Description</p>
            </button>
          </div>
          {additionalFields.description && (
            <div className="description flex gap-2 items-start my-2">
              <button
                className="text-xl pt-3"
                onClick={() => setAdditionalFieldsFn("description")}
              >
                <Icon icon="uil:trash" />
              </button>
              <textarea
                name="description"
                id="description"
                className="input min-h-[100px] flex-1"
                placeholder="Description"
              ></textarea>
            </div>
          )}
          {additionalFields.location && (
            <div className="location flex gap-2 items-start my-2">
              <button
                className="text-xl pt-3"
                onClick={() => setAdditionalFieldsFn("location")}
              >
                <Icon icon="uil:trash" />
              </button>
              <input
                type="text"
                name="location"
                id="location"
                className="input"
                placeholder="Location"
              />
            </div>
          )}
        </section>
        <div className="task-performer">
          <h3 className="text-lg mb-3 font-medium">Activity Performer</h3>
          <div className="flex items-center gap-2">
            <Icon icon="uil:user" className="text-xl" />
            <select name="task-user" id="task-user" className="input flex-1">
              <option value="a4523df">Awesh Choudhary (You)</option>
              <option value="a4523df">John Doe</option>
              <option value="a4523df">John Jane</option>
            </select>
          </div>
        </div>
      </div>
      <footer className="flex items-center justify-end border-t mt-2s p-3 gap-2">
        <button className="btn-outlined">cancel</button>
        <button className="btn-filled">save</button>
      </footer>
    </section>
  );
};

export default Activity;
