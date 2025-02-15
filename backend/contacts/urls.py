from django.urls import path
from . import views

urlpatterns = [
    path('contacts', views.ContactListCreateView.as_view(), name ='contacts'),
    path('contacts/<int:contactId>', views.ContactListCreateView.as_view(), name='edit-contact'),
]
