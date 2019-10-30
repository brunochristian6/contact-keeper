import React, { useReducer } from "react";
import axios from "axios";
import uuid from "uuid";
import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  GET_CONTACTS
} from "../types";

const ContactState = props => {
  const initialState = {
    contacts: [],
    current: null,
    filtered: null
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  const getContact = async () => {
    const res = await axios.get("api/contacts");
    dispatch({
      type: GET_CONTACTS,
      payload: res.data
    });
  };

  const addContact = async contact => {
    // contact.id = uuid.v4();
    const res = await axios.post("api/contacts", contact, {
      headers: { "Content-Type": "application/json" }
    });
    dispatch({
      type: ADD_CONTACT,
      payload: res.data
    });
  };
  //DELETE CONTACT

  const deleteContact = async id => {
    await axios.delete(`/api/contacts/${id}`);

    dispatch({
      type: DELETE_CONTACT,
      payload: id
    });
  };

  // Update Contact
  const updateContact = async contact => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.put(
        `/api/contacts/${contact._id}`,
        contact,
        config
      );

      dispatch({
        type: UPDATE_CONTACT,
        payload: res.data
      });
    } catch (err) {
      console.log(err);
    }
  };

  //SET CURRENT CONTACT

  const setCurrent = contact => {
    dispatch({
      type: SET_CURRENT,
      payload: contact
    });
  };
  //CLEAR CURRENT CONTACT
  const clearCurrent = () => {
    dispatch({
      type: CLEAR_CURRENT
    });
  };

  //FILTER CONTACTS
  const filterContact = contact => {
    dispatch({
      type: FILTER_CONTACTS,
      payload: contact
    });
  };
  //CLEAR FILTER
  const clearFilter = () => {
    dispatch({
      type: CLEAR_FILTER
    });
  };
  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        current: state.current,
        updateContact,
        filterContact,
        filtered: state.filtered,
        clearFilter,
        getContact
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
