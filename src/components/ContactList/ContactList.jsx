import css from './ContactList.module.css';
import { ContactListItem } from '../ContactListItem/ContactListItem';

export const ContactList = ({filteredContacts, handleDeleteContact}) => { 
    return (<ul className={css.contactList}>
        {filteredContacts.map(contact =>
            <ContactListItem
                name={contact.name}
                number={contact.number}
                key={contact.id}
                deleteContact={()=>handleDeleteContact(contact.id)} />
        )}
</ul>)
}