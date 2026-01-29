import styles from './Table.module.css';

const Table = ({ columns, data, onEdit, onDelete }) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key} className={styles.th}>
                {column.label}
              </th>
            ))}
            <th className={styles.th}>მოქმედებები</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + 1} className={styles.emptyState}>
                ჯერ არაფერია დამატებული
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr key={row.id} className={styles.tr}>
                {columns.map((column) => (
                  <td key={column.key} className={styles.td}>
                    {column.render
                      ? column.render(row[column.key], row)
                      : row[column.key]}
                  </td>
                ))}
                <td className={styles.td}>
                  <div className={styles.actions}>
                    <button
                      onClick={() => onEdit(row)}
                      className={`${styles.button} ${styles.editButton}`}
                    >
                      რედაქტირება
                    </button>
                    <button
                      onClick={() => onDelete(row.id)}
                      className={`${styles.button} ${styles.deleteButton}`}
                    >
                      წაშლა
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
