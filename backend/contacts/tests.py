from django.test import TestCase
from rest_framework.test import APIClient
from .models import *
import json

# Create your tests here.

class ContactTests(TestCase):
    client = APIClient()
    mock_data = {
        'first_name': 'Kelvin',
        'surname': 'Lai',
        'email': 'test@gmail.com',
        'phone': '0000000000',
        'mobile': '1111111111'
    }

    def setUp(self):
        return super().setUp()
    
    def test_add_valid_contact(self):
        response = self.client.post('/api/contacts', self.mock_data, format='json')
        self.assertEquals(response.status_code, 201) 
        self.assertEquals(Contact.objects.count(), 1)

    def test_add_invalid_contact(self):
        response = self.client.post('/api/contacts', {}, format='json')
        self.assertEquals(response.status_code, 400) 

    def test_edit_contact(self):
         contact = Contact.objects.create(
            first_name='John',
            surname='Doe',
            email='john@example.com',
            phone='123456789',
            mobile='987654321'
        )
         
         updated_contact = {
            'first_name': 'Kelvin',
            'surname': 'Lai',
            'email': 'john@example.com',
            'phone': '123456789',
            'mobile': '987654321'
        }
         response = self.client.put(f'/api/contacts/{contact.id}', data=json.dumps(updated_contact), content_type='application/json')
         contact.refresh_from_db() 

         self.assertEquals(response.status_code, 200) 
         self.assertEquals(contact.first_name, 'Kelvin') 
         self.assertEquals(contact.surname, 'Lai')
    
    def test_delete_contact(self):
        contact = Contact.objects.create(
            first_name='John',
            surname='Doe',
            email='john@example.com',
            phone='123456789',
            mobile='987654321'
        )

        contact.refresh_from_db()
        response = self.client.delete(f'/api/contacts/{contact.id}')
        self.assertEquals(response.status_code, 200) 

    def test_get_contacts(self):
        contact1 = Contact.objects.create(
            first_name='John',
            surname='Doe',
            email='john@example.com',
            phone='123456789',
            mobile='987654321'
        )
        contact2 = Contact.objects.create(
            first_name='John2',
            surname='Doe',
            email='john@example.com',
            phone='123456789',
            mobile='987654321'
        )
        contact1.refresh_from_db() 
        contact2.refresh_from_db() 

        response = self.client.get('/api/contacts')
        self.assertEquals(response.status_code, 200)
        self.assertEquals(len(response.data), 2)




        



