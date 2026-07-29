from django.db import migrations
from django.utils.text import slugify


def seed_categories(apps, schema_editor):
    Category = apps.get_model("products", "Category")

    categories = [
        "Vegetables",
        "Fruits",
        "Grains",
        "Tubers",
        "Legumes",
        "Livestock",
        "Poultry",
        "Seafood",
        "Herbs & Spices",
        "Dairy",
        "Nuts",
        "Seeds",
        "Flowers",
        "Processed Foods",
        "Others",
    ]

    for name in categories:
        Category.objects.get_or_create(
            name=name,
            defaults={
                "slug": slugify(name),
            },
        )


class Migration(migrations.Migration):

    dependencies = [
        ("products", "0002_alter_product_farmer"),
    ]

    operations = [
        migrations.RunPython(
            seed_categories,
            migrations.RunPython.noop,
        ),
    ]