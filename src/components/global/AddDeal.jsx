import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createDeal } from "../../state/features/dealSlice";

const AddDeal = ({ setIsOpen }) => {
  const stages = useSelector((state) => state.stages);
  const { loading } = useSelector((state) => state.deals);
  const dispatch = useDispatch();

  const [dealData, setDealData] = useState({
    clientDetials: {
      company: null,
      title: null,
      contactPerson: null,
      phone: { number: null, prefix: "91", type: "work" },
      email: { email: null, type: "work" },
    },
    value: { value: null, type: "inr" },
    stage: null,
    color: null,
    expectedClosingDate: null,
  });
  const colors = useRef([
    "red-500",
    "yellow-500",
    "green-500",
    "purple-500",
    "primary",
  ]);
  function addNewDeal() {
    dispatch(createDeal(dealData));
    setDealData({
      clientDetials: {
        company: null,
        title: null,
        contactPerson: null,
        phone: { number: null, prefix: "91", type: "work" },
        email: { email: null, type: "work" },
      },
      value: { value: null, type: "inr" },
      stage: null,
      color: null,
      expectedClosingDate: null,
    });
    setIsOpen(false);
  }
  function fillClientDetails(name, value) {
    setDealData((prev) => {
      return {
        ...prev,
        clientDetials: {
          ...prev.clientDetials,
          [name]: value,
        },
      };
    });
  }
  function fillDealDetails(name, value) {
    setDealData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  return (
    <>
      {error ? toast.error("Something went wrong!") : null}
      <div className="overflow-y-auto h-[calc(100%-110px)]">
        <form className="container sm:flex">
          <div className="sm:w-1/2 shrink-0 border-r h-full p-3">
            <div className="input-fname mb-3">
              <label
                htmlFor="personName"
                className="text-textColor block  mb-2"
              >
                Contact Person
              </label>
              <input
                type="text"
                name="contactPerson"
                id="contactPerson"
                placeholder="Full Name"
                className="input"
                onChange={(e) =>
                  fillClientDetails(e.target.name, e.target.value)
                }
              />
            </div>
            <div className="input-organization mb-3">
              <label
                htmlFor="organization"
                className="text-textColor block mb-2"
              >
                Company
              </label>
              <input
                type="text"
                name="company"
                id="company"
                placeholder="Company Name"
                className="input"
                onChange={(e) =>
                  fillClientDetails(e.target.name, e.target.value)
                }
              />
            </div>
            <div className="input-title mb-3">
              <label htmlFor="title" className="text-textColor block  mb-2">
                Deal Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                placeholder="Title"
                className="input"
                onChange={(e) =>
                  fillClientDetails(e.target.name, e.target.value)
                }
              />
            </div>
            <div className="input-value mb-3">
              <label
                htmlFor="amount-value"
                className="text-textColor block mb-2"
              >
                Value
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  name="value"
                  id="amount-value"
                  placeholder="Value"
                  className="input w-1/2"
                  onChange={(e) =>
                    fillDealDetails(e.target.name, {
                      value: +e.target.value,
                      type: dealData.value.type,
                    })
                  }
                />
                <select
                  name="value"
                  id="value-type" // like inr,usd
                  className="input w-1/2"
                  onChange={(e) =>
                    fillDealDetails(e.target.name, {
                      value: dealData.value.value,
                      type: e.target.value,
                    })
                  }
                >
                  <option selected className="text-black" value="inr">
                    Indian Rupee
                  </option>
                  <option className="text-black" value="dollar">
                    US Dollar
                  </option>
                  <option className="text-black" value="inr">
                    Indian Rupee
                  </option>
                </select>
              </div>
            </div>
            <div className="input-stage mb-3">
              <label htmlFor="stage" className="text-textColor block mb-2">
                Stage
              </label>
              <select
                name="stage"
                id="stage"
                className="input capitalize"
                onChange={(e) => fillDealDetails(e.target.name, e.target.value)}
              >
                <option className="text-black" selected>
                  Select Stage
                </option>
                {stages?.data?.map((item, i) => {
                  return (
                    <option key={i} className="text-black" value={item._id}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="input-color mb-3 flex items-center gap-1">
              {colors.current.map((item, i) => {
                return (
                  <button
                    key={i}
                    className={`w-[40px] h-[40px] hover:border-2 border-black rounded-full bg-${item}`}
                    type="button"
                  ></button>
                );
              })}
            </div>
            <div className="input-close-date mb-3">
              <label htmlFor="close-date" className="text-textColor block mb-2">
                Expected Close Date
              </label>
              <input
                type="date"
                id="close-date"
                name="expectedClosingDate"
                onChange={(e) => fillDealDetails(e.target.name, e.target.value)}
                onSelect={(e) => fillDealDetails(e.target.name, e.target.value)}
                className="input"
              />
            </div>
          </div>
          <div className="flex-1 h-full p-3">
            <div className="input-group mb-3">
              <label
                htmlFor="personName"
                className="text-textColor block  mb-2"
              >
                Phone
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  name="phone"
                  id="phone"
                  placeholder="Phone"
                  className="input w-[60%]"
                  onChange={(e) =>
                    fillClientDetails(e.target.name, {
                      number: +e.target.value,
                      prefix: dealData.clientDetials.phone.prefix,
                      type: dealData.clientDetials.phone.type,
                    })
                  }
                />
                <select
                  name="type"
                  id="phone-type"
                  className="input w-[40%]"
                  onChange={(e) =>
                    fillClientDetails(e.target.name, {
                      number: dealData.clientDetials.phone.number,
                      prefix: dealData.clientDetials.phone.prefix,
                      type: e.target.value,
                    })
                  }
                >
                  <option className="text-black" value="work">
                    Work
                  </option>
                  <option className="text-black" value="personal">
                    Personal
                  </option>
                  <option className="text-black" value="other">
                    Other
                  </option>
                </select>
              </div>
            </div>
            <div className="input-group mb-3">
              <label
                htmlFor="personName"
                className="text-textColor block  mb-2"
              >
                Email
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  className="input w-[60%]"
                  onChange={(e) =>
                    fillClientDetails(e.target.name, {
                      email: e.target.value,
                      type: dealData.clientDetials.email.type,
                    })
                  }
                />
                <select
                  name="type"
                  id="email-type"
                  className="border py-2 bg-transparent rounded px-3 w-[40%]"
                  onChange={(e) =>
                    fillClientDetails(e.target.name, {
                      email: dealData.clientDetials.email.email,
                      type: e.target.value,
                    })
                  }
                >
                  <option className="text-black" value="inr">
                    Work
                  </option>
                  <option className="text-black" value="dollar">
                    Personal
                  </option>
                  <option className="text-black" value="inr">
                    Other
                  </option>
                </select>
              </div>
            </div>
          </div>
        </form>
      </div>
      <footer className="py-2 px-5 h-[60px] bg-paper flex items-center justify-end gap-2">
        <button
          className="btn-outlined"
          disabled={loading}
          onClick={() => setIsOpen(false)}
        >
          cancel
        </button>
        <button onClick={addNewDeal} disabled={loading} className="btn-filled">
          {loading ? "Loading..." : "add deal"}
        </button>
      </footer>
    </>
  );
};

export default AddDeal;
