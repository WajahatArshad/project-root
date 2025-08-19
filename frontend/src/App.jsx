import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
console.log(API_URL)
function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [editing, setEditing] = useState(null);

  const fetchItems = async () => {
    const res = await axios.get(`${API_URL}/items`);
    setItems(res.data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await axios.put(`${API_URL}/items/${editing.id}`, { name });
      setEditing(null);
    } else {
      await axios.post(`${API_URL}/items`, { name });
    }
    setName('');
    fetchItems();
  };

  const handleEdit = (item) => {
    setEditing(item);
    setName(item.name);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/items/${id}`);
    fetchItems();
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Simple CRUD App</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Item name"
          required
        />
        <button type="submit">{editing ? 'Update' : 'Add'}</button>
      </form>

      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name}{' '}
            <button onClick={() => handleEdit(item)}>Edit</button>{' '}
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
