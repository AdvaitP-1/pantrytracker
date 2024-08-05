'use client'
import { useState,useEffect } from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { List, ListItem, ListItemText, Typography } from '@mui/material';
import { collection, addDoc,getDoc, query, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebase';


const StyledListItem = styled(ListItem)(({ theme }) => ({
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  '&:last-child': {
    borderBottom: 'none',
  },
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  borderRadius: '8px',
  margin: '8px 0',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    transform: 'scale(1.02)',
  },
}));



export default function Home() {
  const [items, setItems] = useState([
    {
      name: 'apple',
      quantity: 5
    },
    {
      name: 'banana',
      quantity: 10
    },
    {
      name: 'orange',
      quantity: 3
    }
  ]);
  const [newItem, setNewItem] = useState({name: '', quantity: 0});

  //Add item
  const addItem = async(e) => {
    e.preventDefault();
    if (newItem.name !== '' && newItem.quantity !== 0) {
      await addDoc(collection(db, 'items'), {
        name: newItem.name.trim(),
        quantity: Number(newItem.quantity)
      });
      setNewItem({name: '', quantity: 0});
    }
  }
  //Read items
  useEffect(() => {
    const q = query(collection(db, 'items'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let itemsArr = [];
  
      querySnapshot.forEach((doc) => {
        itemsArr.push({...doc.data(), id: doc.id});
      });
      setItems(itemsArr);

    });
    }, []);

  //Delete item
  const deleteItem = async(id) => {
    await deleteDoc(doc(db, 'items', id));
  }

  //update item
  async function updateItem(id,increment) {
    const currentQuantity = await getDoc(doc(db, 'items', id));
    const newQuantity = currentQuantity.data().quantity + increment;

    if (snapshot.exists()) {
      const currentQuantity = snapshot.val().quantity;
      const newQuantity = currentQuantity + increment;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center text-white">Pantry Tracker</h1>
        <div className="bg-slate-50 p-5 rounded-lg text-center">
          <form className='grid grid-cols-6 items-center text-black'>
            <input value={newItem.name} onChange={(e) => setNewItem({...newItem, name: e.target.value})} type="text" placeholder="Enter an item" className="col-span-3 p-3 border" />
            <input value={newItem.quantity} onChange={(e) => setNewItem({...newItem, quantity: e.target.value})} type="number" placeholder="Number of items" className="col-span-2 p-3 border mx-3" />
            <Button size='medium' variant="contained" color="primary" type="submit" onClick={addItem}>
              Submit
            </Button>
          </form>
          <ul>
            {items.map((item, id) => (
              <li key={id} className='my-4 w-full flex justify-between bg-slate-400 rounded-lg'>
                <div className='p-4 w-full flex justify-between'>
                  <span>{item.name}</span>
                  <span>{item.quantity}</span>
                </div>
                <Button onClick={() => deleteItem(item.id)}variant="contained" color="secondary" size='small'>X</Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  )}