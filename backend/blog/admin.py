from django.contrib import admin
from django_summernote.admin import SummernoteModelAdmin
from .models import Product

class ProductAdmin(SummernoteModelAdmin):
    exclude = ('slug', )
    list_display = ('id', 'productname', 'productCateogry', 'date_created')
    list_display_links = ('id', 'productname')
    search_fields = ('productname', )
    list_per_page = 25
    summernote_fields = ('ProductDescription', )

admin.site.register(Product, ProductAdmin)
