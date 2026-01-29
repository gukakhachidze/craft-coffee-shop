import { useState } from 'react';
import { useCoffees } from '../context/CoffeesContext';
import { useIngredients } from '../context/IngredientsContext';
import Table from '../components/common/Table/Table';
import Modal from '../components/common/Modal/Modal';
import CoffeeForm from '../components/Coffees/CoffeeForm';
import styles from './CoffeesPage.module.css';

const CoffeesPage = () => {
  const { coffees, addCoffee, updateCoffee, deleteCoffee } = useCoffees();
  const { ingredients } = useIngredients();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCoffee, setEditingCoffee] = useState(null);

  const getIngredientNames = (ingredientIds) => {
    return ingredientIds
      .map((id) => {
        const ingredient = ingredients.find((ing) => ing.id === id);
        return ingredient ? ingredient.name : '';
      })
      .filter(Boolean)
      .join(', ');
  };

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'title', label: 'სახელწოდება' },
    {
      key: 'ingredients',
      label: 'ინგრედიენტები',
      render: (ingredientIds) => getIngredientNames(ingredientIds)
    },
    { key: 'country', label: 'ქვეყანა' },
    {
      key: 'caffeine',
      label: 'კოფეინი',
      render: (caffeine) => {
        const labels = { low: 'დაბალი', medium: 'საშუალო', high: 'მაღალი' };
        return labels[caffeine] || caffeine;
      }
    },
    {
      key: 'totalPrice',
      label: 'ჯამური ფასი',
      render: (price) => `${price.toFixed(2)} ₾`
    }
  ];

  const handleAddClick = () => {
    setEditingCoffee(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (coffee) => {
    setEditingCoffee(coffee);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id) => {
    if (window.confirm('დარწმუნებული ხართ რომ გსურთ წაშლა?')) {
      deleteCoffee(id);
    }
  };

  const handleSubmit = (formData) => {
    if (editingCoffee) {
      updateCoffee(editingCoffee.id, formData);
    } else {
      addCoffee(formData);
    }
    setIsModalOpen(false);
    setEditingCoffee(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCoffee(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>ყავის კატალოგი</h1>
        <button onClick={handleAddClick} className={styles.addButton}>
          + ახალი ყავის დამატება
        </button>
      </div>

      <Table
        columns={columns}
        data={coffees}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />

      {isModalOpen && (
        <Modal
          title={editingCoffee ? 'ყავის რედაქტირება' : 'ახალი ყავის დამატება'}
          onClose={handleCloseModal}
        >
          <CoffeeForm
            initialData={editingCoffee}
            onSubmit={handleSubmit}
            onCancel={handleCloseModal}
          />
        </Modal>
      )}
    </div>
  );
};

export default CoffeesPage;
