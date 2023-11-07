import css from './Filter.module.css';

export const Filter = ({filterValue, handleFilterInputChange}) => { 
        return (
            <label   className={css.filterLabel}>
                Find contacts by name
                <input
                    className={css.filterInput}
                    type="text"
                    name="filter"
                    placeholder="Search contacts"
                    value={filterValue}
                    onChange={handleFilterInputChange}
                />
            </label>
        );
    };
