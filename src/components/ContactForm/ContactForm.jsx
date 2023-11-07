import { useState } from 'react';
import { nanoid } from 'nanoid';
import css from './ContactForm.module.css';

export const ContactForm = ({onSubmit}) => {

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const handleSubmit = evt => {
    evt.preventDefault();

    const contactData = {
      name,
      number,
      id: nanoid(),
    };
    
      onSubmit(contactData);
      setName('');
      setNumber('');
  };

  const handleInputChange = evt => {
    const value =
      evt.target.value;

    const name = evt.target.name;

    switch (name) {
      case "name":
        setName(value);
        break;
      case "number":
        setNumber(value);
        break;
      default:
        break;
    };
  };
    
  return (
      <form onSubmit={handleSubmit} className={css.form}>
        <label className={css.formLabel}>
          Name
          <input
            className={css.formInput}
            type="text"
            name="name"
            onChange={handleInputChange}
            value={name}
            pattern="^[a-zA-Zа-яА-ЩЬЮЯҐЄІЇа-щьюяґєії]+(([' \-][a-zA-Zа-яА-ЩЬЮЯҐЄІЇа-щьюяґєії ])?[a-zA-Zа-яА-ЩЬЮЯҐЄІЇа-щьюяґєії]*)*$"
            title="Only Cyrillic/Latin letters, also name may contain hyphen, apostrophe or space character"
            required
          />
        </label>
        <label className={css.formLabel}>
            Number
          <input
            className={css.formInput}
            type="tel"
            name="number"  
            onChange={handleInputChange}
            value={number}
            pattern="[+380]{4}-[0-9]{2}-[0-9]{3}-[0-9]{2}-[0-9]{2}"
            title="Only digits, format +380-XX-XXX-XX-XX"
            required
          />
        </label>
            <button className={css.button} type="submit">Add contact</button>
      </form>
    );
};
