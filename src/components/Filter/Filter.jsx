import { nanoid } from 'nanoid';
import css from './Filter.module.css';

const Filter = ({ onChange, data }) => {
  const filterId = nanoid();
  return (
    <div className={css.filter_container}>
      <label htmlFor={filterId}>Find contacts by name</label>
      <input
        type="text"
        name="filter"
        id={filterId}
        value={data}
        onChange={onChange}
        className={css.filter_input}
      />
    </div>
  );
};

export default Filter;
