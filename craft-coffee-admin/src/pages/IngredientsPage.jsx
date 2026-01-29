import { useState } from 'react';
import { useIngredients } from '../context/IngredientsContext';
import Table from '../components/common/Table/Table';
import Modal from '../components/common/Modal/Modal';
import IngredientForm from '../components/Ingredients/IngredientForm';
import styles from './IngredientsPage.module.css';

const IngredientsPage = () => {
  const { ingredients, addIngredient, updateIngredient, deleteIngredient } =
    useIngredients();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIngredient, setEditingIngredient] = useState(null);

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'დასახელება' },
    {
      key: 'price',
      label: 'ფასი',
      render: (price) => `${price.toFixed(2)} ₾`
    },
    { key: 'description', label: 'აღწერა' },
    {
      key: 'strength',
      label: 'სიძლიერე',
      render: (strength) => {
        const labels = { low: 'დაბალი', medium: 'საშუალო', high: 'მაღალი' };
        return labels[strength] || strength;
      }
    },
    { key: 'flavor', label: 'არომატი' }
  ];

  const handleAddClick = () => {
    setEditingIngredient(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (ingredient) => {
    setEditingIngredient(ingredient);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id) => {
    if (window.confirm('დარწმუნებული ხართ რომ გსურთ წაშლა?')) {
      deleteIngredient(id);
    }
  };

  const handleSubmit = (formData) => {
    if (editingIngredient) {
      updateIngredient(editingIngredient.id, formData);
    } else {
      addIngredient(formData);
    }
    setIsModalOpen(false);
    setEditingIngredient(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingIngredient(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>ინგრედიენტები</h1>
        <button onClick={handleAddClick} className={styles.addButton}>
          + ახალი ინგრედიენტის დამატება
        </button>
      </div>

      <Table
        columns={columns}
        data={ingredients}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />

      {isModalOpen && (
        <Modal
          title={
            editingIngredient
              ? 'ინგრედიენტის რედაქტირება'
              : 'ახალი ინგრედიენტის დამატება'
          }
          onClose={handleCloseModal}
        >
          <IngredientForm
            initialData={editingIngredient}
            onSubmit={handleSubmit}
            onCancel={handleCloseModal}
          />
        </Modal>
      )}
    </div>
  );
};

export default IngredientsPage;
