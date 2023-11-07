import css from './ContactListItem.module.css';

export const ContactListItem = ({name, number, id, deleteContact}) => { 
    return (
        <li className={css.contactListItem} key={id}>
        <p><span className={css.contactName}>{name}</span>: {number}</p>
        <button 
          className={css.deleteContactBtn}
          type="button"
          onClick={deleteContact}
      > 
        Delete
      </button>
      </li>
    );
};