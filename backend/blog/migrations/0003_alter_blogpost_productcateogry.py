# Generated by Django 5.0 on 2023-12-22 03:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0002_rename_content_blogpost_productdescription_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='blogpost',
            name='productCateogry',
            field=models.CharField(choices=[('unavaliable', 'World'), ('cloth', 'Cloth'), ('ELECTRONICS', 'Electronics'), ('TECHNOLOGY', 'Technology'), ('health', 'Health'), ('style', 'Style'), ('travel', 'Travel')], default='unavaliable', max_length=50),
        ),
    ]