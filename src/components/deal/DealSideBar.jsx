import { Icon } from "@iconify/react";
import FileInput from "../customFields/Fields/FileInput";
import Accordian, { AccordianBody } from "../global/Accordian";

const DealSideBar = () => {
  return (
    <aside className="w-[350px] shrink-0 border-r h-full overflow-auto">
      <Accordian title={"Summary"}>
        <AccordianBody>
          <div>
            <div className="money/value flex items-center gap-4 mb-4">
              <Icon icon="ph:money" className="text-2xl" />
              <p>10,000 Rs</p>
            </div>
            <div className="expected-close-date flex items-center gap-4 mb-4">
              <Icon icon="bx:calendar" className="text-2xl" />
              <p>29 March, 2023</p>
            </div>
            <div className="expected-close-date flex items-center gap-4 mb-4">
              <Icon icon="uil:user" className="text-2xl" />
              <p>Awesh Choudhary</p>
            </div>
            <div className="expected-close-date flex items-center gap-4 mb-4">
              <Icon icon="uil:building" className="text-2xl" />
              <p>Stellar Aesthetics</p>
            </div>
          </div>
        </AccordianBody>
      </Accordian>
      <Accordian title={"Overview"}>
        <AccordianBody>
          <div>
            <div className="money/value font-medium flex items-center justify-between mb-3">
              <p>Deal Age:</p>
              <p>29 Days</p>
            </div>
            <div className="money/value flex items-center justify-between mb-3">
              <p>Inactive (Days):</p>
              <p>25 Days</p>
            </div>
            <div className="money/value flex items-center justify-between mb-3">
              <p>Created:</p>
              <p>1 March, 2023</p>
            </div>
            <div className="money/value flex items-center justify-between mb-3">
              <p>Closing Date:</p>
              <p>29 March, 2023</p>
            </div>
          </div>
        </AccordianBody>
      </Accordian>
      <Accordian title={"Custom Fields"}>
        <AccordianBody>
          <div>
            <FileInput />
          </div>
        </AccordianBody>
      </Accordian>
    </aside>
  );
};

export default DealSideBar;
