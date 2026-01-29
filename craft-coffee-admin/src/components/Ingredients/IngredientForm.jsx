import { useState, useEffect } from 'react';
import styles from './IngredientForm.module.css';

const IngredientForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    strength: 'medium',
    flavor: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) {
      alert('გთხოვთ შეავსოთ ყველა სავალდებულო ველი');
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label className={styles.label}>
          დასახელება <span className={styles.required}>*</span>
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={styles.input}
          placeholder="მაგ: ესპრესო"
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>
          ფასი (₾) <span className={styles.required}>*</span>
        </label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className={styles.input}
          placeholder="მაგ: 3.50"
          step="0.01"
          min="0"
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>აღწერა</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className={styles.textarea}
          placeholder="ინგრედიენტის აღწერა..."
          rows="3"
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>სიძლიერე</label>
        <select
          name="strength"
          value={formData.strength}
          onChange={handleChange}
          className={styles.select}
        >
          <option value="low">დაბალი</option>
          <option value="medium">საშუალო</option>
          <option value="high">მაღალი</option>
        </select>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>არომატი</label>
        <input
          type="text"
          name="flavor"
          value={formData.flavor}
          onChange={handleChange}
          className={styles.input}
          placeholder="მაგ: მწარე, ტკბილი, ხილის"
        />
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          onClick={onCancel}
          className={styles.cancelButton}
        >
          გაუქმება
        </button>
        <button type="submit" className={styles.submitButton}>
          {initialData ? 'განახლება' : 'დამატება'}
        </button>
      </div>
    </form>
  );
};

export default IngredientForm;
