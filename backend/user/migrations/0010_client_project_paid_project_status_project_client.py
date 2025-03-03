# Generated by Django 5.1.5 on 2025-01-29 13:05

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0009_remove_user_projects_assigned'),
    ]

    operations = [
        migrations.CreateModel(
            name='Client',
            fields=[
                ('name', models.CharField(max_length=255)),
                ('email', models.EmailField(max_length=255, primary_key=True, serialize=False, unique=True, verbose_name='email')),
                ('details', models.TextField()),
            ],
        ),
        migrations.AddField(
            model_name='project',
            name='paid',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='project',
            name='status',
            field=models.CharField(choices=[('completed', 'Completed'), ('pending', 'Pending'), ('in progress', 'In Progress')], default='pending', max_length=20),
        ),
        migrations.AddField(
            model_name='project',
            name='client',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='client', to='user.client'),
        ),
    ]
