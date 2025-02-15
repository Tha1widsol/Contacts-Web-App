from rest_framework.response import Response
from rest_framework import status, generics
from .models import *
from .serializers import ContactSerializer
from django.shortcuts import get_object_or_404

class ContactListCreateView(generics.ListCreateAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

    def put(self, request, contactId, *args, **kwargs):
        contact = get_object_or_404(Contact, pk=contactId)
        serializer = self.get_serializer(contact, data=request.data, partial=True)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

    def delete(self, request, contactId,  *args, **kwargs):
        contact = get_object_or_404(Contact, pk=contactId)
        contact.delete()
        return Response(self.serializer_class(contact).data, status=status.HTTP_200_OK)






