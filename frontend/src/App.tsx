import { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Typography, Card, Box, Divider } from '@mui/material';
import './App.css';

type Contact = {
  first_name: string;
  surname: string;
  email: string;
  phone: string;
  mobile: string;
};

export function Popup({ onClose, onAdd }: { onClose: () => void; onAdd: (contact: Contact) => void }) {
  const [form, setForm] = useState<Contact>({
    first_name: '',
    surname: '',
    email: '',
    phone: '',
    mobile: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onAdd(form);
    onClose();
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Add Contact</DialogTitle>
      <DialogContent>
        <TextField
          label="First Name"
          name="first_name"
          fullWidth
          margin="normal"
          value={form.first_name}
          onChange={handleChange}
        />
        <TextField
          label="Surname"
          name="surname"
          fullWidth
          margin="normal"
          value={form.surname}
          onChange={handleChange}
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          fullWidth
          margin="normal"
          value={form.email}
          onChange={handleChange}
        />
        <TextField
          label="Phone"
          name="phone"
          fullWidth
          margin="normal"
          value={form.phone}
          onChange={handleChange}
        />
        <TextField
          label="Mobile"
          name="mobile"
          fullWidth
          margin="normal"
          value={form.mobile}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function App() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [popup, setPopup] = useState(false);

  const addContact = (contact: Contact) => {
    setContacts([...contacts, contact]);
  };

  return (
    <div className="App">
      <Typography variant="h4" gutterBottom>
        Contact List
      </Typography>
      <Button variant="contained" color="primary" onClick={() => setPopup(true)}>
        Add Contact
      </Button>

      <>
      {contacts.length > 0 ? (
        contacts.map((contact, index) => (
          <Box key={index} sx={{ marginTop: 2 }}>
            <Card sx={{ padding: 2, boxShadow: 3, borderRadius: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {index + 1}. {contact.first_name} {contact.surname}
              </Typography>
              <Divider sx={{ marginY: 1 }} />
              
              <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
            
                <Typography variant="body2" color="textSecondary">
                  {contact.email}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
                <Typography variant="body2" color="textSecondary">
                  {contact.phone}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2" color="textSecondary">
                  {contact.mobile}
                </Typography>
              </Box>
            </Card>
          </Box>
        ))
      ) : (
        <Typography variant="body1" color="textSecondary">
          No contacts available.
        </Typography>
      )}
    </>

      {popup && <Popup onClose={() => setPopup(false)} onAdd={addContact} />}
    </div>
  );
}

export default App;
