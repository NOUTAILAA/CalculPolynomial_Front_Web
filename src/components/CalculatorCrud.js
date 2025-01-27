import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import pour la navigation
import axios from "axios";
import "../styles/CalculatorCrud.css";

const CalculatorCrud = () => {
  const [calculators, setCalculators] = useState([]);
  const [form, setForm] = useState({ username: "", email: "",password: "" });
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate(); // Utilisez useNavigate pour rediriger

  // Charger tous les utilisateurs
  const fetchCalculators = async () => {
    try {
      const response = await axios.get("http://localhost:8082/api/calculators");
      setCalculators(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement :", error);
    }
  };

  useEffect(() => {
    fetchCalculators();
  }, []);

  // Ajouter ou mettre à jour un utilisateur
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:8082/api/calculators/${editingId}`, form);
      } else {
        await axios.post("http://localhost:8082/api/calculators/register", form);
      }
      fetchCalculators();
      setForm({ username: "", email: "", password: "" });
      setEditingId(null);
    } catch (error) {
      console.error("Erreur lors de l'enregistrement :", error);
    }
  };

  // Supprimer un utilisateur
  /*const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8082/api/calculators/${id}`);
      fetchCalculators();
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };*/

  // Remplir le formulaire pour la modification
  const handleEdit = (calculator) => {
    setForm({ username: calculator.username, email: calculator.email, password: calculator.password });
    setEditingId(calculator.id);
  };

  return (
    <div className="crud-container">
      <h2>Gestion des Calculateurs</h2>
      <form className="crud-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button className="crud-button submit-btn" type="submit">
          {editingId ? "Modifier" : "Ajouter"}
        </button>
      </form>
      <table className="crud-table">
        <thead>
          <tr>

            <th>Nom d'utilisateur</th>
            <th>Email</th>

            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {calculators.map((calc) => (
            <tr key={calc.id}>

              <td>{calc.username}</td>
              <td>{calc.email}</td>

              <td>
                <button
                  className="crud-button view-btn"
                  onClick={() => navigate(`/user/${calc.id}`)} // Redirige vers la page des polynômes
                >
                  Voir Calculs
                </button>
                <button className="crud-button edit-btn" onClick={() => handleEdit(calc)}>
                  Modifier
                </button>
              
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CalculatorCrud;
