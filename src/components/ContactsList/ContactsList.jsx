import css from './ContactList.module.css';

const ContactList = ({ data, deleteContacts }) => {
  return (
    <ul className={css.contact_list}>
      {data.map(el => (
        <li key={el.id} className={css.contact_item}>
          {el.name}: {el.number}
          <button
            type="button"
            onClick={() => deleteContacts(el.id)}
            className={css.delete_btn}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
