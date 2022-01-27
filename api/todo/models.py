from django.db import models
from model_utils import Choices



# Create your models here.
class Todo(models.Model):
    STATUS = Choices("OPEN","WORKING","DUE","COMPLETED")
    created = models.DateTimeField(auto_now_add=True, editable=False)
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=100)
    status = models.CharField(choices=STATUS, default=STATUS.OPEN, max_length=10)
    due_date = models.DateField(blank=True, null=True)