import React from "react";
import EditDetails from "./EditDetails";
import ViewDetails from "./ViewDetails";
import { AccordionItemProps } from "./constants";

const AccordionItem = (props: AccordionItemProps) => {
  return props.isEdit && props.activeKey === props.currentIndex ? (
    <EditDetails {...props} />
  ) : (
    <ViewDetails {...props} onEditClick={props.onEditClick} />
  );
};

export default AccordionItem;
