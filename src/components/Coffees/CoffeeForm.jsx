import { useState, useEffect } from 'react';
import { useIngredients } from '../../context/IngredientsContext';
import { useCoffees } from '../../context/CoffeesContext';
import styles from './CoffeeForm.module.css';

const CoffeeForm = ({ initialData, onSubmit, onCancel }) => {
  const { ingredients } = useIngredients();
  const { calculateTotalPrice } = useCoffees();

  const [formData, setFormData] = useState({
    title: '',
    ingredients: [],
    description: '',
    image: '',
    country: '',
    caffeine: 'medium'
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

  const handleIngredientToggle = (ingredientId) => {
    setFormData((prev) => {
      const isSelected = prev.ingredients.includes(ingredientId);
      return {
        ...prev,
        ingredients: isSelected
          ? prev.ingredients.filter((id) => id !== ingredientId)
          : [...prev.ingredients, ingredientId]
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || formData.ingredients.length === 0) {
      alert(
        'გთხოვთ შეავსოთ ყველა სავალდებულო ველი და აირჩიოთ მინიმუმ ერთი ინგრედიენტი'
      );
      return;
    }
    onSubmit(formData);
  };

  const estimatedPrice = calculateTotalPrice(formData.ingredients);

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label className={styles.label}>
          სახელწოდება <span className={styles.required}>*</span>
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={styles.input}
          placeholder="მაგ: კაპუჩინო"
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>
          ინგრედიენტები <span className={styles.required}>*</span>
        </label>
        <div className={styles.ingredientsList}>
          {ingredients.length === 0 ? (
            <p className={styles.noIngredients}>
              ჯერ არ არის დამატებული ინგრედიენტები. გადადით ინგრედიენტების
              გვერდზე და დაამატეთ.
            </p>
          ) : (
            ingredients.map((ingredient) => (
              <label key={ingredient.id} className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={formData.ingredients.includes(ingredient.id)}
                  onChange={() => handleIngredientToggle(ingredient.id)}
                  className={styles.checkbox}
                />
                <span>
                  {ingredient.name} ({ingredient.price.toFixed(2)} ₾)
                </span>
              </label>
            ))
          )}
        </div>
      </div>

      <div className={styles.priceEstimate}>
        <strong>სავარაუდო ფასი:</strong> {estimatedPrice.toFixed(2)} ₾
        <span className={styles.priceFormula}>
          (2 ₾ + ინგრედიენტების ფასები)
        </span>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>აღწერა</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className={styles.textarea}
          placeholder="ყავის აღწერა..."
          rows="3"
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>სურათის URL</label>
        <input
          type="url"
          name="image"
          value={formData.image}
          onChange={handleChange}
          className={styles.input}
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>ქვეყანა</label>
        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
          className={styles.input}
          placeholder="მაგ: იტალია"
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>კოფეინის დონე</label>
        <select
          name="caffeine"
          value={formData.caffeine}
          onChange={handleChange}
          className={styles.select}
        >
          <option value="low">დაბალი</option>
          <option value="medium">საშუალო</option>
          <option value="high">მაღალი</option>
        </select>
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

export default CoffeeForm;
