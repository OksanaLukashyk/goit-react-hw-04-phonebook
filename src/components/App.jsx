import { Component } from 'react';
import { Notify } from 'notiflix';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: ''
  };

  componentDidMount() { 
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) { 
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContactData = contactData => {
    const hasDuplicates = this.state.contacts.some(
      contact => contact.name.toLowerCase().trim() === contactData.name.toLowerCase().trim());

    if (hasDuplicates) {
      Notify.warning(`Contact with name '${contactData.name}' has already been added!`,  {
    timeout: 6000,
  },);
      return;
    }

    this.setState(prevState => ({
      contacts: [...prevState.contacts, contactData]
    }));
  
  };

  filterChange = evt => {
    this.setState({
      filter: evt.target.value
    });
  };

  filterContacts = () => {
    if (!this.state.filter) { 
      return this.state.contacts;
    }
    
    return this.state.contacts.filter(contact => contact.name.toLowerCase().trim().includes(this.state.filter.toLowerCase().trim()));
  }
  
  deleteContacts = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(
        contact => contact.id !== id),
    }));
  };

  render() {
    return (
    <div class="glass">
      <h1>Phonebook</h1>
      <ContactForm onSubmit={this.addContactData} />
      <h2>Contacts</h2>
      <Filter filterValue={this.filter} handleFilterInputChange={this.filterChange} />
      <ContactList filteredContacts={this.filterContacts()} handleDeleteContact={this.deleteContacts} /> 
    </div>
   )
  };
};
