from django.db import models
from django.contrib.postgres.fields import ArrayField

# Create your models here.

from django.contrib.auth.models import AbstractUser

def passwordformat():
    return {"status": False, "lastupdate": ""}

class User(AbstractUser):
    #user is assigned to which company
    company_id = models.IntegerField(default=0, blank=True)
    
    is_admin = models.BooleanField(default=False)# Admin role
    is_clientvr = models.BooleanField(default=False)# client view role
    is_clientgr = models.BooleanField(default=False) # client guest role
    is_superclientgr =models.BooleanField(default=False) # client Admin role
    is_passwd = models.JSONField(default=passwordformat)
    
    #List of all projects
    cource_productslist = ArrayField(models.IntegerField(),default=list,blank=True, null=True)
    template_productslist = ArrayField(models.IntegerField(),default=list,blank=True, null=True)
    project_productslist = ArrayField(models.IntegerField(),default=list,blank=True, null=True)

    #user policy 
    policy = models.BooleanField(default=False)

    #login attempts
    login_attempt = models.IntegerField(default=0, blank=True, null=True)

    master_workspace_id = models.IntegerField(blank=True, null=True,default=0)
    is_greetings = models.BooleanField(blank=True,null=True,default=False) 

