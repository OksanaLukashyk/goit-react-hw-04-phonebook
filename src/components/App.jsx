import { useState, useEffect } from 'react';
import { Notify } from 'notiflix';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

export const App = () => {
  const contactsDataBase = [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ];

  const getInitialContactsList = () => {
    return JSON.parse(localStorage.getItem('contacts')) ?? contactsDataBase;
  };

  const [contacts, setContacts] = useState(getInitialContactsList);
  const [filter, setFilter] = useState("");
  
  useEffect(() => {
      localStorage.setItem('contacts', JSON.stringify(contacts));
   }, [contacts]);

  const addContactData = contactData => {
    const hasDuplicates = contacts.some(
      contact => contact.name.toLowerCase().trim() === contactData.name.toLowerCase().trim());

    if (hasDuplicates) {
      Notify.warning(`Contact with name '${contactData.name}' has already been added!`, { timeout: 6000, });
      return;
    }

    setContacts(prevState => [...prevState, {...contactData}]);  
  };

  const filterChange = evt => {
    setFilter(evt.target.value);
  };

  const filterContacts = () => {
    if (!filter) { 
      return contacts;
    }
    
    return contacts.filter(contact => contact.name.toLowerCase().trim().includes(filter.toLowerCase().trim()));
  }
  
  const deleteContacts = id => {
    setContacts(prevState => {
      return prevState.filter(
        contact => contact.id !== id);
    });
  };

  return (
    <div className="glass">
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContactData} />
      <h2>Contacts</h2>
      <Filter filterValue={filter} handleFilterInputChange={filterChange} />
      <ContactList filteredContacts={filterContacts()} handleDeleteContact={deleteContacts} /> 
    </div>
  )
};
