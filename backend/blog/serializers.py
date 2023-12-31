from rest_framework import serializers
from .models import Product

class BlogPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'
        lookup_field = 'slug'