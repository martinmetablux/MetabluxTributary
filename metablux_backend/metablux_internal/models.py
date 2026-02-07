import uuid
from django.db import models
from django.contrib.postgres.fields import ArrayField 
from django.utils.deconstruct import deconstructible


# Create your models here.
def get_short_uuid():
    return str(uuid.uuid4())[:8]  

@deconstructible
class CustomUploadToPath:
    def __init__(self, subfolder, secondfolder):
        self.subfolder = subfolder
        self.second = secondfolder
        
    
    def __call__(self, instance,filename):
        compid = instance.company_id
        return f'{self.subfolder}/{compid}/{self.second}/{filename}'
def logostorage(instance,filename):
    return CustomUploadToPath('newdashboard','companydetails')(instance,filename)


class MasterWorkspace(models.Model):
    name = models.TextField(default="",blank=True,null=True)
    unique_id = models.UUIDField(default=uuid.uuid4, unique=True ,blank=True, null=True)
    address = models.TextField(default="",null=True,blank=True)

class CompanyDetails(models.Model):
    company_name = models.TextField()
    company_id = models.TextField(unique=True)
    company_cc_id = models.TextField(blank=True, null=True)
    gst_no = models.CharField(max_length=20, blank=True, null=True)
    company_address = models.TextField(blank=True, null=True)
    logo = models.ImageField(upload_to=logostorage, blank=True, null=True,max_length=1000)
    verticals =  ArrayField(models.CharField(max_length=200),default=list, blank=True, null=True)
    leadsource = models.TextField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    address_book = models.JSONField(blank=True, null=True)
    contact_book = models.JSONField(blank=True, null=True)
    market_details = models.JSONField(blank=True, null=True)
    arc = models.JSONField(blank=True, null=True)
    First_contact = models.TextField(blank=True, null=True)
    pt_key = models.CharField(max_length=2000,blank=True, null=True)
    master_workspace_id = models.IntegerField(blank=True, null=True,default=0)
    user_limit = models.IntegerField(blank=True, null=True,default=50)

    class Meta:
        db_table = 'Company_profile'


class Projects_AdminPanel(models.Model):
    project_type = models.TextField()
    setting_one = models.JSONField(blank=True, null=True,default=dict)
    setting_two = models.JSONField(blank=True, null=True,default=dict)
    setting_three = models.JSONField(blank=True, null=True,default=dict)
    setting_four = models.JSONField(blank=True, null=True,default=dict)
    setting_five = models.JSONField(blank=True, null=True,default=dict)
    master_workspace_id = models.IntegerField(blank=True, null=True,default=0)

    class Meta:
        db_table = 'projects_adminpanel'