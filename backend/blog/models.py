from django.db import models
from datetime import datetime
from django.template.defaultfilters import slugify

class Categories(models.TextChoices):
    WORLD = 'unavaliable'
    CLOTH = 'cloth'
    ELECTRONICS = 'ELECTRONICS'
    TECHNOLOGY = 'TECHNOLOGY'
    HEALTH = 'health'
    STYLE = 'style'
    TRAVEL = 'travel'

class Product(models.Model):
    productname = models.CharField(max_length=50)
    slug = models.SlugField()
    productCateogry = models.CharField(max_length=50, choices=Categories.choices, default=Categories.WORLD)
    productImage = models.ImageField(upload_to='photos/%Y/%m/%d/')
    excerpt = models.CharField(max_length=150)
    month = models.CharField(max_length=3)
    Price = models.CharField(max_length=10)
    ProductDescription = models.TextField()
    featured = models.BooleanField(default=False)
    date_created = models.DateTimeField(default=datetime.now, blank=True)

    def save(self, *args, **kwargs):
        original_slug = slugify(self.productname)
        queryset = Product.objects.all().filter(slug__iexact=original_slug).count()

        count = 1
        slug = original_slug
        while(queryset):
            slug = original_slug + '-' + str(count)
            count += 1
            queryset = Product.objects.all().filter(slug__iexact=slug).count()

        self.slug = slug

        if self.featured:
            try:
                temp = Product.objects.get(featured=True)
                if self != temp:
                    temp.featured = False
                    temp.save()
            except Product.DoesNotExist:
                pass
        
        super(Product, self).save(*args, **kwargs)

    def __str__(self):
        return self.productname
