import { Component } from 'react';
import { ContactForm } from './ContactForm';
import { ContactList } from './ContactList';
import { Filter } from './Filter';
import { nanoid } from 'nanoid';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() { 
    const savedContacts = localStorage.getItem('phonebook');
    if (savedContacts !== null) {
      this.setState({contacts: JSON.parse(savedContacts)});
    }
   }

  componentDidUpdate(prevProps, prevState) {
    console.log(`prevState`, prevState.contacts);
    console.log(`thisState`, this.state.contacts);
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('phonebook', JSON.stringify(this.state.contacts));
    }
  }

  addContact = (name, number) => {
    const isNameTaken = this.state.contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isNameTaken) {
      alert('This name is already in the phonebook.');
      return;
    }

    const newContact = { id: nanoid(), name, number };
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  handleFilterChange = filter => {
    this.setState({ filter });
  };

  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <div
        style={{
          height: '100vh',
          marginLeft: '30%',
          fontSize: 40,
          color: '#010101',
        }}
      >
        <h1>Phonebook</h1>
        <ContactForm addContact={this.addContact} contacts={contacts} />
        <h2>Contacts</h2>
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={this.deleteContact}
        />
        <h3>Find contacts by name</h3>
        <Filter filter={filter} setFilter={this.handleFilterChange} />
      </div>
    );
  }
}
