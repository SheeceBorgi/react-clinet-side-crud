import React from "react";
import { Celebrity } from "../../App/constants";

interface AccordionTypes {
  data: Celebrity[];
  renderItem: (item: Celebrity, index: number) => React.ReactNode;
}
const Accordion = (props: AccordionTypes) => {
  return (
    <div>
      {props.data.map((item: Celebrity, index: number) =>
        props.renderItem(item, index)
      )}
    </div>
  );
};

export default Accordion;
