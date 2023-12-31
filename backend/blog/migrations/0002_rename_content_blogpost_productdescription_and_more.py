# Generated by Django 5.0 on 2023-12-22 03:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='blogpost',
            old_name='content',
            new_name='ProductDescription',
        ),
        migrations.RenameField(
            model_name='blogpost',
            old_name='thumbnail',
            new_name='productImage',
        ),
        migrations.RenameField(
            model_name='blogpost',
            old_name='title',
            new_name='productname',
        ),
        migrations.RemoveField(
            model_name='blogpost',
            name='category',
        ),
        migrations.AddField(
            model_name='blogpost',
            name='productCateogry',
            field=models.CharField(choices=[('unavaliable', 'World'), ('cloth', 'Cloth'), ('ELECTRONICS', 'Electronics'), ('TECHNOLOGY', 'Technology'), ('culture', 'Culture'), ('business', 'Business'), ('politics', 'Politics'), ('opinion', 'Opinion'), ('science', 'Science'), ('health', 'Health'), ('style', 'Style'), ('travel', 'Travel')], default='unavaliable', max_length=50),
        ),
    ]
