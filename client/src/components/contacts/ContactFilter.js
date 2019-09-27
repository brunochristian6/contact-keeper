import React, { useContext, useRef } from "react";
import ContactContext from "../../context/contact/contactContext";

const ContactFilter = () => {
  const contactContext = useContext(ContactContext);
  const { filterContact, clearFilter } = contactContext;

  const text = useRef("");

  const onChange = e => {
    if (text.current.value !== "") {
      filterContact(e.target.value);
    } else {
      clearFilter();
    }
  };
  return (
    <form>
      <input
        ref={text}
        type="text"
        name="filter"
        id="filter"
        onChange={onChange}
        placeholder="Search..."
      />
    </form>
  );
};

export default ContactFilter;
