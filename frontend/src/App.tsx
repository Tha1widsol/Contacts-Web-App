import { useEffect, useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Typography, Card, Box, Divider } from "@mui/material";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { addContact, ContactProps, deleteContact, editContact, fetchContacts } from "./redux/features/contactsSlice";


export function FormPopup({ onClose, onAdd, contact }: { onClose: () => void; onAdd: (contact: ContactProps) => void, contact?: ContactProps}) {
  const [form, setForm] = useState<ContactProps>({
    id: undefined,
    first_name: "",
    surname: "",
    email: "",
    phone: "",
    mobile: "",
  });
  const [errors, setErrors] = useState<string[]>([])

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!contact) return
    setForm(contact)
  }, [contact])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const validateForm = () => {
    let isValid = true;
    const newErrors: string[] = [];
  
    const nameRegex = /^[A-Za-z]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]+$/;
  
    if (!form.first_name.trim()) {
      newErrors.push("First name is required.");
      isValid = false;
    } else if (!nameRegex.test(form.first_name)) {
      newErrors.push("First name must contain only letters.");
      isValid = false;
    }
  
    if (!form.surname.trim()) {
      newErrors.push("Surname is required.");
      isValid = false;
    } else if (!nameRegex.test(form.surname)) {
      newErrors.push("Surname must contain only letters.");
      isValid = false;
    }
  
    if (!form.email.trim()) {
      newErrors.push("Email is required.");
      isValid = false;
    } else if (!emailRegex.test(form.email)) {
      newErrors.push("Invalid email format.");
      isValid = false;
    }
  
    if (!form.phone.trim()) {
      newErrors.push("Phone number is required.");
      isValid = false;
    } else if (!phoneRegex.test(form.phone)) {
      newErrors.push("Phone number must contain only digits.");
      isValid = false;
    } else if (form.phone.length < 7 || form.phone.length > 15) {
      newErrors.push("Phone number must be between 7 and 15 digits.");
      isValid = false;
    }

    if (form.mobile?.trim() && (!phoneRegex.test(form.mobile) || form.mobile.length < 7 || form.mobile.length > 15)) {
      newErrors.push("Mobile number must contain only digits and be between 7 and 15 digits.");
      isValid = false;
    }
  
    setErrors(newErrors);
    return isValid;
  };
  
  
  const handleSubmit = () => {
    const capitalize = (text: string) => {
     return text.replace(/\b\w/g, (char) => char.toUpperCase())
    }
    if (!validateForm()) {
      window.scrollTo(0, 0);
      return;
    }
  
    const capitalizedForm = {
      ...form,
      first_name: capitalize(form.first_name),
      surname: capitalize(form.surname),
      email: form.email.toLowerCase(),
      phone: form.phone,
      mobile: form.mobile,
    };
  
    if (contact) dispatch(editContact(capitalizedForm));
    else onAdd(capitalizedForm);
    
    onClose();
  };
  
  

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Add Contact</DialogTitle>
      <DialogContent>
        {errors && errors.map((error, index) => {
          return (
            <ul key={index} style={{color: "red"}}>
              <li>{error}</li>
            </ul>
          )
        })}
        <TextField
          label="First Name"
          name="first_name"
          fullWidth
          margin="normal"
          value={form.first_name}
          required
          onChange={handleChange}
        />
        <TextField
          label="Surname"
          name="surname"
          fullWidth
          margin="normal"
          value={form.surname}
          required
          onChange={handleChange}
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          fullWidth
          margin="normal"
          value={form.email}
          required
          onChange={handleChange}
        />
        <TextField
          label="Phone"
          name="phone"
          fullWidth
          margin="normal"
          value={form.phone}
          required
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
        <Button onClick={handleSubmit} type="submit" color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export function DeletePopup({ onClose, contactId }: { onClose: () => void; contactId: number}) {
  const dispatch = useAppDispatch()

  const handleDelete = () => {
    dispatch(deleteContact(contactId))
    onClose()
  }

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Delete Contact</DialogTitle>
      <DialogContent>
          <Button variant="contained" onClick = {() => handleDelete()}>Confirm</Button>
          <Button variant="outlined" onClick={onClose}>Cancel</Button>
      </DialogContent>
    </Dialog>
  )
}

function App() {
  const contacts = useAppSelector((state) => state.contacts.values)
  const [formPopup, setFormPopup] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false)
  const [selectedContact, setSelectedContact] = useState<ContactProps>()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchContacts())
  }, [dispatch])

  const handleOpenEdit = (contact: ContactProps) => {
    setSelectedContact(contact)
    setFormPopup(true)
  }

  const handleOpenAdd = () => {
    setSelectedContact(undefined)
    setFormPopup(true)
  }

  
  const handleOpenDelete = (contact: ContactProps) => {
    setSelectedContact(contact)
    setDeletePopup(true)
  }

  return (
    <div className="App">
      <Typography variant="h4" gutterBottom>
        Contact List
      </Typography>
      <Button variant="contained" color="primary" onClick={() => handleOpenAdd()}>
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
              <Box sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}>
                <Typography variant="body2" color="textSecondary">
                  {contact.email}
                </Typography>
              </Box>
              
              <Box sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}>
                <Typography variant="body2" color="textSecondary">
                  {contact.phone}
                </Typography>
              </Box>
              
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="body2" color="textSecondary">
                  {contact.mobile}
                </Typography>
              </Box>
              <Button color="secondary" onClick={() => handleOpenEdit(contact as ContactProps)}>Edit</Button>
              <Button color="error" onClick={() => handleOpenDelete(contact as ContactProps)}>Delete</Button>
            </Card>
          </Box>
        ))
      ) : (
        <Typography variant="body1" color="textSecondary" margin={1}>
          No contacts available.
        </Typography>
      )}
    </>
      {deletePopup && <DeletePopup onClose={() => setDeletePopup(false)} contactId={Number(selectedContact?.id)}/>}
      {formPopup && <FormPopup onClose={() => setFormPopup(false)} onAdd={(contact) => dispatch(addContact(contact))} contact={selectedContact}/>}
    </div>
  );
}

export default App;
