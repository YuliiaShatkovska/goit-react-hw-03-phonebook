import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactsList/ContactsList';
import Filter from './Filter/Filter';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const storage = localStorage.getItem('contact');
    console.log(storage);
    if (storage) {
      this.setState({ contacts: JSON.parse(storage) });
    } else {
      this.setState({ contacts: this.state.contacts });
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.contacts.length !== this.state.contacts.length) {
      localStorage.setItem('contact', JSON.stringify(this.state.contacts));
    }
  }

  formSubmitAddContact = ({ name, number }) => {
    const sameName = this.state.contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (sameName) {
      alert(`${name} is already in contacts`);
      return;
    }

    this.setState(prevState => {
      return {
        contacts: [
          ...prevState.contacts,
          {
            id: nanoid(),
            name,
            number,
          },
        ],
      };
    });
  };

  onChange = e => {
    const { name, value } = e.currentTarget;

    this.setState({ [name]: value });
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const filtred = this.state.filter.toLowerCase();
    const contactList = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(filtred)
    );
    return (
      <div className="container">
        <h2>Phonebook</h2>
        <ContactForm onSubmitAddContact={this.formSubmitAddContact} />
        <h2>Contacts</h2>
        <Filter onChange={this.onChange} data={this.state.filter} />
        <ContactList data={contactList} deleteContacts={this.deleteContact} />
      </div>
    );
  }
}

export default App;
